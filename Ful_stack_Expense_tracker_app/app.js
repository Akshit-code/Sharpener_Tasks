const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const sequelize = require('./util/database');
const Expense = require('./models/expense');
const expenseRoutes = require('./routes/expense');

app.use(cors());
app.use(bodyParser.urlencoded( {extended: false}));
app.use(express.json());
app.use(express.static(path.join (__dirname , 'public')));

app.use("/homepage", expenseRoutes);
app.use("/homepage", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

sequelize.sync()
    .then(res => {
        const port = process.env.PORT || 3000;
        app.listen(port , () => console.log(`Server Running on port: ${port}`));
        exports.port = port;
    })
    .catch(err => console.log(err));