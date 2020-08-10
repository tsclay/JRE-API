const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jre-api'

const app = express()

const mainController = require('./controllers/main')

app.use(mainController)

mongoose.connect(
  MONGODB_URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  () => {
    console.log(`🍃 Connected to MONGODB @ ${MONGODB_URI} 🍃`);
  }
)

app.listen(PORT, () => {
  console.log(`🚀 Listening on PORT:${PORT} 🚀`)
})