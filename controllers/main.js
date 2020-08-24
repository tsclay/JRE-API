const express = require('express')
const seed = require('../models/seed')
const Episode = require('../models/Episodes')

const main = express.Router()

// Optional seed route for DB
main.get('/seed', async (req, res) => {
  await Episode.deleteMany({})
  await Episode.insertMany(seed, (error, addedSeed) => {
    return error ? res.send(error) : res.send(addedSeed)
  })
})

// Get all the episodes showing most recent at top
main.get('/weird', (req, res) => {
  const formatted = []
  Episode.aggregate(
    [
      { $match: { episode_id: null } },
      { $project: { _id: 0, __v: 0 } },
      { $sort: { date: 1 } }
    ],
    (error, data) => {
      data.forEach((d, i) => {
        formatted[i] = JSON.parse(
          JSON.stringify(
            d,
            [
              'episode_id',
              'title',
              'guests',
              'description',
              'date',
              'isFC',
              'isMMA',
              'isJRQE',
              'video_urls',
              'podcast_url'
            ],
            2
          )
        )
      })
      return error ? res.json(error) : res.json(formatted)
    }
  )
})

// Get all the episodes showing most recent at top
main.get('/all', (req, res) => {
  const formatted = []
  Episode.aggregate(
    [
      { $sort: { date: -1, episode_id: -1 } },
      {
        $project: {
          _id: 0,
          __v: 0
        }
      }
    ],
    (error, data) => {
      data.forEach((d, i) => {
        formatted[i] = JSON.parse(
          JSON.stringify(
            d,
            [
              'episode_id',
              'title',
              'guests',
              'description',
              'date',
              'isFC',
              'isMMA',
              'isJRQE',
              'video_urls',
              'podcast_url'
            ],
            2
          )
        )
      })

      return error ? res.json(error) : res.json(formatted)
    }
  )
})

// Get the most recently added episode
main.get('/most-recent', async (req, res) => {
  try {
    const formatted = []
    const mostRecent = await Episode.aggregate([
      { $sort: { date: -1 } },
      { $limit: 1 },
      { $project: { _id: 0, __v: 0 } }
    ])
    mostRecent.forEach((e, i) => {
      formatted[i] = JSON.parse(
        JSON.stringify(
          e,
          [
            'episode_id',
            'title',
            'guests',
            'description',
            'date',
            'isFC',
            'isMMA',
            'isJRQE',
            'video_urls',
            'podcast_url'
          ],
          2
        )
      )
    })
    res.json(formatted)
  } catch (error) {
    console.log(error)
  }
})

// All Fight Companion episodes
main.get('/fc', async (req, res) => {
  try {
    const formatted = []
    const data = await Episode.find({
      isFC: true
    }).sort({ date: 1 })

    data.forEach((d, i) => {
      formatted[i] = JSON.parse(
        JSON.stringify(
          d,
          [
            'episode_id',
            'title',
            'guests',
            'description',
            'date',
            'isFC',
            'isMMA',
            'isJRQE',
            'video_urls',
            'podcast_url'
          ],
          2
        )
      )
    })

    res.json(formatted)
  } catch (error) {
    console.log(error)
  }
})

// Get all MMA Shows ordered by date
main.get('/mma', async (req, res) => {
  try {
    const formatted = []
    const data = await Episode.find({ isMMA: true }).sort({ date: -1 })

    data.forEach((d, i) => {
      formatted[i] = JSON.parse(
        JSON.stringify(
          d,
          [
            'episode_id',
            'title',
            'guests',
            'description',
            'date',
            'isFC',
            'isMMA',
            'isJRQE',
            'video_urls',
            'podcast_url'
          ],
          2
        )
      )
    })

    res.json(formatted)

    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

main.get('/example', async (req, res) => {
  res.redirect('/api/v1/most-recent')
  // try {
  //   const formatted = []
  //   const mostRecent = await Episode.aggregate([
  //     { $sort: { date: -1 } },
  //     { $limit: 1 },
  //     { $project: { _id: 0, __v: 0 } }
  //   ])
  //   mostRecent.forEach((e, i) => {
  //     formatted[i] = JSON.parse(
  //       JSON.stringify(
  //         e,
  //         [
  //           'episode_id',
  //           'title',
  //           'guests',
  //           'description',
  //           'date',
  //           'isFC',
  //           'isMMA',
  //           'isJRQE',
  //           'video_urls',
  //           'podcast_url'
  //         ],
  //         2
  //       )
  //     )
  //   })
  //   res.json(formatted)
  // } catch (error) {
  //   console.log(error)
  // }
})

// { $match: { isFC: false, isMMA: false, isJRQE: false } },

// main.get('/testing', async (req, res) => {
//   const data = await Episode.aggregate([
//     {
//       $match: {
//         episode_id: { $gte: 1 },
//         isFC: false,
//         isMMA: true,
//         isJRQE: false
//       }
//     },
//     { $sort: { date: -1 } }
//   ])

//   const dataCheck = []
//   const podCheck = []
//   const diffs = []

//   const newDate = []

//   podcasts.forEach((p) => {
//     if (
//       p.episode_id >= 1 &&
//       p.isFC === false &&
//       p.isMMA === true &&
//       p.isJRQE === false
//     ) {
//       podCheck.push(p)
//     }
//     // podCheck.push(p)
//   })

//   data.forEach((d) => {
//     dataCheck.push(d.episode_id)
//   })

//   // podCheck.forEach((p) => {
//   //   if (dataCheck.indexOf(p.episode_id, 0) === -1) diffs.push(p)
//   //   else {
//   //     data[dataCheck.indexOf(p.episode_id, 0)].podcast_url = p.podcast_url
//   //   }
//   // })

//   for (let i = 0; i < podCheck.length; i++) {
//     if (dataCheck.indexOf(podCheck[i].episode_id, 0) === -1)
//       diffs.push(podCheck[i])
//     else {
//       const thisOne = data[dataCheck.indexOf(podCheck[i].episode_id, 0)]
//       thisOne.podcast_url = podCheck[i].podcast_url
//       // Episode.updateOne(
//       //   { _id: thisOne._id },
//       //   { podcast_url: thisOne.podcast_url },
//       //   (err, raw) => {
//       //     console.log('updated!')
//       //   }
//       // )
//     }
//   }

//   console.log(dataCheck.length, podCheck.length)

//   // for (let i = numCheck.length - 1; i >= 0; i--) {
//   //   if (numCheck[i - 1] - numCheck[i] !== 1) {
//   //     console.log(numCheck[i])
//   //   }
//   // }

//   data.forEach((d) => {
//     if (!d.podcast_url)
//       console.log(
//         `isJRQE: true | episode_id: ${d.episode_id} | title: ${d.title}`
//       )
//   })

//   res.json(data)
// })

module.exports = main
