const { Sequelize} = require('sequelize');

const sequelize = new Sequelize('abcUniversity', 'ssrv231', 'Naru12#$', {
    host: 'localhost',
    dialect: 'mysql'
});

exports.sequelize = sequelize;