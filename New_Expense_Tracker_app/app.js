const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
const config = dotenv.config();

const sequelize = require('./util/database');
const routes = require('./routes/routes');
const User = require('./models/user');
const Expense = require('./models/expense');

app.use(cors());
app.use(bodyParser.urlencoded( { extended:false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

Expense.belongsTo(User);
User.hasMany(Expense);

app.use("/homepage", routes);
app.use("/homepage", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.use("/user", routes );

app.use("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

sequelize.sync()
    .then( res => {
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`Server is running on Port : ${port}`));
    })
    .catch(err => console.log(err));
