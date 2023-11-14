const express = require('express');
const app = express();
const fs = require('fs').promises; // Use fs.promises for async file operations
const bodyParser = require('body-parser');
const login = require('./routes/login');
const message = require('./routes/message');
const path = require('path');

const chatsFilePath = path.join(__dirname, 'chats.txt');

// Create chats.txt file if it doesn't exist
fs.writeFile(chatsFilePath, '')
  .then(() => console.log('chats.txt file created'))
  .catch((err) => console.error('Error creating chats.txt file', err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/login", login);
app.use("/", message);

app.use((req, res, next) => {
  res.status(404).send('<h1>Error: 404 Page Not found</h1>');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at port: ${port}`));
