const mongoose = require('mongoose')

const {Schema} = mongoose

const episodeSchema = new Schema({
  title: String,
  guests: [String],
  episode_id: Number,
  isMMA: Boolean,
  isFC: Boolean,
  youtube_url: String || null,
  description: String,
  date: String
})

const Episode = mongoose.model('Episode', episodeSchema)

module.exports = Episode