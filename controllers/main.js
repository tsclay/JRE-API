const express = require('express')
const { Pool } = require('pg')
const seed = require('../models/seed')
const Episode = require('../models/Episodes')
const verifyKey = require('../middleware/verifyKey')

require('dotenv').config()

//===========================================================

const main = express.Router()

const POSTGRESQL_URL =
  process.env.POSTGRESQL_URL ||
  'postgresql://jamie:higherPrimate@localhost:5432/jre_keys'

const pool = new Pool({
  connectionString: POSTGRESQL_URL,
  max: 30,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0
})

pool.connect((err, client, done) => {
  if (err) throw err
  client.query('SELECT current_database()', (err, res) => {
    done()
    if (err) {
      console.log(err.stack)
    } else {
      console.log(`🐘 PostgreSQL connected @ ${POSTGRESQL_URL} 🐘`)
    }
  })
})

main.use('/:apiKey', verifyKey({ pool }))
main.use('/all/:apiKey', verifyKey({ pool }))

//===========================================================

// Optional seed route for DB
main.get('/seed', async (req, res) => {
  await Episode.deleteMany({})
  await Episode.insertMany(seed, (error, addedSeed) => {
    return error ? res.send(error) : res.send(addedSeed)
  })
})

// Get all the episodes showing most recent at top
main.get('/:apiKey/all', (req, res) => {
  if (req.params.apiKey === 'DEMO_USER') {
    res.json([
      {
        Error:
          'DEMO_USER key is not valid for this route. Get an API Key to access this route.'
      }
    ])
    return
  }
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

main.get('/example', async (req, res) => {
  res.redirect('/api/v1/most-recent')
})

// For general API access
main.get('/:apiKey', async (req, res) => {
  const { isMMA, isFC, isJRQE, episodeID, date, limit } = req.query
  const { apiKey } = req.params
  const matchParam = { $match: {} }
  const sortParam = { $sort: { date: -1 } }
  const limitParam = { $limit: limit <= 100 ? Number(limit) : 10 }

  try {
    switch (date) {
      case 'asc':
        sortParam.$sort.date = 1
        break
      case 'desc':
        sortParam.$sort.date = -1
        break
      default:
        sortParam.$sort.date = -1
    }

    const filters = [isMMA, isFC, isJRQE]

    filters.forEach((f, i) => {
      switch (f) {
        case 'true':
          filters[i] = true
          break
        case 'false':
          filters[i] = false
          break
        default:
          filters[i] = false
      }
    })

    if (isMMA !== undefined) matchParam.$match.isMMA = filters[0]
    if (isFC !== undefined) matchParam.$match.isFC = filters[1]
    if (isJRQE !== undefined) matchParam.$match.isJRQE = filters[2]

    if (episodeID !== undefined) {
      matchParam.$match.episode_id = Number(episodeID) || null
    }
    // } else if (episodeID === null) {
    //   matchParam.$match.episode_id = null
    // }

    const aggregateQuery = [
      sortParam,
      limitParam,
      { $project: { _id: 0, __v: 0 } }
    ]

    if (Object.keys(matchParam.$match).length !== 0) {
      aggregateQuery.unshift(matchParam)
    }

    const formatted = []
    const data = await Episode.aggregate(aggregateQuery)

    if (data.length !== 0) {
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
    } else {
      res.json([
        {
          'No Data Found':
            "No data was found for this query. This usually happens when any of isFC, isMMA, and isJRQE is set to 'true' at the same time. Set only one of those to 'true' in your query and try again."
        }
      ])
    }
  } catch (error) {
    res.json([{ Error: error.message }])
  }
})

// main.get('/testing', async (req, res) => {
// { $match: { isFC: false, isMMA: false, isJRQE: false } },
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
