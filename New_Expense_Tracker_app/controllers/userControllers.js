const sequelize = require('../util/database');
const {Sequelize, Datatypes} = require('sequelize');
const queryInterface = sequelize.getQueryInterface();
const User = require('../models/model');

exports.addUser = async (req, res, next) => {
    try {
        const reqBody = req.body;
        console.log(req.body);
        res.status(200).json(reqBody);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
};