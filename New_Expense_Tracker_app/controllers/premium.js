const sequelize = require('../util/database');
const {Sequelize, Datatypes} = require('sequelize');
const queryInterface = sequelize.getQueryInterface();
const User = require('../models/user');
const Expenses = require('../models/expense');

exports.getLeaderBoardDetails = async (req, res, next) => {
    try {
        const users = await User.findAll( {
            attributes: ['id', 'firstName', 'lastName', 
            [sequelize.fn('SUM', sequelize.col('expenses.totalExpense')), 'totalExpense']
        ],
        include: [ {
            model:Expenses,
            attributes: []
        } ],
        group: ['User.id'],
        order:[ [sequelize.literal('totalExpense'), 'ASC'] ]
        } ).then( (users)=> {
            res.status(200).json(users);
        } ).catch ((error) => {
            console.error(error);
        } )
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
}