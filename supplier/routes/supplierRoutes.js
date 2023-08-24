const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const Product = require("../models/Product");
const apiUrl = "/api/v1";

router.route(`${apiUrl}`).get(
	asyncHandler(async (req, res) => {
		res.json({ message: "supplier server running" });
	})
);

router.route(`${apiUrl}/products`).get(
	asyncHandler(async (req, res) => {
		const products = await Product.find();
		if (products) {
			res.status(200).json({ products });
		} else {
			res.status(201).json({ message: "No available products" });
		}
	})
);

router.route(`${apiUrl}/product/:id`).get(
	asyncHandler(async (req, res) => {
		const product = await Product.findOne({ _id: req.params.id });
		if (product) {
			res.status(200).json({ product });
		} else {
			res.status(201).json({ message: "Product not found" });
		}
	})
);

router.route(`${apiUrl}/addProduct`).post(
	asyncHandler(async (req, res) => {
		const { name, category, description, price } = req.body;
		const product = new Product({
			name,
			category,
			description,
			price,
		});

		product.save();

		res.status(200).json({ message: "product created successfully" });
	})
);

router.route(`${apiUrl}/createOrder`).post(
	asyncHandler(async (req, res) => {
		const { transactionId, amount } = req.body;

		const randNum = parseInt(Math.floor(Math.random() * 100));
		const date = String(Date.now()).substring(7);
		const orderId = `${date}${randNum}`;

		const order = new Order({
			transactionId,
			amount,
			status: "pending",
			orderAt: new Date().toISOString(),
			orderId,
		});

		order.save();

		res.status(200).json({ orderId });
	})
);

router.route(`${apiUrl}/order/updateOrderStatus`).post(
	asyncHandler(async (req, res) => {
		const { orderId, updatedStatus } = req.body;

		const order = await Order.find({ orderId });

		const newOrderData = { ...order, status: updatedStatus };

		if (updatedStatus === "delivered" || updatedStatus === "Delivered") {
			newOrderData["deliveredAt"] = new Date().toISOString();
		}

		await Order.updateOne(
			{ orderId },
			{ $set: { ...newOrderData } },
			{ upsert: true }
		);

		res.status(200).json({ message: "Order Status Updated" });
	})
);

router.route(`${apiUrl}/orders`).get(
	asyncHandler(async (req, res) => {
		const orders = await Order.find();
		if (orders) {
			res.status(200).json({ orders });
		} else {
			res.status(201).json({ message: "No available orders" });
		}
	})
);

router.route(`${apiUrl}/order/:orderId`).get(
	asyncHandler(async (req, res) => {
		const { orderId } = req.params;
		const orders = await Order.findOne({ orderId: orderId });
		if (orders) {
			res.status(200).json({ orders });
		} else {
			res.status(201).json({ message: "No available orders" });
		}
	})
);
module.exports = router;
