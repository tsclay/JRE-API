const verifyKey = (options) => {
  const { pool } = options
  return (req, res, next) => {
    console.log('the req ', req.params)
    pool.query(
      'SELECT * FROM keys WHERE api_key = $1',
      [req.params.apiKey],
      (err, result) => {
        console.log('here is result', result)
        if (result.rows[0] === undefined) {
          const error = new Error('Invalid API Key. Access to resource denied.')
          return next(error)
        }
        return next()
      }
    )
  }
}

module.exports = verifyKey
