const moment = require('moment')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const express = require('express')
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
  let matchIndex = 0

  try {
    const podcasts = await fetch('http://podcasts.joerogan.net/')
    const data = await Episode.aggregate([
      { $sort: { date: -1 } },
      { $limit: 1 }
    ])

    const body = await podcasts.text()
    const $ = cheerio.load(body)

    const content = $('.podcast-content')
    const dates = $('div.podcast-date > h3')
    const titles = $('a.ajax-permalink > h3')

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

    content.each((i, elem) => {
      const raw = $(elem).text()

      const thisDescription = raw.match(descriptionRegEx)[0]
      const thisEpNum = raw.match(epNumRegEx)[0]

      const obj = {
        episode_id: Number(thisEpNum.slice(1)) || thisEpNum,
        description: thisDescription || 'placeholder'
      }

      if (obj.episode_id === data[0].episode_id) {
        matchIndex = i
      }

      goods.push(obj)
    })

    if (matchIndex === 0) {
      const error = new Error('Already updated')
      throw error
    }

    dates.each((i, elem) => {
      const raw = $(elem).text()
      const thisDate = raw.replace(dateRegEx, '/')

      goods[i].date = new Date(thisDate)
    })

    titles.each((i, elem) => {
      const raw = $(elem).text()
      const thisTitle = `#${goods[i].episode_id} - ${raw}`
      const theseGuests = raw.match(
        /(?! )(?:([a-zA-Z\d \.]+)(?: ?)(?:"{0,}'? {0,})([a-zA-Z]+)(?:"{0,}'{0,} {0,}[a-zA-Z\d\.]+)?(?:, (?=(?:Jr\.|Sr.)))?([a-zA-Z\d \.]+))|(["a-zA-Z\d\.]+)/g
      )
      goods[i].guests = theseGuests
      goods[i].title = thisTitle
      goods[i].isMMA = raw.includes('JRE MMA Show') || false
      goods[i].isFC = raw.includes('Fight Companion') || false
      goods[i].isJRQE = false
    })

    for (let i = matchIndex - 1; i >= 0; i--) {
      console.log(goods[i])
      Episode.create(goods[i])
    }
  } catch (error) {
    console.log(error)
  } finally {
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
