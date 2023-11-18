const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded( {extended: false}));
app.use(express.json());
app.use(express.static(path.join (__dirname , 'public')));

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Server is running at port: ${port}`));