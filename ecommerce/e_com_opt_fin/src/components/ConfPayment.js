import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	BANK_API_URL,
	CLIENT_API_URL,
	SUPPLIER_ACCOUNT,
	SUPPLIER_API_URL,
} from "../api/apiURL";
import "./ConfPayment.css";
const ConfPayment = () => {
	const navigate = useNavigate();

	const [secretCode, setSecretCode] = useState("");
	// const [tid, setTid] = useState("");

	var sCode;

	const fetchSecretCode = async () => {
		// console.log("fetching the secret code", secretCode);
		try {
			console.log("fetching secret");
			const response = await axios.get(
				`${BANK_API_URL}/account/${
					JSON.parse(localStorage.getItem("userBank")).accountNumber
				}`
			);

			console.log("matching Secret");
			if (response.data.account.bankSecret === secretCode) {
				await apiWork();
			} else {
				alert("secret code does not match");
			}
		} catch (err) {
			// console.log("here");
			console.log(err);
		}
	};

	const apiWork = async () => {
		let transactionId;

		//do transaction with api /transaction
		console.log("making transaction");
		try {
			const body = {
				senderAccNo: JSON.parse(localStorage.getItem("userBank")).accountNumber,
				receiverAccNo: SUPPLIER_ACCOUNT,
				amount: JSON.parse(localStorage.getItem("amount")).amount,
			};
			const response = await axios.post(`${BANK_API_URL}/transaction`, body);
			// setTid(response.data.Tid);
			transactionId = response.data.Tid;
			// console.log("tid: " + response.data.Tid);
			console.log("transaction done");
		} catch (error) {
			console.log(error);
		}

		//order creation with API /createOrder
		console.log("placing order");
		try {
			const body = {
				transactionId: transactionId,
				amount: JSON.parse(localStorage.getItem("amount")).amount,
			};
			const response = await axios.post(
				`${SUPPLIER_API_URL}/createOrder`,
				body
			);
			localStorage.removeItem("amount");
			console.log("order placed");

			// console.log(response.data.orderId);
			try {
				const reqBody = {
					email: JSON.parse(localStorage.getItem("user")).email,
					orderId: response.data.orderId,
				};
				const insertOrderResponse = await axios.post(
					`${CLIENT_API_URL}/insert-order`,
					reqBody
				);
				// console.log(insertOrderResponse.data.message);
				console.log("order placed");
			} catch (error) {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const scrollAnimElements = document.querySelectorAll(
			"[data-animate-on-scroll]"
		);
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting || entry.intersectionRatio > 0) {
						const targetElement = entry.target;
						targetElement.classList.add("animate");
						observer.unobserve(targetElement);
					}
				}
			},
			{
				threshold: 0.15,
			}
		);

		for (let i = 0; i < scrollAnimElements.length; i++) {
			observer.observe(scrollAnimElements[i]);
		}

		return () => {
			for (let i = 0; i < scrollAnimElements.length; i++) {
				observer.unobserve(scrollAnimElements[i]);
			}
		};
	}, []);

	// useEffect(() => {
	// console.log(secretCode);
	// 	sCode = secretCode;
	// }, [secretCode]);

	const handleOnchange = (e) => {
		// console.log(e.target.value);
		setSecretCode((prev) => e.target.value);
		// sCode = e.target.value;
	};

	const onConfirmButtonClick = async () => {
		// setSecretCode(e.target.value);
		// console.log("secret code on button" + secretCode);
		await fetchSecretCode();
		navigate("/my-profile-page");
	};

	return (
		<div className="conf-payment" data-animate-on-scroll>
			<button className="confirm-button" onClick={onConfirmButtonClick}>
				<div className="confirm">Confirm</div>
			</button>
			<h1 className="confirm-payment">Confirm payment</h1>
			<h2 className="please-enter-your">Please enter your secret code</h2>
			<input
				className="secret-code-input"
				type="text"
				placeholder="Secret Code"
				required
				id="secret_code"
				value={secretCode}
				onChange={handleOnchange}
			/>
		</div>
	);
};

export default ConfPayment;
