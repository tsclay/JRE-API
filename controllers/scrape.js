/* eslint-disable no-await-in-loop */
const moment = require('moment')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const express = require('express')
const puppeteer = require('puppeteer')
const Episode = require('../models/Episodes')

const scraper = express.Router()

// const matchDate = /([0-9]){2}\.([0-9]){2}\.([0-9]){2}/g
// const matchID = /#[a-z].*|#\d*[a-z]?(?=\s)/gi
// const guestMatch = /[A-Z].*(?=[A-Z]).*/gi

// const parseGuests = (data) => {
//   let guests = []
//   if (
//     data.includes('JRE MMA Show') &&
//     !data.includes('#29') &&
//     !data.includes('#1')
//   ) {
//     const layer = data.match(/(?<=with ).*/gi)[0]
//     console.log('found an MMA ', layer)

//     data = layer
//     console.log('MMA as data ', data)

//     if (
//       data.includes(',') &&
//       data.includes(' & ') &&
//       !data.includes('Gino & AJ') &&
//       !data.includes('Vince & Emily Horn')
//     ) {
//       const first = /[a-z].*(?=,)/gi
//       const second = /(?<=, )([a-z]).*(?= \&)/gi
//       const last = /(?<=\& )[a-z].*/gi

//       guests = [
//         data.match(first)[0],
//         data.match(second)[0],
//         data.match(last)[0]
//       ]
//       console.log('3 guests ', guests)
//     } else if (
//       data.includes(' & ') &&
//       !data.includes('Gino & AJ') &&
//       !data.includes('Vince & Emily Horn')
//     ) {
//       const first = /[a-z].*(?= \&)/gi
//       const last = /(?<=\& )[a-z].*/gi

//       guests = [data.match(first)[0], data.match(last)[0]]
//       console.log('2 guests ', guests)
//     } else {
//       guests = [data]
//       console.log('1 guest', guests)
//     }
//   } else if (
//     data.includes(',') &&
//     data.includes(' & ') &&
//     !data.includes('Gino & AJ') &&
//     !data.includes('Vince & Emily Horn')
//   ) {
//     const first = /[a-z].*(?=,)/gi
//     const second = /(?<=, )([a-z]).*(?= \&)/gi
//     const last = /(?<=\& )[a-z].*/gi

//     guests = [data.match(first)[0], data.match(second)[0], data.match(last)[0]]
//   } else if (
//     data.includes(' & ') &&
//     !data.includes('Gino & AJ') &&
//     !data.includes('Vince & Emily Horn')
//   ) {
//     const first = /[a-z].*(?= \&)/gi
//     const last = /(?<=\& )[a-z].*/gi

//     guests = [data.match(first)[0], data.match(last)[0]]
//   } else {
//     guests = [data]
//   }

//   return guests
// }

// const getCorrectDates = (dateString) => {
//   // console.log('getCorrectDates input', dateString)
//   let episodeDate = new Date(dateString)
//   episodeDate = moment(episodeDate).format('MMMM D, YYYY')
//   // console.log('getCorrectDates output', episodeDate)
//   return episodeDate
// }

// const getGuests = (data) => {
//   const filtered = data.match(guestMatch)
//   // console.log('this is the filtered ', filtered)
//   if (filtered[2] === 'Related Links') {
//     filtered[2] = 'No description available.'
//   }
//   return filtered
// }

// const getEpisodeID = (data) => {
//   const filtered = data.match(matchID)
//   // console.log('this is the episode id ', filtered[0][1])
//   return filtered[0]
// }

// Scrape and format all podcast episodes; very likely to fail due to poorly-constructed webpages...
// scraper.get('/scrape', async (req, res) => {
//   try {
//     let podcasts = await fetch('http://podcasts.joerogan.net/')
//     let body = await podcasts.text()

//     const $first = cheerio.load(body)

//     const pagination = $first('a.page-numbers', 'ul.page-numbers')
//     const pageTotal = parseInt(pagination.eq(pagination.length - 2).text())

//     const goods = []
//     let pageFactor = 0

//     for (let i = 1; i <= pageTotal; i++) {
//       if (i === 1) {
//         podcasts = await fetch('http://podcasts.joerogan.net/')
//       } else {
//         podcasts = await fetch(
//           `http://podcasts.joerogan.net/podcasts/page/${i}?load`
//         )
//       }

//       console.log('this is the podcast url', podcasts.url)

//       body = await podcasts.text()

//       // console.log('this is the body', body)

//       const $ = cheerio.load(body)

//       $('div.episode').each(function (j, elem) {
//         const raw = $(elem).text()

//         // console.log('this is elem', raw)

//         const ID = getEpisodeID(raw)
//         // console.log('the IDs ', ID)
//         const guestString = getGuests(raw)[0]
//         // console.log('the raw guest string ', guestString);
//         const guestList = parseGuests(guestString)
//         const descString = getGuests(raw)[2]
//         const dateString = getCorrectDates(raw.match(matchDate).join(''))

//         goods[j + pageFactor] = {
//           title: `${ID} - ${guestString}`,
//           guests: guestList,
//           // rawGuests: guestString,
//           episode_id:
//             Number(ID[1]) !== NaN
//               ? Number(ID.slice(1))
//               : ID.includes('FC')
//               ? ID
//               : null,
//           isMMA: !!guestString.includes('JRE MMA Show'),
//           isFC: !!ID.includes('FC'),
//           description: descString,
//           date: dateString
//         }
//         // if (Number(ID[1]) === NaN) {
//         //   console.log('the bad ID ', ID)
//         //   console.log('the goods at ', i, goods[j + pageFactor])
//         // }
//         console.log('the goods at ', i, goods[j + pageFactor])
//       })
//       pageFactor += 10
//     }

//     res.send(goods)
//   } catch (error) {
//     res.send(error)
//   }
// })

// Scrape the most recent podcast data, format it, and add it to database
scraper.get('/api/scrape-recent', async (req, res) => {
  const epNumRegEx = /#\d+/
  const descriptionRegEx = /(?<= )(.*)/g
  const dateRegEx = /\./g
  const goods = []
  const matchIndex = 0

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
    const browser = await puppeteer.launch()
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
      // Episode.create(goods[i])
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
})

module.exports = scraper

// get the episode number => /#\d+/

// get all the text after the episode => /(?<= )(.*)/g

// get the dots from date string => /\./g

// extract all guest names from title => /(?! )(?:([a-zA-Z\d ]+)(?: ?)(?:"{0,}'? {0,})([a-zA-Z]+)(?:"{0,}'{0,} {0,}[a-zA-Z]+)?)|(["a-zA-Z\d]+)/g

// this one is more thorough => /(?! )(?:([a-zA-Z\d \.]+)(?: ?)(?:"{0,}'? {0,})([a-zA-Z]+)(?:"{0,}'{0,} {0,}[a-zA-Z\d\.]+)?(?:, (?=(?:Jr\.|Sr.)))?([a-zA-Z\d \.]+))|(["a-zA-Z\d\.]+)/g

// video link from website => a.podcast-video-container , get ["data-video-id"]
// link format => "https://youtube.com" + "/watch?v=${the id here}"
