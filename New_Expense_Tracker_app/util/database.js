const {Sequelize} = require('sequelize');
const sequelize = new Sequelize (
    'fullstack_expense_tracker',
    'root',
    'Hidden Password',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;

