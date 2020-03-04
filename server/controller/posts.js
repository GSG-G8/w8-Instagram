const Joi = require('@hapi/joi');
const addPost = require('../database/query/posts/addPosts');
const getPost = require('../database/query/posts/getPosts');

exports.newPost = (req, res) => {
  const schema = Joi.object().keys({
    title: Joi.string().alphanum().min(3).max(20)
      .required(),
    image: Joi.string().required(),
    details: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) console.log('Error is: ', error.message);
  else {
    addPost(value).then(() => res.redirect('/')).catch(console.error);
  }
};

exports.displayPost = (req, res) => {
  getPost().then((result) => res.json(result.rows)).catch(console.error);
};
