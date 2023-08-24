const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: "string",
	category: "string",
	price: "number",
	description: "string",
});

module.exports = mongoose.model("Product", productSchema);
