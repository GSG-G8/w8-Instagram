const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        else resolve(hash);
      });
    });
  });
}

const comparePasswords = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, valid) => {
      if (err) reject(err);
      else resolve(valid);
    })
  })
}

module.exports = {
  hashPassword,
  comparePasswords
};