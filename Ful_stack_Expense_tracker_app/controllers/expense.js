const sequelize = require('../util/database');
const Expense = require('../models/expense');

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