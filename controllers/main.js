const express = require('express')
const seed = require('../models/seed')
const Episode = require('../models/Episodes')
const moment = require('moment')

const main = express.Router()

// Optional seed route for DB
main.get('/seed', async (req, res) => {
  await Episode.deleteMany({})
  await Episode.insertMany(seed, (error, addedSeed) => {
    return error ? res.send(error) : res.send(addedSeed)
  })
})

// Get all the episodes
main.get('/api/all', (req, res) => {
  Episode.aggregate([{$project: {_id: 0, __v: 0}}], (error, data) => {
    return error ? res.send(error) : res.json(data)
  })
})

// Fix the 'null' values on older Fight Companion episodes
main.get('/api/fixFC', async (req, res) => {
  try {
    const data = await Episode.find({$text: {$search: "\"Fight Companion\""}, episode_id: {$lt: 500}}).sort({date: 1})
    for (let i = data.length - 1; i >= 0; i--) {
      const readableDate = moment(new Date(data[i].date)).format('MMMM D, YYYY')
      // console.log(`Fight Companion - ${readableDate}`)
      await Episode.updateOne({_id: data[i]._id}, {title: `Fight Companion - ${readableDate}`}, (err, changed) => {
        console.log(changed)
      })
    }
    const afterCheck = await Episode.find({$text: {$search: "\"Fight Companion\""}, episode_id: {$lt: 500}}).sort({episode_id: 1})
    res.send(afterCheck);
  } catch (error) {
    console.log(error)
  }
})

// All Fight Companion episodes 
main.get('/api/fc', async (req, res) => {
  try {
    const data = await Episode.find({$text: {$search: "\"Fight Companion\""}, episode_id: {$lt: 500}}).sort({date: 1})

    let test = 1
    for (let i = 0; i < data.length; i++) {
      const thisEpisode = data[i].episode_id
      if (test === thisEpisode) {
        console.log(data[i].episode_id)
        test++
      } else {
        console.log("BROKEN SEQ: ", thisEpisode);
        test = thisEpisode + 1
      }
    }
    console.log(data.length, "is the lenght")
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = main