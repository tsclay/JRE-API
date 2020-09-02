/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const express = require('express')
const puppeteer = require('puppeteer')
const Episode = require('../models/Episodes')
const authorizeScrape = require('../middleware/authorizeScrape')
require('dotenv').config()

const scraper = express.Router()

const { SECRET } = process.env

// Scrape the most recent podcast data, format it, and add it to database
scraper.get(
  '/api/scrape-recent',
  authorizeScrape({ SECRET }),
  async (req, res) => {
    const epNumRegEx = /#\d+/
    const descriptionRegEx = /(?<=\s)(.*(?!$))/g
    const dateRegEx = /\./g
    const goods = []
    let matchIndex = 0

    try {
      // Scrape the first page of podcasts and grab the most recent podcast from database
      const podcasts = await fetch('http://podcasts.joerogan.net/')
      const data = await Episode.aggregate([
        { $sort: { date: -1, episode_id: 1 } },
        { $limit: 1 }
      ])

      // Set the cheerio context to the HTML of the scraped page
      const body = await podcasts.text()
      const $ = cheerio.load(body)

      // Grab the description, date, and title of the podcasts
      const content = $('.podcast-content')
      const dates = $('div.podcast-date > h3')
      const titles = $('a.ajax-permalink > h3')
      const displayLinks = []

      // If the lenghts of the above don't match, we got broken data; throw error
      if (
        !(
          content.length === dates.length &&
          content.length === titles.length &&
          titles.length === dates.length
        )
      ) {
        const error = new Error(
          'The NodeLists are not the same length. Data cannot be properly aligned.'
        )
        throw error
      }

      // Grab the show page URLs for each episode and store for later use
      $('div.podcast-details a.ajax-permalink:first-child').each((i, elem) => {
        const raw = $(elem).attr('href')
        displayLinks.push(raw)
      })

      console.log(displayLinks)

      // Loop through description nodes and parse out the descriptions and episode numbers separately
      content.each((i, elem) => {
        const raw = $(elem).text()

        const thisDescription = raw.match(descriptionRegEx)[0]
        const thisEpNum = raw.match(epNumRegEx)[0]

        // Create object that has those values as props
        const obj = {
          episode_id: Number(thisEpNum.slice(1)) || thisEpNum,
          description: thisDescription || 'placeholder'
        }

        // if one of the scraped episodes matches the most recent episode from db, then set pointer for later db inserts
        if (obj.episode_id === data[0].episode_id) {
          matchIndex = i
        }

        // Push obj into placeholder
        goods.push(obj)
      })

      // If after the above, the pointer is still 0, we are up-to-date; escape
      if (matchIndex === 0) {
        const error = new Error('Already updated')
        throw error
      }

      // Same process, but with dates
      dates.each((i, elem) => {
        const raw = $(elem).text()
        const thisDate = raw.replace(dateRegEx, '/')

        goods[i].date = new Date(thisDate)
      })

      // Parse titles and guests, split guests into string array then set props onto each obj in the placeholder "goods"
      titles.each((i, elem) => {
        const raw = $(elem).text()
        const thisTitle = `#${goods[i].episode_id} - ${raw}`
        const theseGuests = raw.match(
          /(?! )(?:([a-zA-Z\d \.]+)(?: ?)(?:"{0,}'? {0,})([a-zA-Z]+)(?:"{0,}'{0,} {0,}[a-zA-Z\d\.]+)?(?:(?:, )(?=Jr\.|Sr\.)..)?([a-zA-Z\d\.]))|(["a-zA-Z\d\.]+)/g
        )
        goods[i].guests = theseGuests
        goods[i].title = thisTitle
        goods[i].isMMA = raw.includes('JRE MMA Show') || false
        goods[i].isFC = raw.includes('Fight Companion') || false
        goods[i].isJRQE = false
      })

      // Automate a headless browser to go fetch the pages for each podcast link
      // Then grab each podcast url and add "https" version to respective objs
      const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
      const page = await browser.newPage()
      for (let i = 0; i < displayLinks.length; i++) {
        await page.goto(displayLinks[i], { waitUntil: 'domcontentloaded' })
        await page.waitForSelector('a.download-episode')
        const pageData = await page.$eval('a.download-episode', (a) =>
          a.getAttribute('href')
        )
        goods[i].podcast_url = await pageData.replace('http', 'https')
      }

      // Go to unofficial fan-site to scrape YouTube URLs
      // Format them with proper "watch" queries and add to respective objs
      await page.goto('https://www.jrepodcast.com/', {
        waitUntil: 'domcontentloaded'
      })
      await page.waitForSelector('#site-footer-credit')
      const pageData = await page.content()

      const $youTube = await cheerio.load(pageData)

      const links = []
      $youTube('a[itemprop=url]').each((i, elem) => {
        const oneLink = $(elem).attr('href')
        links.push(oneLink)
      })

      for (let i = 0; i < displayLinks.length; i++) {
        await page.goto(links[i], { waitUntil: 'domcontentloaded' })
        await page.waitForSelector('#site-footer-credit')

        const thisLink = await page.$eval('.ccb_single_video_player', (y) => {
          return y.dataset.video_id
        })
        await console.log(thisLink)
        goods[i].video_urls = await [`https://youtube.com/watch?v=${thisLink}`]
      }

      // Add the more recent episode objs to database
      for (let i = matchIndex - 1; i >= 0; i--) {
        console.log(goods[i])
        Episode.create(goods[i])
      }

      // For debugging
      // for (let i = goods.length - 1; i >= 0; i--) {
      //   // console.log(goods[i])
      //   Episode.create(goods[i])
      // }

      // Close puppeteer browser instance
      await browser.close()
    } catch (error) {
      console.log(error)
      if (browser) browser.close()
    } finally {
      // res.json(goods)
      // Fresh db call for all docs after all scraping is done
      setTimeout(() => {
        Episode.aggregate([
          { $sort: { date: -1 } },
          { $limit: 10 }
        ]).then((data) => res.send(data))
      }, 500)
    }
  }
)

scraper.get('/api/scrape-links', async (req, res) => {
  const epNumRegEx = /#\d+/
  const descriptionRegEx = /(?<=\s)(.*(?!$))/s
  const dateRegEx = /\./g
  const goods = []
  const displayLinks = []

  try {
    let podcasts = await fetch('http://podcasts.joerogan.net/')
    let body = await podcasts.text()

    const $first = cheerio.load(body)

    const pagination = $first('a.page-numbers', 'ul.page-numbers')
    const pageTotal = parseInt(pagination.eq(pagination.length - 2).text())

    let pageFactor = 0

    for (let i = 15; i <= 15; i++) {
      if (i === 1) {
        podcasts = await fetch('http://podcasts.joerogan.net/')
      } else {
        podcasts = await fetch(
          `http://podcasts.joerogan.net/podcasts/page/${i}?load`
        )
      }

      body = await podcasts.text()

      // console.log('this is the body', body)

      const $ = cheerio.load(body)

      const content = $('.podcast-content')
      const dates = $('div.podcast-date > h3')
      const titles = $('a.ajax-permalink > h3')

      // Grab the show page URLs for each episode and store for later use
      $('div.podcast-details a.ajax-permalink:first-child').each((j, elem) => {
        const raw = $(elem).attr('href')
        displayLinks[j] = raw
      })

      content.each((j, elem) => {
        const raw = $(elem).text()
        // console.log(raw)
        let thisDescription
        if (raw.match(descriptionRegEx) !== null) {
          thisDescription = raw.match(descriptionRegEx)[0]
        } else {
          thisDescription = 'No description available.'
        }

        // console.log(thisDescription)

        let thisEpNum
        if (raw.match(epNumRegEx) !== null) {
          thisEpNum = raw.match(epNumRegEx)[0]
        } else if (raw.includes('Fight Companion')) {
          thisEpNum = `#${goods[j - 2 + pageFactor].episode_id - 1}`
        } else {
          thisEpNum = `#${goods[j - 1 + pageFactor].episode_id - 1}`
        }

        // Create object that has those values as props
        const obj = {
          episode_id: Number(thisEpNum.slice(1)),
          description: thisDescription
        }

        // Push obj into placeholder
        goods[j + pageFactor] = obj
      })

      // Same process, but with dates
      dates.each((j, elem) => {
        const raw = $(elem).text()
        const thisDate = raw.replace(dateRegEx, '/')

        goods[j + pageFactor].date = new Date(thisDate)
      })

      // Parse titles and guests, split guests into string array then set props onto each obj in the placeholder "goods"
      titles.each((j, elem) => {
        const raw = $(elem).text()
        const thisTitle = `#${goods[j + pageFactor].episode_id} - ${raw}`
        let theseGuests = []
        // const string =
        //   'is joined by Joey Diaz & Tony Hinchcliffe to watch the fights on July 11, 2020.             '
        if (raw.includes('Fight Companion')) {
          // goods[j + pageFactor].description = goods[
          //   j + pageFactor
          // ].description.replace(' ', ' ')
          theseGuests = goods[j + pageFactor].description.match(
            /(?<=by\s|& |, )(?:([a-z]+)(?: ?)(?:"{0,}'? {0,})([a-zA-Z]+)(?:"{0,}'{0,} {0,}(?!to)[a-z]+)?(?:(?:, )(?=Jr\.|Sr\.)..)?)/gi
          )
        } else if (raw.includes('MMA Show')) {
          theseGuests = raw.match(
            /(?<=with\s|,\s|&\s)(?:([a-zA-Z\d \.]+)(?: ?)(?:"{0,}'? {0,})([a-zA-Z]+)(?:"{0,}'{0,} {0,}[a-zA-Z\d\.]+)?(?:(?:, )(?=Jr\.|Sr\.)..)?([a-zA-Z\d\.]))/gi
          )
          // console.log(theseGuests)
        } else {
          theseGuests = raw.match(
            /(?! )(?:([a-zA-Z\d \.]+)(?: ?)(?:"{0,}'? {0,})([a-zA-Z]+)(?:"{0,}'{0,} {0,}[a-zA-Z\d\.]+)?(?:(?:, )(?=Jr\.|Sr\.)..)?([a-zA-Z\d\.]))|(["a-zA-Z\d\.]+)/g
          )
        }
        goods[j + pageFactor].guests = theseGuests
        goods[j + pageFactor].title = thisTitle
        goods[j + pageFactor].isMMA = raw.includes('JRE MMA Show') || false
        goods[j + pageFactor].isFC = raw.includes('Fight Companion') || false
        goods[j + pageFactor].isJRQE = raw.includes('JRQE') || false
      })

      // Puppeteer code here

      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      for (let k = 0; k < displayLinks.length; k++) {
        await page.goto(displayLinks[k], { waitUntil: 'domcontentloaded' })
        await page.waitForSelector('a.download-episode')
        const pageData = await page.$eval('a.download-episode', (a) =>
          a.getAttribute('href')
        )
        goods[k + pageFactor].podcast_url = await pageData.replace(
          'http',
          'https'
        )
        console.log('puppet', goods[k + pageFactor].title)
      }

      // Close puppeteer browser instance
      await browser.close()

      pageFactor += 10
    }
  } catch (error) {
    console.log(error)
  } finally {
    res.json(goods)
  }
})

module.exports = scraper

// get the episode number => /#\d+/

// get all the text after the episode => /(?<= )(.*)/g

// get the dots from date string => /\./g

// extract all guest names from title => /(?! )(?:([a-zA-Z\d ]+)(?: ?)(?:"{0,}'? {0,})([a-zA-Z]+)(?:"{0,}'{0,} {0,}[a-zA-Z]+)?)|(["a-zA-Z\d]+)/g

// this one is more thorough => /(?! )(?:([a-zA-Z\d \.]+)(?: ?)(?:"{0,}'? {0,})([a-zA-Z]+)(?:"{0,}'{0,} {0,}[a-zA-Z\d\.]+)?(?:, (?=(?:Jr\.|Sr.)))?([a-zA-Z\d \.]+))|(["a-zA-Z\d\.]+)/g

// video link from website => a.podcast-video-container , get ["data-video-id"]
// link format => "https://youtube.com" + "/watch?v=${the id here}"

// /(?<=by\S|& |, )(?:([a-z]+)(?: ?)(?:"{0,}'? {0,})([a-zA-Z]+)(?:"{0,}'{0,} {0,}(?!to)[a-z]+)?(?:(?:, )(?=Jr\.|Sr\.)..)?)/gi
