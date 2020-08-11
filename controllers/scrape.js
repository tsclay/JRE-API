const fs = require('fs')
const moment = require('moment')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const express = require('express')

const scraper = express.Router()

const matchDate = /([0-9]){2}\.([0-9]){2}\.([0-9]){2}/g
const matchID = /#\d*(?=\s)/
const guestMatch = /[A-Z].*(?=[A-Z]).(?=\s)/i
const descMatch = /[A-Z].*(?=)/i

const getCorrectDates = (dateString) => {
  let episodeDate = new Date(dateString)
  episodeDate = moment(episodeDate).format('MMMM D, YYYY')
  return episodeDate
}

const getGuests = (data) => {
  return data.match(guestMatch)
}

const getEpisodeID = (data) => {
  const secondFilter = /\d.*/g
  let filtered = data.match(matchID)
  filtered = filtered[0].match(secondFilter)
  return parseInt(filtered)
}

scraper.get('/scrape', async (req, res) => {
  try {
    const podcasts = await fetch('http://podcasts.joerogan.net/')
    const body = await podcasts.text()

    const goods = []
    const $ = cheerio.load(body)


    // $('a.page-numbers').each(function(i, elem) {
    //   console.log(`page number ${i}`, $(this).text())
    // })
    const first = $('a.page-numbers', 'ul.page-numbers')
    console.log(first.children())

    $('.episode', '.main').each(function(i, elem) {
      const raw = $(this).text()

      // console.log('THIS IS GET EPISODE', getEpisodeID(raw))

      goods[i] = {
        guests: getGuests(raw),
        episode_id: getEpisodeID(raw),
        date: getCorrectDates(raw.match(matchDate).join(''))
      }
    })

    $('.podcast-content').each(function(i, elem) {
      const raw = $(this).text()

      goods[i].description = raw.match(descMatch)
    })

    res.send(goods)
  } catch (error) {
    res.json(error)
  }
})

module.exports = scraper


// const scrapeMeta = document.getElementsByClassName('episode');
// const scrapeDesc = document.getElementsByClassName('podcast-content');
// const matchDate = /([0-9]){2}\.([0-9]){2}\.([0-9]){2}/
// const matchID = /#\d*(?=\s)/
// const guestMatch = /[A-Z].*(?=[A-Z]).(?=\s)/
// const descMatch = /[A-Z].*(?=)/i

// for (let i = 0; i < episodes.length; i++) {
//   let episodeDate = new Date('07.24.20')
//   episodeDate = moment(d).format('MMMM D, YYYY')

//   const data = {
//     podcast: {
//       title: '', 
//       duration: ''
//     },
//     youtube: {
//       title: '', 
//       duration: '',
//       link: ''
//     },
//     guests: [],
//     description: "",
//     episode_id: 1522,
//     date: episodeDate
//   }
//   fs.writeFile('jre.txt', data, (error) => {
//     if (error) throw error;
//   })
//   console.log(`episode ${i} is ${episodes[i].innerText}`);
// }


