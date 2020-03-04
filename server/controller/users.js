const Joi = require('@hapi/joi');
const getUser = require('../database/query/users/getUser');
const addUser = require('../database/query/users/addUser');
const {
  hashPassword,
  comparePasswords,
  generateToken,
} = require('./hash');


exports.register = (req, res) => {
  const schema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(20)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,}$/).required(),
    confirm: Joi.ref('password'),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    getUser(value.email)
      .then((result) => result.rows)
      .then((user) => {
        if (user.length !== 0) {
          res.status(400).json({
            message: 'user already exists',
          });
        } else {
          hashPassword(value.password)
            .then((hash) => {
              value.password = hash;
              addUser(value)
                .then(() => res.status(200).json({ message: '' }))
                .catch(() => res.status(400).json({ message: 'failed !' }));
            });
        }
      });
  }
};

exports.login = (req, res) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,}$/).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    getUser(value.email)
      .then((result) => result.rows[0])
      .then((user) => {
        if (user === undefined) {
          res.status(400).json({
            message: 'user doesnt exists',
          });
        } else {
          console.log(req.body.password, user.password);
          comparePasswords(req.body.password, user.password)
            .then((valid) => {
              if (!valid) {
                res.status(400).json({ message: 'incorrect password' });
              } else {
                generateToken(user.email).then((token) => res.cookie('user_email', token).redirect('/'));
              }
            });
        }
      })
      .catch(res.json);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('user_email');
  res.redirect('/');
};
