const Joi = require('@hapi/joi');
const getUser = require('../database/query/users/getUser');
const addUser = require('../database/query/users/addUser');
const {
  hashPassword,
  comparePasswords,
} = require('./hash');

exports.register = (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirm: req.body.confirm,
  };
  const schema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(20)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,}$/).required(),
    confirm: Joi.ref('password'),
  });
  const { error, value } = schema.validate(data);
  if (error) console.log('Error is: ', error.message);
  else {
    console.log(value);
  }
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
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,}$/).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) console.log('Error is: ', error.message);
  else {
    console.log(value);
  }
  getUser(req.body.email)
    .then((result) => res.json(result.rows[0]))
    // eslint-disable-next-line no-console
    .catch(console.error);
};
