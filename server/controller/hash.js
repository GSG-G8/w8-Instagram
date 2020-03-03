const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('env2')('./config.env');

const hashPassword = (password) => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) reject(err);
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
});

const comparePasswords = (password, hash) => new Promise((resolve, reject) => {
  bcrypt.compare(password, hash, (err, valid) => {
    if (err) reject(err);
    else resolve(valid);
  });
});

const generateToken = (data) => new Promise((resolve, reject) => {
  jwt.sign(data, process.env.secretKey, { algorithm: 'HS256' }, (err, token) => {
    if (err) reject(err);
    resolve(token);
  });
});

module.exports = {
  hashPassword,
  comparePasswords,
  generateToken,
};