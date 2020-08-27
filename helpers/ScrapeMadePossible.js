/* The following code was the first iteration of code used to scrape the initial data for the JRE-API. This is by no means clean, but it did work for what it needed to do, which was to get the titles, guests, dates, and episode numbers. */

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
