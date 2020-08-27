const rateLimit = require('express-rate-limit')
const slowDown = require('express-slow-down')

// Limiters for the all episodes route, because 1600+ docs is expensive to spam
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10
})

const speedLimiter = slowDown({
  windowMs: 60 * 1000,
  delayAfter: 1,
  delayMs: 500
})

module.exports = { limiter, speedLimiter }
