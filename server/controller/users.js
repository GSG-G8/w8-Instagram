const Joi = require('@hapi/joi');
const getUser = require('../database/query/users/getUser');
const addUser = require('../database/query/users/addUser');
const {
  hashPassword,
  comparePasswords,
  generateToken,
} = require('./hash');


exports.register = (req, res, next) => {
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

    getUser(data.email)
      .then((result) => result.rows)
      .then((user) => {
        if (user.length !== 0) {
          res.json({
            message: 'user already exists',
          });
        } else {
          hashPassword(data.password)
            .then((hash) => {
              data.password = hash;
              addUser(data)
                .then((result) => res.json(result.rows));
            });
        }
      })
      .catch(next);
  }
};

exports.login = (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,}$/).required(),
  });
  const { error, value } = schema.validate(data);
  if (error) console.log('Error is: ', error.message);
  else {
    console.log(value);
  }

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
