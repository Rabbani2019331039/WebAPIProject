const mongoose = require("mongoose");
const productSchema = require("./Product").schema;

const orderSchema = new mongoose.Schema({
	orderId: String,
	products: [{ product: productSchema, count: Number }],
	address: {
		city: String,
		area: String,
		houseNo: String,
		phone: String,
	},
	transactionId: String,
	amount: Number,
	status: String,
	orderAt: Date,
	deliveredAt: Date,
});

module.exports = mongoose.model("Order", orderSchema);
