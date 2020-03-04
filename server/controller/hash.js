const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('env2')('./config.env');

const hashPassword = (password) => bcrypt.hash(password, 10);

const comparePasswords = (password, hash) => bcrypt.compare(password, hash);

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
