const fs = require('fs')
const moment = require('moment')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const express = require('express')

const scraper = express.Router()

const matchDate = /([0-9]){2}\.([0-9]){2}\.([0-9]){2}/g
const matchID = /#[a-z].*|#\d*[a-z]?(?=\s)/ig
// const guestMatch = /[A-Z].*(?=[A-Z]).(?=\s)/ig
const guestMatch = /[A-Z].*(?=[A-Z]).*/ig
const descMatch = /[A-Z].*(?=)/ig

const getCorrectDates = (dateString) => {
  // console.log('getCorrectDates input', dateString)
  let episodeDate = new Date(dateString)
  episodeDate = moment(episodeDate).format('MMMM D, YYYY')
  // console.log('getCorrectDates output', episodeDate)
  return episodeDate
}

const getGuests = (data) => {
  // console.log('getGuests input', data)
  // console.log('getGuests output', data.match(guestMatch))
  // console.log(data.match(guestMatch))
  const filtered = data.match(guestMatch)
  return filtered
}

const getEpisodeID = (data) => {
  let filtered = data.match(matchID)
  return filtered[0]
}

scraper.get('/scrape', async (req, res) => {
  try {
    let podcasts = await fetch('http://podcasts.joerogan.net/')
    let body = await podcasts.text()

    const $first = cheerio.load(body)

    const pagination = $first('a.page-numbers', 'ul.page-numbers')
    const pageTotal = parseInt(pagination.eq(pagination.length - 2).text())

    const goods = []
    let pageFactor = 0;

    for (let i = 1; i <= pageTotal; i++) {
      if (i === 1) {
        podcasts = await fetch('http://podcasts.joerogan.net/')
      } else {
        podcasts = await fetch(`http://podcasts.joerogan.net/podcasts/page/${i}?load`)
      }
    
      console.log('this is the podcast url', podcasts.url)
      
      body = await podcasts.text()

      // console.log('this is the body', body)
  
      const $ = cheerio.load(body)

      $('div.episode').each(function(j, elem) {
        const raw = $(elem).text()

        goods[j + pageFactor] = {
          podcast: {title: `${getEpisodeID(raw)} - ${getGuests(raw)[0]}`},
          guests: getGuests(raw)[0],
          episode_id: getEpisodeID(raw),
          description: getGuests(raw)[2],
          date: getCorrectDates(raw.match(matchDate).join('')),
        }
      })
      pageFactor += 10
    }

    res.send(goods)
  } catch (error) {
    res.send(error)
  }
})

module.exports = scraper



