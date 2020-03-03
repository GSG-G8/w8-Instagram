const dbConnection = require('../config/connection');

const getPosts = () => dbConnection.query('select * from postes');

module.exports = getPosts;
