const express = require('express')
const moment = require('moment')
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
main.get('/all', (req, res) => {
  Episode.aggregate(
    [{ $project: { _id: 0, __v: 0 } }, { $sort: { date: -1, episode_id: -1 } }],
    (error, data) => {
      return error ? res.json(error) : res.json(data)
    }
  )
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
