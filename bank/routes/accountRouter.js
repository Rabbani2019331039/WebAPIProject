const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Transaction = require("../models/Transaction");
const Account = require("../models/Accounts");
const apiUrl = "/api/v1";

router.get("/", async (req, res) => {
	res.json({ message: "bank server running" });
});

//getting a user account
router.route(`${apiUrl}/account/email/:email`).get(
	asyncHandler(async (req, res) => {
		const account = await Account.findOne({ email: req.params.email });

		res.json({ account });
	})
);

router.route(`${apiUrl}/account/:accountNo`).get(
	asyncHandler(async (req, res) => {
		const account = await Account.findOne({ accountNo: req.params.accountNo });

		res.json({ account });
	})
);

router.route(`${apiUrl}/account/createAccount`).post(
	asyncHandler(async (req, res) => {
		const { name, email, accountNo, balance, bankSecret } = req.body;

		console.log(req.body);
		//confirm data
		if (!name || !email || !accountNo || !bankSecret) {
			return res.status(400).json({ message: "all fields are required" });
		}

		//check duplicate
		const duplicate = await Account.findOne({ accountNo });
		if (duplicate) {
			return res.status(409).json({ message: "Duplicate account" });
		}

		const account = await Account.create({
			name,
			email,
			accountNo,
			bankSecret,
		});

		if (account) {
			res.status(201).json({ message: `New account created` });
		} else {
			res.status(400).json({ message: `Invalid data` });
		}
	})
);

router.post(
	`${apiUrl}/transaction`,
	asyncHandler(async (req, res) => {
		const { senderAccNo, receiverAccNo, amount } = req.body;

		console.log(senderAccNo);
		console.log(receiverAccNo);
		console.log(amount);
		//confirm data
		if (!senderAccNo || !receiverAccNo || !amount) {
			return res.status(400).json({ message: "all fields are required" });
		}

		if (senderAccNo === receiverAccNo) {
			return res
				.status(400)
				.json({ message: "cannot make transaction in the same account" });
		}

		const senderAcc = await Account.findOne({ accountNo: senderAccNo });
		const receiverAcc = await Account.findOne({ accountNo: receiverAccNo });

		const senderBalance = senderAcc.balance - amount;
		const receiverBalance = receiverAcc.balance + amount;

		if (senderBalance < 0) {
			return res.status(400).json({ message: "insufficient balance" });
		}

		await Account.updateOne(
			{ accountNo: senderAcc.accountNo },
			{ $set: { balance: senderBalance } }
		);
		await Account.updateOne(
			{ accountNo: receiverAcc.accountNo },
			{ $set: { balance: receiverBalance } }
		);

		const randomNum = parseInt(Math.floor(Math.random() * 100));
		const Tid = `${Date.now()}${randomNum}`;

		const transaction = new Transaction({
			senderAccNo,
			receiverAccNo,
			transactionAmount: amount,
			transactionId: Tid,
			transactionAt: new Date().toISOString(),
		});

		await transaction.save();
		res.status(201).json({
			Tid,
			message:
				"transaction successful: " +
				amount +
				" From account " +
				senderAccNo +
				" To account " +
				receiverAccNo,
		});
	})
);

module.exports = router;
