const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
	{
		text: {
			type: String,
			required: true
		},
		room: {
			type: String
		},
		creator: {
			type: Schema.Types.String,
			ref: 'User',
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);
