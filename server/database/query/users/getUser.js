const dbConnection = require('../../config/connection');

const getUser = (email) => {

  const sql = {
    text: 'select * from users where email = VALUES ($1)',
    values: email
  };
  dbConnection.query(sql);
}

module.exports = getUser
