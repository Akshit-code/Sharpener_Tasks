const sequelize = require('../util/database');
const {Sequelize, Datatypes} = require('sequelize');
const queryInterface = sequelize.getQueryInterface();
const User = require('../models/model');

exports.identityController = async (req, res, next) => {
    try {
        req.body.id = req.body.email;
        const requestType = req.body.requestType;
        delete req.body.requestType;
        const isExistingUser = await User.findByPk(req.body.email);

        if(requestType == 'login' && isExistingUser) {
            const userDbPassword = isExistingUser.password;
            console.log("UserDbPassword: " , userDbPassword);
            if(req.body.password == userDbPassword) {
                console.log("Logged In Successfully");
                return res.status(200).json(req.body);
            } else {
                console.log("Incorrect Pasword");
                return res.status(401).json(req.body);
            }
        } else if (requestType == 'login' && !isExistingUser) {
            console.log("No user found");
            return res.status(404).json(req.body);
        }

        if(requestType == 'signUp' && !isExistingUser) {
            const user = await User.create(req.body);
            console.log("New User Added")
            console.log(req.body);
            return res.status(201).json(req.body);
        } else if(requestType == 'signUp' && isExistingUser) {
            console.log("User Already Exits");
            return res.status(200).json(req.body);
        }
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
};