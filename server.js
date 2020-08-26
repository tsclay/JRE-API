const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

const PORT = process.env.PORT || 5000
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/jre-api'

const app = express()
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

const mainController = require('./controllers/main')
const scraper = require('./controllers/scrape')

app.use('/api/v1', mainController)
app.use(scraper)

// error handler
app.use(function (err, req, res, next) {
  res.status(400).json({ Error: err.message })
})

mongoose.connect(
  MONGODB_URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  () => {
    console.log(`🍃 Connected to MONGODB @ ${MONGODB_URI} 🍃`)
  }
)

app.listen(PORT, () => {
  console.log(`🚀 Listening @ http://localhost:${PORT} 🚀`)
})
