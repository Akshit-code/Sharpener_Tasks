const sequelize = require('../util/database');
const {Sequelize, Datatypes} = require('sequelize');
const queryInterface = sequelize.getQueryInterface();
const bcrypt = require('bcrypt');
const {User, Expense} = require('../models/model');

exports.register = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        req.body.id = req.body.email;
        req.body.password = hashPassword;
        const isExistingUser = await User.findByPk(req.body.email);

        if(!isExistingUser) {
            const user = await User.create(req.body);
            console.log("New User Added")
            console.log(req.body);
            return res.status(201).json(req.body);
        } else {
            console.log("User Already Exits");
            return res.status(200).json(req.body);
        }
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

exports.login = async (req, res, next) =>  {
    try {
        req.body.id = req.body.email;
        const isExistingUser = await User.findByPk(req.body.email);

        if(isExistingUser) {
            const validPassword = await bcrypt.compare(req.body.password, isExistingUser.password);
            if(!validPassword) {
                console.log("Incorrect Pasword");
                return res.status(401).json({message: 'Incorrect Pasword'});
            }
            console.log("Login successful");
            return res.status(200).json({ message: "Login successful"});
        } else {
            console.log("No user found");
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

exports.addExpense = async (req, res, next) => {
    try {
        const expense = await Expense.create ( {
            amount:req.body.amount,
            desc: req.body.desc,
            category: req.body.category
        } );
        const responseData = {
            id: expense.id
        }
        res.status(201).json(responseData);
        //res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteExpense = async (req, res, next) => {
    try {
        const deleteID = req.params.id;
        const expenseToDelete = await Expense.findByPk(deleteID);
        if(!deleteID) {
            return res.status(404).send("Expense not Found");
        }
        await expenseToDelete.destroy();
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

exports.editExpense = async (req, res, next) => {
    try {
        const editId = req.params.id;
        const expenseToEdit = await Expense.findByPk(editId);
        if (!expenseToEdit) {
            return res.status(404).send("Expenses not found");
        }
        await expenseToEdit.update( {
            amount:req.body.amount,
            desc: req.body.desc,
            category: req.body.category
        })
        res.status(201).json(expenseToEdit);
    } catch (err) {
        res.status(500).send("Server error");
    }
};

exports.getAllExpenses = async (req, res, next) =>{
    try {
        const expenses = await Expense.findAll();
    res.json(expenses);
    } catch (err) {
        res.status(500).send("Server Error");
    }
}