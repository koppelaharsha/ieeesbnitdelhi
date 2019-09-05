const express = require('express');
const favicon = require('express-favicon');
const sessions = require('../util/sessions');
const csrf = require('csurf');
const flash = require('connect-flash');

const app = express();

app.use(flash());
app.set('view engine','ejs');
app.set('views','web/views');

app.use('/',
    require('./util/logger'),
    favicon('web/public/favicon.png'),
    express.static('web/public'),
    sessions, csrf(),
    require('./router')
);

app.use('/', require('./controllers/error').errorHandler );

module.exports = app;
