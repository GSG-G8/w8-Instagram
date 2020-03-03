const getUser = require('../database/query/users/getUser');
const addUser = require('../database/query/users/addUser');
const {
  hashPassword,
  comparePasswords,
} = require('./hash');

exports.register = (req, res) => {
  getUser(req.body.email)
    .then((result) => result.rows)
    .then((user) => {
      if (user.length !== 0) {
        res.json({
          message: 'user already exists',
        });
      } else {
        hashPassword(req.body.password)
          .then((hash) => {
            req.body.password = hash;
            addUser(req.body)
              .then((result) => res.json(result.rows));
          });
      }
    });
};

exports.login = (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.body);
  getUser(req.body.email)
    .then((result) => res.json(result.rows[0]))
    // eslint-disable-next-line no-console
    .catch(console.error);

};
