
const express = require('express')
const seed = require('../models/seed')
const Episode = require('../models/Episodes')

const main = express.Router()

// Optional seed route for DB
main.get('/seed', (req, res) => {
  Episode.insertMany(seed, (error, addedSeed) => {
    return error ? res.send(error) : res.send(addedSeed)
  })
})

main.get('/api/test', (req, res) => {
  Episode.find({}, (error, data) => {
    return error ? res.send(error) : res.json(data)
  })
})

module.exports = main