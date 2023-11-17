const express = require('express');
const app = express();
const body_parser =  require('body-parser'); 
const path = require('path');
const cors = require('cors');
const sequelize = require('./util/database');
const Customer = require("./models/customer");
const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(body_parser.urlencoded( {extended:false} ));

app.use("/", userRoutes);
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

sequelize.sync({})
    .then(result => {
        //console.log(result);
        const port  = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`Server is running on port: ${port}`));
    })
    .catch(err => {
        console.log(err);
    });

