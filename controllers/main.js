const express = require('express')
const moment = require('moment')
const seed = require('../models/seed')
const Episode = require('../models/Episodes')
const first = require('../youtube.First')

const main = express.Router()

// Optional seed route for DB
main.get('/seed', async (req, res) => {
  await Episode.deleteMany({})
  await Episode.insertMany(seed, (error, addedSeed) => {
    return error ? res.send(error) : res.send(addedSeed)
  })
})

// Get all the episodes in reverse chronological order
main.get('/all', (req, res) => {
  Episode.aggregate(
    [
      {
        $match: {
          isFC: false,
          isMMA: false,
          isJRQE: false,
          episode_id: { $lte: 299 }
        }
      },
      { $project: { _id: 0, __v: 0 } },
      { $sort: { date: 1 } }
    ],
    (error, data) => {
      // data.forEach((d) => {
      //   console.log(d.episode_id)
      // })

      return error ? res.json(error) : res.json(data)
    }
  )
})

main.get('/all-300-499', async (req, res) => {
  try {
    const data = await Episode.aggregate([
      {
        $match: {
          isFC: false,
          isMMA: false,
          isJRQE: false,
          episode_id: { $gte: 300, $lte: 499 }
        }
      },
      { $project: { __v: 0 } },
      { $sort: { date: 1 } }
    ])

    console.log(data.length, first.length)

    // for (let i = 0; i < data.length; i++) {
    //   const videoUrls = []
    //   for (let j = 0; j < first.length; j++) {
    //     if (data[i].episode_id === first[j].episode_id) {
    //       videoUrls.push(first[j].links)
    //       data[i].video_urls = videoUrls
    //       // Episode.updateOne(
    //       //   { _id: data[i]._id },
    //       //   { video_urls: videoUrls },
    //       //   (err, raw) => {
    //       //     console.log('added videos!')
    //       //   }
    //       // )
    //     }
    //   }
    // }

    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

// Get one episode and send it to front for example of data and format
main.get('/example', async (req, res) => {
  try {
    const e = await Episode.aggregate([
      { $sort: { date: -1 } },
      { $limit: 1 },
      { $project: { _id: 0, __v: 0 } }
    ])
    res.json(e)
  } catch (error) {
    console.log(error)
  }
})

// All Fight Companion episodes
main.get('/fc', async (req, res) => {
  try {
    const data = await Episode.find({
      isFC: true
    }).sort({ date: 1 })

    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

// Get all MMA Shows ordered by date
main.get('/mma', async (req, res) => {
  try {
    const data = await Episode.find({ isMMA: true }).sort({ date: -1 })

    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

main.get('/get-recent', async (req, res) => {
  try {
    const data = await Episode.aggregate([
      { $sort: { date: -1 } },
      { $limit: 1 }
    ])

    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = main
