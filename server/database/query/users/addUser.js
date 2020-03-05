const dbConnection = require('../../config/connection');

const insertUser = (reqData) => dbConnection.query({
  text: 'INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *',
  values: [reqData.name, reqData.email, reqData.password],
});

module.exports = insertUser;
