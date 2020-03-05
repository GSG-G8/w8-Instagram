const jwt = require('jsonwebtoken');
require('env2')('./config.env');
const getUser = require('../database/query/users/getUser');


module.exports = (req, res, next) => {
  jwt.verify(req.cookies.user_email, process.env.secretKey, (err, decoded) => {
    if (!err && decoded !== undefined) {
      getUser(decoded)
        .then((result) => result.rows)
        .then((users) => {
          if (users.length !== 0) next();
          else res.status(400).json({});
        });
    } else res.status(400).json({});
  });
};
