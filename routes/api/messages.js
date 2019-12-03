const express = require('express');
const router = express.Router();

// Models
const Message = require('../../models/Message');

// @route GET api/chat/messages
// @desc Get chat
// @access Private
router.get('/messages/:room', async (req, res) => {
	const { room } = req.params;

	let messages;
	try {
		messages = await Message.find({ room: room }).limit(100);
	} catch (error) {
		res.status(500).json(error);
	}
	res.json(messages);
});

module.exports = router;
