const verifyKey = (options) => {
  const { Keys } = options
  return async (req, res, next) => {
    const apiKey = req.get('X-API-KEY')
    console.log('the apiKey ', apiKey)
    try {
      const result = await Keys.selectOne('keys', 'api_key', apiKey)
      console.log(result)
      if (!result) {
        throw new Error('Invalid API Key. Access to resource denied.')
      }
      return next()
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = verifyKey
