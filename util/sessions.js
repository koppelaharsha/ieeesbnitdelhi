const session = require('express-session');
const MySQLstore = require('express-mysql-session')(session);
const { mysqlCredentials, sessionSecret } = require('../data/keys');

const sessionStore = new MySQLstore({
    host: mysqlCredentials.hostname,
    port: '3306',
    user: mysqlCredentials.username,
    password: mysqlCredentials.password,
    database: mysqlCredentials.database
});

module.exports = session({
    secret: sessionSecret,
    key: 'sessionid',
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: new Date(Date.now() + 86400000)
    }
});
