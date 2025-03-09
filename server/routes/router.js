const { Router } = require('express');
const messageController = require('../controllers/messageController');
const router = Router();

router.get('/messages', messageController.getMessages);
router.get('/messages/:id', messageController.getSingleMessage);
router.post('/messages', messageController.addMessage);

module.exports = router;