const sequelize = require('../util/database');
const {Sequelize, Datatypes} = require('sequelize');
const queryInterface = sequelize.getQueryInterface();
const User = require('../models/user');
const Expenses = require('../models/expense');

exports.getLeaderBoardDetails = async (req, res, next) => {
    try {
        const users = await User.findAll( {
            attributes: ['id', 'firstName', 'lastName',  'totalExpense'
        ],
        order: [['totalExpense', 'ASC']],
        order:[ [sequelize.literal('totalExpense'), 'ASC'] ]
        } )
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
}