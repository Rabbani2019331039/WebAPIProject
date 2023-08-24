const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const User = require("../model/User");

// Register a new user
router.route("/register").post(
	asyncHandler(async (req, res) => {
		const { name, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 12);

		const foundUser = await User.findOne({ email });

		if (foundUser) {
			return res.status(400).json({ message: "User Already Exists!" });
		}

		const user = new User({ name, email, password: hashedPassword });
		user.save();
		res.status(200).send("User Registered successfully!");
	})
);

// Existing user Login
router.route("/login").post(
	asyncHandler(async (req, res) => {
		const { email, password } = req.body;

		const foundUser = await User.findOne({ email });

		if (!foundUser) {
			return res.status(404).json({ message: "User Doesn't Exist!" });
		}

		const passwordMatch = await bcrypt.compare(password, foundUser.password);

		if (!passwordMatch) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		const CurrentUser = {
			name: foundUser.name,
			email: foundUser.email,
			orders: foundUser.orders,
		};

		res.status(200).send(CurrentUser);
	})
);

router.route("/user").post(
	asyncHandler(async (req, res) => {
		const { email } = req.body;

		const foundUser = await User.findOne({ email });

		if (!foundUser) {
			return res.status(404).json({ message: "User Doesn't Exist!" });
		}

		res.status(200).send(foundUser.orders);
	})
);

// Insert an order for a user
router.route("/insert-order").post(
	asyncHandler(async (req, res) => {
		const { email, orderId } = req.body;

		const foundUser = await User.findOne({ email });

		if (!foundUser) {
			return res.status(404).json({ message: "User Doesn't Exist!" });
		}

		// Add the order to the user's orders array
		foundUser.orders.push(orderId);

		// Save the updated user document
		await foundUser.save();

		res.status(200).json({ message: "Order inserted successfully!" });
	})
);

module.exports = router;
