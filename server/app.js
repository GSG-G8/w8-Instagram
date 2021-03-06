require('env2')('./config.env');
const { join } = require('path');
const express = require('express');
const compression = require('compression');
const cookieParser = require("cookie-parser");

const router = require('./controller');

const app = express();

app.disabled('x-powered-by');
app.use(compression());
app.set('port', process.env.PORT || 7000);
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, '..', 'public')));

app.use(router);

// app.use((err, req, res, next)=>{
//   console.log(111111, err)
//   res.json({err: "errrrr"})
// })

module.exports = app;
