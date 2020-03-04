const dbConnection = require('../../config/connection');

const insertPost = (reqData) => dbConnection.query({
  text: 'INSERT INTO posts(title, image, details, user_id) VALUES ($1, $2, $3, $4)',
  values: [reqData.title, reqData.image, reqData.details, reqData.userId],
});

module.exports = insertPost;
