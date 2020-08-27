const authorizeScrape = (options) => {
  const { SECRET } = options

  return (req, res, next) => {
    const authKey = req.get('X-AUTH')
    try {
      if (authKey === SECRET) {
        next()
      } else {
        throw new Error('You are not authorized for this route.')
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = authorizeScrape
