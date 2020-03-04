const getUser = require('../database/query/users/getUser');
const addUser = require('../database/query/users/addUser');
const {
  hashPassword,
  comparePasswords,
  generateToken,
} = require('./hash');

const cookie=require('cookie')

exports.register = (req, res) => {
  getUser(req.body.email)
    .then((result) => result.rows)
    .then((user) => {
      console.log(user)
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
  getUser(req.body.email)
    .then((result) => result.rows[0])
    .then((user) => {
      comparePasswords(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.json({ message: 'incorrect password' });
          } else {
            generateToken(user.email).then((token) => res.cookie('name', token).redirect('/'));
          }
        });
    })
    .catch(res.json);
};
