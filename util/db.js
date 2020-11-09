const Sequelize = require('sequelize');
const {mysqlCredentials} = require('./keys');

const sequelize = new Sequelize(
    mysqlCredentials.database,
    mysqlCredentials.username,
    mysqlCredentials.password,
    mysqlCredentials.options
);

module.exports = sequelize;
