const mongoose = require('mongoose')

const {Schema} = mongoose

const episodeSchema = new Schema({
  podcast: {
    title: {type: String}, 
    duration: {type: String}
  },
  youtube: {
    title: {type: String}, 
    duration: {type: String}
  },
  guests: [String],
  episode_id: Number,
  date: String
})

const Episode = mongoose.model('Episode', episodeSchema)

module.exports = Episode