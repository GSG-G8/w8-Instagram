const bcrypt = require('bcrypt-nodejs');

module.exports = {
  hashPassword: bcrypt.hashSync,
  comparePasswords: bcrypt.compareSync
};