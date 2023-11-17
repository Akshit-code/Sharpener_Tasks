const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');


router.post("/add-expense", expenseController.addExpense);
router.delete("/delete-expense/:id", expenseController.deleteExpense);
router.put("/edit-expense/:id", expenseController.editExpense);
router.get("/refresh", expenseController.getAllExpenses);

module.exports = router;