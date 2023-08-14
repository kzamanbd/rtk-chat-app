const mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{
		userInfo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		conversationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Conversation',
			required: true
		},
		message: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Message', schema);
