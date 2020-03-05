const dbConnection = require('../../config/connection');

const getPosts = () => dbConnection.query('select * from posts');

module.exports = getPosts;
