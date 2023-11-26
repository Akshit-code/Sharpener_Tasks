const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userController');


router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.post("/add-expense", controllers.addExpense);
router.delete("/delete-expense/:id", controllers.deleteExpense);
router.put("/edit-expense/:id", controllers.editExpense);
router.get("/refresh", controllers.getAllExpenses);
module.exports = router;