const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(
    'database_management_project',
    'root',
    '@K$#!t2019',
    {
        host:'localhost',
        dialect:'mysql',
    }
);

module.exports = sequelize;