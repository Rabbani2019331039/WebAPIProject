const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	accountNo: {
		type: String,
		required: true,
	},
	balance: {
		type: Number,
		default: 100000000,
	},
	bankSecret: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Account", accountSchema);
