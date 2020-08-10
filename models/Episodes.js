const mongoose = require('mongoose')

const {Schema} = mongoose

const episodeSchema = new Schema({
  podcast: {
    title: String, 
    duration: String
  },
  youtube: {
    title: String, 
    duration: String,
    link: String
  },
  guests: [String],
  episode_id: Number,
  date: String
})

const Episode = mongoose.model('Episode', episodeSchema)

module.exports = Episode