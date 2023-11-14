const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const chatsFilePath = path.join(__dirname, '..', 'chats.txt');

router.get("/", async (req, res, next) => {
    try {
        const chats = await displayChats();
        res.send(`
            <form action="/message" method="POST">
                <input type="text" placeholder="Enter Message" name="message">
                <button type="submit"> Message </button>
            </form>
            <h1>${chats}</h1>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error reading chats file');
    }
});

router.post("/message", async (req, res, next) => {
    const { message } = req.body;
    try {
        await fs.appendFile(chatsFilePath, `${message}\n`, 'utf-8');
        console.log(req.body);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error appending message to the file');
    }
});

async function displayChats() {
    try {
        const content = await fs.readFile(chatsFilePath, 'utf-8');
        return content;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = router;
