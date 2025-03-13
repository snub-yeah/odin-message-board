const database = require('../database/db');
const asyncHandler = require('express-async-handler');

const getMessages = asyncHandler(async (req, res) => {
    res.json(database.getMessages());
});

const getSingleMessage = asyncHandler(async (req, res) => {
    const message = database.getMessage(req.params.id);
    if (!message) {
        res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
});

const addMessage = asyncHandler(async (req, res) => {
    const message = req.body;
    database.addMessage(message);
    res.status(201).json(message);
});

module.exports = { getMessages, getSingleMessage, addMessage };