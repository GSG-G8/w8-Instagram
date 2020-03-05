const router = require('express').Router();
const user = require('./users');
const post = require('./posts');
const verifyUser = require('./verifyUser');

router.post('/register', user.register);
router.post('/login', user.login);
router.post('/posts', post.newPost);
router.get('/posts', verifyUser, post.displayPost);

module.exports = router;
