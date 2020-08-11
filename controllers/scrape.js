const fs = require('fs')
const moment = require('moment')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const express = require('express')

const scraper = express.Router()

const matchDate = /([0-9]){2}\.([0-9]){2}\.([0-9]){2}/g
// const matchID = /#\d*(?=\s)/g
const matchID = /#[a-z].*|#\d*(?=\s)/i
const guestMatch = /[A-Z].*(?=[A-Z]).(?=\s)/ig
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
  return data.match(guestMatch)
}

const getEpisodeID = (data) => {
  // console.log('getEpisodeID input', data)
  const secondFilter = /\d.*/g
  let filtered = data.match(matchID)
  // filtered = filtered[0].match(secondFilter)
  // console.log('getEpisodeID output', filtered)
  return filtered
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
        // if (j === 3) console.log($(elem).text())
        
        // console.log(j)
        // console.log('THIS IS GET EPISODE', getEpisodeID($(elem).text()))
      })

      // console.log($('div.main').html())

      $('div.episode').each(function(j, elem) {
        const raw = $(elem).text()
        // console.log('THIS IS GET EPISODE', getEpisodeID(raw))
        // console.log('raw output', raw)
        // console.log('elem output', $(elem).text())
        // console.log('this is j with pageFactor', j + pageFactor)

        goods[j + pageFactor] = {
          // podcast: {title: `#${getEpisodeID(raw)} - ${getGuests(raw)}`},
          // guests: getGuests(raw),
          episode_id: getEpisodeID(raw),
          // date: getCorrectDates(raw.match(matchDate).join('')),
          // raw: raw
        }
      })

      // console.log('podcast-content', $('.podcast-content'))

      // $('.podcast-details').each(function(j, elem) {
      //   const raw = $(this).text()
        // console.log(raw);
        // goods[j + pageFactor].description = raw.match(descMatch).join('')
      // })
      pageFactor += 10
    }

    res.send(goods)
  } catch (error) {
    res.send(error)
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


