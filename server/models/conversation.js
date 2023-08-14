const mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{
		toUser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		fromUser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		lastMessage: String
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Conversation', schema);
