const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
	senderAccNo: {
		type: String,
		required: true,
	},
	receiverAccNo: {
		type: String,
		required: true,
	},
	transactionAmount: {
		type: String,
		required: true,
	},
	transactionId: {
		type: String,
		required: true,
	},
	transactionAt: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model("Transaction", transactionSchema);
