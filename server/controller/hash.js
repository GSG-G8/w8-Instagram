const bcrypt = require('bcrypt-nodejs');

const hashPassword = password => bcrypt.hashSync(password);

const comparePasswords = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  hashPassword,
  comparePasswords
};