const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const chatsFilePath = path.join(__dirname, '..', 'chats.txt');

router.get("/", (req, res, next) => {
    res.send(`
        <form action="/login/username" method="POST">
            <input type="text" placeholder="Enter Username" name="username">
            <button type="submit"> Login </button>
        </form>
    `);
});

router.post("/username", async (req, res, next) => {
    const { username } = req.body;
    try {
        await fs.appendFile(chatsFilePath, `\n ${username} : \n`, 'utf-8');
        console.log(req.body);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error appending username to the file');
    }
});

module.exports = router;
