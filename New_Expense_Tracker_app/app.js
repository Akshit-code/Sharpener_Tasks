const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
const config = dotenv.config();
const RazorPay = require('razorpay');

const sequelize = require('./util/database');
const razorPayInstance = require('./util/razorPay');
const routes = require('./routes/routes');
const User = require('./models/user');
const Expense = require('./models/expense');
const Orders = require('./models/orders');

app.use(cors());
app.use(bodyParser.urlencoded( { extended:false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

Expense.belongsTo(User);
User.hasMany(Expense);

User.hasMany(Orders);
Orders.belongsTo(User);

app.use("/homepage", routes);
app.use("/homepage", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.use("/user", routes );
app.use("/payment", routes);

app.use("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

sequelize.sync()
    .then( res => {
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`Server is running on Port : ${port}`));
    })
    .catch(err => console.log(err));
