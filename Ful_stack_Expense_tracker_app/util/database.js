const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(
    'expense_tracker',
    'root',
    '@K$#!t2019',
    {
        host:'localhost',
        dialect:'mysql',
    }
);

module.exports = sequelize;
