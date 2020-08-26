const { Pool } = require('pg')

class PgDb {
  constructor(
    connectionString,
    max,
    connectionTimeoutMillis,
    idleTimeoutMillis
  ) {
    this.connectionString = connectionString
    this.max = max
    this.connectionTimeoutMillis = connectionTimeoutMillis
    this.idleTimeoutMillis = idleTimeoutMillis
    this.pool = new Pool({
      connectionString,
      max,
      connectionTimeoutMillis,
      idleTimeoutMillis
    })
  }

  isConnected = () => {
    this.pool.connect((err, client, done) => {
      if (err) throw err
      client.query('SELECT current_database()', (err, res) => {
        done()
        if (err) {
          console.log(err.stack)
        } else {
          console.log(`🐘 PostgreSQL connected @ ${this.connectionString} 🐘`)
        }
      })
    })
  }

  selectAll = (relation) => {
    this.pool.query(`SELECT * FROM ${relation}`, (err, result) => {
      if (err) {
        console.log(err)
        return err
      }
      return result.rows
    })
  }

  selectOne = (relation, quantifier, param) => {
    this.pool.query(
      `SELECT * FROM ${relation} WHERE ${quantifier} = $1`,
      [param],
      (err, result) => {
        console.log('selectOne = ', result.rows)
        if (result.rows[0] === undefined) {
          const error = new Error('Invalid query.')
          return error
        }
        return result.rows[0]
      }
    )
  }

  insertOne = (relation, columns, values) => {
    this.pool.query(
      `INSERT INTO ${relation} (${columns.join()}) VALUES (${values.join()}) ${values}`,
      (err, result) => {
        if (err) {
          console.log(err)
          return err
        }
        return result
      }
    )
  }

  insertMany = (relation, columns, values) => {
    this.pool.query(
      `INSERT INTO ${relation} (${columns.join()}) VALUES (${values.join()}) ${values}`,
      (err, result) => {
        if (err) {
          console.log(err)
          return err
        }
        return result
      }
    )
  }
}

module.exports = PgDb
