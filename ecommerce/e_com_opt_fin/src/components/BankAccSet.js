import axios from "axios";
import { useCallback, useState } from "react";
import { BANK_API_URL } from "../api/apiURL";
import "./BankAccSet.css";
import ConfPayment from "./ConfPayment";
import PortalPopup from "./PortalPopup";
const BankAccSet = ({ onClose }) => {
	const [isConfPaymentPopupOpen, setConfPaymentPopupOpen] = useState(false);
	const [name, setName] = useState("");
	const [accountNumber, setAccountNumber] = useState("");
	const [sec, setSec] = useState("");

	const localUser = JSON.parse(localStorage.getItem("user"));

	const registerBank = async (user) => {
		try {
			const response = await axios.post(
				`${BANK_API_URL}/account/createAccount`,
				user
			);
		} catch (err) {
			console.log(err);
		}
	};

	const openConfPaymentPopup = async (e) => {
		// setConfPaymentPopupOpen(true);

		e.preventDefault();
		const user = {
			email: localUser.email,
			name,
			accountNo: accountNumber,
			bankSecret: sec,
		};

		localStorage.setItem("userBank", JSON.stringify({ accountNumber, name }));
		//  console.log(user);

		registerBank(user);
		alert("Successful!!");
		console.log("bank Register Successful");
		onClose();
	};

	const closeConfPaymentPopup = useCallback(() => {
		setConfPaymentPopupOpen(false);
	}, []);

	return (
		<>
			<div className="bank-acc-set">
				<div className="set-up-bank">Set Up Bank Account</div>
				<form className="bank-info-form" method="POST">
					<div className="account-name-input">
						<div className="account-name">Account name</div>
						<input
							className="secret-code"
							type="text"
							placeholder="Account name"
							required
							id="account_name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="account-number-input">
						<div className="account-name">Account Number</div>
						<input
							className="secret-code"
							type="text"
							placeholder="Account Number"
							required
							id="account_number"
							value={accountNumber}
							onChange={(e) => setAccountNumber(e.target.value)}
						/>
					</div>
					<div className="secret-code-input1">
						<div className="account-name">Secret Code</div>
						<input
							className="secret-code"
							type="number"
							placeholder="Secret Code"
							required
							id="secret_code"
							value={sec}
							onChange={(e) => setSec(e.target.value)}
						/>
					</div>
					<button className="done-button" onClick={openConfPaymentPopup}>
						<div className="done">Done</div>
					</button>
				</form>
			</div>
			{/* {isConfPaymentPopupOpen && (
				<PortalPopup
					overlayColor="rgba(113, 113, 113, 0.3)"
					placement="Centered"
					onOutsideClick={closeConfPaymentPopup}
				>
					<ConfPayment onClose={closeConfPaymentPopup} />
				</PortalPopup>
			)} */}
		</>
	);
};

export default BankAccSet;
