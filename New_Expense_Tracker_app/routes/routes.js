const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const expenseController = require('../controllers/expense');
const authToken  = require('../middleware/authToken');

router.post("/register", userController.register);
router.post("/login", userController.login);

router.post("/add-expense",authToken.authToken, expenseController.addExpense);
router.delete("/delete-expense/:id", authToken.authToken, expenseController.deleteExpense);
router.put("/edit-expense/:id",authToken.authToken, expenseController.editExpense);
router.get("/get-expenses", authToken.authToken, expenseController.getAllExpenses);
module.exports = router;