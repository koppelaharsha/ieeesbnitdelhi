const session = require('express-session');
const sequelize = require('./db');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const {sessionSecret} = require('./keys');

module.exports = session({
    secret: sessionSecret,
    key: 'sessionid',
    resave: false,
    saveUninitialized: false,
    store: new sequelizeStore({db:sequelize}),
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: Date.now() + 86400000
    }
});
