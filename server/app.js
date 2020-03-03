require('env2')('./config.env');
const { join } = require('path');
const express = require('express');
const compression = require('compression');

const app = express();

app.disabled('x-powered-by');
app.use(compression());
app.set('port', process.env.PORT || 7000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, '..', 'public')));

module.exports = app;
