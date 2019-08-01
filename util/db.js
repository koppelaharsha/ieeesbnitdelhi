const Sequelize = require('sequelize');
const {mysqlCredentials} = require('../data/keys');

const sequelize = new Sequelize(
    mysqlCredentials.database,
    mysqlCredentials.username,
    mysqlCredentials.password,
    {
        dialect: 'mysql',
        host: mysqlCredentials.hostname,
        port: 3306,
        timezone: '+05:30'
    }
);

module.exports = sequelize;
