const express = require('express');
const app = express();
const body_parser = require('body-parser');
const admin = require('./routes/admin');
const shop = require('./routes/shop');

app.use(express.json());
app.use(body_parser.urlencoded({extended:true}));

app.use( "/api", admin);
app.use(shop);
app.use( (req, res, next) => {
    res.status(404).send(`<h1> Error: 404 Page Not found <h1>`);
});

const port = process.env.PORT || 3000;
app.listen( port, () => console.log(`Server running at port: ${port}`));