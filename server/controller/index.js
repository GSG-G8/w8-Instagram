const router = require('express').Router();
const user = require('./users');

router.post('/register', user.register);
router.post('/login', user.login);

module.exports = router;
