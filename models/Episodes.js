const mongoose = require('mongoose')

const { Schema } = mongoose

const episodeSchema = new Schema({
  title: String,
  guests: [String],
  episode_id: Number,
  isMMA: Boolean,
  isFC: Boolean,
  isJRQE: Boolean,
  description: String,
  date: Date,
  video_urls: [String] || null,
  podcast_url: String || null
})

const Episode = mongoose.model('Episode', episodeSchema)

module.exports = Episode
