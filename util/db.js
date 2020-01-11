const Sequelize = require('sequelize');
const {mysqlCredentials} = require('../web/data/keys');

const sequelize = new Sequelize(
    mysqlCredentials.database,
    mysqlCredentials.username,
    mysqlCredentials.password,
    {
        host: mysqlCredentials.hostname,
        port: 3306,
        dialect: 'mysql',
        dialectOptions:{
            ssl: 'Amazon RDS'
        },
        timezone: '+05:30'
    }
);

module.exports = sequelize;
