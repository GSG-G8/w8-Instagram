const router = require('express').Router();
const user = require('./users');
const post = require('./posts');

router.post('/register', user.register);
router.post('/login', user.login);
router.post('/posts', post.newPost);
router.get('/posts', post.displayPost);

const error = require('./error');

router.use(error.client);
router.use(error.server);

module.exports = router;
