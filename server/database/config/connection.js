require('env2').config('./config.env');

const { Pool } = require('pg')

const dbUrl = '';

if (process.env.NODE_ENV === 'test') {
  dbUrl = process.env.DB_URL_TEST
} else if (process.env.NODE_ENV === 'development') {
  dbUrl = process.env.DB_URL;
} else {
  dbUrl = process.env.DATABASE_URL;
}

if (!dbUrl) throw new Error('THERE IS NO DATABASE!')

const option = {
  connectionString: dbUrl,
  ssl: true
}

module.exports = new Pool(option);