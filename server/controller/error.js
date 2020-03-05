const Path = require('path');

exports.client = (req, res) => {
  res.status(404);
  res.sendFile(Path.join(__dirname, '..', '..', 'public', '404.html'));
};

// eslint-disable-next-line no-unused-vars
exports.server = (err, req, res, next) => {
  res.status(500);
  res.send('<h1>500 Server Error</h1>');
};
