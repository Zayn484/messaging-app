const Message = require('../models/Message');

const addMessage = (name, room, text) => {
	const message = new Message({
		text,
		room,
		creator: name
	});

	return message.save().then((message) => message).catch((error) => error);
};

module.exports = { addMessage };
