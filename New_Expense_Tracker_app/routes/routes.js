const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userController');
const authToken  = require('../middleware/authToken');

router.post("/register", controllers.register);
router.post("/login", controllers.login);

router.post("/add-expense",authToken.authToken, controllers.addExpense);
router.delete("/delete-expense/:id", authToken.authToken, controllers.deleteExpense);
router.put("/edit-expense/:id",authToken.authToken,  controllers.editExpense);
router.get("/get-expenses", authToken.authToken,  controllers.getAllExpenses);
module.exports = router;