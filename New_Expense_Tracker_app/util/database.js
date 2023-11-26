const {Sequelize} = require('sequelize');
const sequelize = new Sequelize (
    'fullstack_expense_tracker',
    'root',
    'HiddenPassword',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;

