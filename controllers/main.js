const express = require('express')
// const { Pool } = require('pg')
const nodemailer = require('nodemailer')
const { v5: uuidv5 } = require('uuid')
const PgDb = require('../models/PgDb')
const seed = require('../models/seed')
const Episode = require('../models/Episodes')
const verifyKey = require('../middleware/verifyKey')
const { limiter, speedLimiter } = require('../middleware/limiters')

require('dotenv').config()

//===========================================================
// ROUTER, POSTGRES, & ENVIRONMENT
//===========================================================

const main = express.Router()

const {
  POSTGRESQL_URL,
  NAMESPACE,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  CLIENT_ID,
  CLIENT_SECRET
} = process.env

let cachedData
let cacheTime
let cachedDateQuery

const Keys = new PgDb(POSTGRESQL_URL, 30, 0, 0)

Keys.isConnected()

//===========================================================
// Requesting an API Key
//===========================================================
main.post(
  '/requestKey',
  (req, res, next) => {
    if (req.body.name === undefined || req.body.email === undefined) {
      const error = new Error('Missing name and/or email.')
      next(error)
    }
    next()
  },
  async (req, res) => {
    const { name, email } = req.body

    try {
      // Create instance of our mailer bot
      const mailer = await nodemailer.createTransport({
        pool: true,
        service: 'Gmail',
        auth: {
          type: 'OAuth2',
          user: 'keymaster.jre.api@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          accessToken: ACCESS_TOKEN,
          refreshToken: REFRESH_TOKEN
        }
      })

      // verify connection configuration
      mailer.verify((error, success) => {
        if (error) {
          const mailError = new Error('Unknown error with mailing system.')
          throw mailError
        } else {
          console.log('📝 Server is ready to send messages 📝')
        }
      })

      // Generate API key and try to insert into database
      // If email is already logged, let user know that email is already used
      const key = await uuidv5(email, NAMESPACE)

      await Keys.insertOne(
        'keys',
        ['name', 'email', 'api_key'],
        [`'${name}'`, `'${email}'`, `'${key}'`],
        'api_key'
      )

      // Construct message and necessary email headers
      const message = {
        from: 'Keymaster <keymaster.jre.api@gmail.com>', // listed in rfc822 message header
        to: email, // listed in rfc822 message header
        envelope: {
          from: 'keymaster.jre.api@gmail.com', // used as MAIL FROM: address for SMTP
          to: `${name} <${email}>` // used as RCPT TO: address for SMTP
        },
        subject: 'API Key for JRE-API',
        text: `Hi ${name},\n\nHere is your API KEY\n\n${key}\n\nKeep it secret, keep it safe.`,
        html: `<p>Hi ${name},</p><p>Here is your API KEY</p><p>${key}</p><p>Keep it secret, keep it safe.</p>`
      }

      await mailer.sendMail(message)

      res.status(200).json({ message: '📩 API Key Sent! 📩' })
    } catch (error) {
      if (error.detail) {
        res.status(400).json({
          DuplicateEmailError:
            'This email has already been registered. If this is a mistake, please contact @ keymaster.jre.api@gmail.com.'
        })
      } else if (error.code === 'EAUTH') {
        res.status(500).json({
          MailError:
            'Request could not be sent. Please email keymaster.jre.api@gmail.com directly for an API Key. Sorry for the inconvenience!'
        })
      } else {
        res.status(500).json({ Error: error.message })
      }
    }
  }
)

//===========================================================
// Seed route for testing in case of Drops
//===========================================================
main.get('/seed', async (req, res) => {
  await Episode.deleteMany({})
  await Episode.insertMany(seed, (error, addedSeed) => {
    return error ? res.send(error) : res.send(addedSeed)
  })
})

//===========================================================
// GET all the episodes, being able to filter only by date
//===========================================================
// If the user alternates the date filtering, they'll receive the requested data, but rate limit and response time increase applies
main.get('/jre/all', limiter, speedLimiter, verifyKey({ Keys }), (req, res) => {
  if (req.get('X-API-KEY') === 'DEMO_USER') {
    res.json([
      {
        Error:
          'DEMO_USER key is not valid for this route. Get an API Key to access this route.'
      }
    ])
    return
  }

  const { date } = req.query

  if (
    cachedDateQuery === date &&
    cachedDateQuery !== undefined &&
    cacheTime &&
    cacheTime > Date.now() - 3600 * 1000
  ) {
    res.json(cachedData)
    return
  }

  cachedDateQuery = date
  let dateFilter

  switch (date) {
    case 'asc':
      dateFilter = 1
      break
    case 'desc':
      dateFilter = -1
      break
    default:
      dateFilter = -1
  }

  const formatted = []
  Episode.aggregate(
    [
      { $sort: { date: dateFilter, episode_id: -1 } },
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

      cachedData = formatted
      cacheTime = Date.now()
      cachedData.unshift({ cacheTime })

      return error ? res.json(error) : res.json(formatted)
    }
  )
})

//===========================================================
// GET the most recent episode
//===========================================================
main.get('/jre/most-recent', async (req, res) => {
  try {
    // const apiKey = req.get('X-API-KEY')
    // const result = await Keys.selectOne('keys', 'api_key', apiKey)
    // console.log(result)
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

//===========================================================
// GET specific episodes with filters as URL queries
//===========================================================
main.get('/jre', verifyKey({ Keys }), async (req, res) => {
  const { isMMA, isFC, isJRQE, episodeID, date, limit } = req.query
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
