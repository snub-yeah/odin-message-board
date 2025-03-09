const database = require('../database/db');
const asyncHandler = require('express-async-handler');

const getMessages = asyncHandler(async (req, res) => {
    res.json(database.getMessages());
});

const addMessage = asyncHandler(async (req, res) => {
    const message = req.body;
    database.addMessage(message);
    res.status(201).json(message);
});

module.exports = { getMessages, addMessage };