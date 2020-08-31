const express = require('express')
const mongoose = require('mongoose')
const { exec } = require('child_process')
const cors = require('cors')

require('dotenv').config()

const { PORT, MONGODB_URI, SECRET, SCRAPER_URL } = process.env

const mainController = require('./controllers/main')
const scraper = require('./controllers/scrape')

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: 'https://jre-api.vercel.app'
  })
)
app.use('/api/v1', mainController)
app.use(scraper)

// error handler
app.use(function (err, req, res, next) {
  res.status(400).json([{ Error: err.message }])
})

// Server will try to scrape most recent episode if exists every 8 hours
setInterval(() => {
  exec(
    `curl -X GET -H "X-AUTH: ${SECRET}" ${SCRAPER_URL}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      console.log(`stdout: ${stdout}`)
    }
  )
}, 60 * 1000 * 60 * 8)

//

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
