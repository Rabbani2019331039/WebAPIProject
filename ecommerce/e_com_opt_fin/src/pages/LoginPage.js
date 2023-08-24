import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BANK_API_URL, CLIENT_API_URL } from "../api/apiURL";
import "./LoginPage.css";
const LoginPage = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState(false);

	const loginUser = async (user) => {
		try {
			// console.log(CLIENT_API_URL);
			const response = await axios.post(`${CLIENT_API_URL}/login`, user);
			console.log(response.data);
			localStorage.setItem("user", JSON.stringify(response.data));
			setLoginError(false);
			return true;
		} catch (err) {
			console.log(err);
			setLoginError(true);
			return false;
		}
	};

	const fetchBankInfo = async () => {
		try {
			const response = await axios.get(
				`${BANK_API_URL}/account/email/${
					JSON.parse(localStorage.getItem("user")).email
				}`
			);

			if (response.data.account) {
				localStorage.setItem(
					"userBank",
					JSON.stringify({
						accountNumber: response.data.account.accountNo,
						name: response.data.account.name,
						// bankSec: response.data.account.bankSecret,
					})
				);
			}
		} catch (err) {
			console.log();
		}
	};

	const onLoginClick = async (e) => {
		e.preventDefault();
		const user = {
			email,
			password,
		};

		const f = await loginUser(user);
		console.log(f);
		if (f) {
			await fetchBankInfo();
			navigate("/home-page");
		} else {
			navigate("/login-page");
		}
		// await fetchBankInfo();
		// // alert("successful");
		// navigate("/home-page");
	};

	const onSignUpClick = useCallback(() => {
		navigate("/signup-page");
	}, [navigate]);

	const onLoginText2Click = useCallback(() => {
		const anchor = document.querySelector("[data-scroll-to='body']");
		if (anchor) {
			anchor.scrollIntoView({ block: "start", behavior: "smooth" });
		}
	}, []);

	return (
		<div className="login-page">
			<main className="body4" data-scroll-to="body">
				<div className="login-form">
					{loginError && (
						<div className="error-message">Invalid email or password.</div>
					)}
					<div className="email1">
						<div className="email2">Email</div>
						<input
							className="email3"
							type="email"
							placeholder="Email"
							required
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="password">
						<div className="password1">Password</div>
						<input
							className="password2"
							type="password"
							placeholder="Password"
							required
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button className="login1" onClick={onLoginClick}>
						<div className="login2">Login</div>
					</button>
					<a className="dont-have-an">Don’t have an account? Sign Up here.</a>
				</div>
				<div className="login3">Login</div>
			</main>
			<div className="navbar-l1">
				<h2 className="vintage-verb4">Vintage Verb</h2>
				<div className="button-section4">
					<a className="about-us4">About Us</a>
					<a className="sign-up2" onClick={onSignUpClick}>
						Sign Up
					</a>
					<div className="login4" onClick={onLoginText2Click}>
						Login
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
