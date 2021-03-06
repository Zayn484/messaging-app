const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	room: {
		type: String,
		required: true
	},
	socketId: {
		type: String
	},
	messages: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Message'
		}
	]
});

module.exports = mongoose.model('User', UserSchema);
