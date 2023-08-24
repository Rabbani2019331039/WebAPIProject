import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CLIENT_API_URL } from "../api/apiURL";
import "./SignUpPage.css";

const CLIENT_API = CLIENT_API_URL;
const SignUpPage = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPass, setConfirmPass] = useState("");
	const [regError, setRegError] = useState(false);

	const registerUser = async (user) => {
		try {
			const response = await axios.post(`${CLIENT_API}/register`, user);
			setRegError(false);
			return true;
		} catch (err) {
			// console.log("here");
			console.log(err.response);
			setRegError(true);
			return false;
		}
	};

	const onSignUpButtonClick = async (e) => {
		e.preventDefault();
		if (!name || !email || !password || !confirmPass) {
			// return;
		}
		if (password != confirmPass) {
			setPassword("");
			setConfirmPass("");
			return alert("password didn't match");
		}
		const user = {
			name,
			email,
			password,
		};
		//  console.log(user);
		const f = await registerUser(user);
		if (f) {
			alert("Successful!!");
			console.log("Register Successful");
			localStorage.setItem(
				"user",
				JSON.stringify({ name: name, email: email })
			);
			navigate("/home-page");
		} else {
			alert("user already exist");
			navigate("/signup-page");
		}
	};

	const onHaveAnAccountClick = useCallback(() => {
		navigate("/login-page");
	}, [navigate]);

	return (
		<div className="sign-up-page">
			<main className="body5">
				<h2 className="sign-up4">Sign Up</h2>

				<form className="sign-up-form">
					{/* {regError && <div className="error-message">User Already Exist</div>} */}
					<div className="conf-pass">
						<div className="confirm-password">Confirm Password</div>
						<input
							className="confirm-password1"
							type="password"
							placeholder="Confirm Password"
							required
							id="confirm_password"
							value={confirmPass}
							onChange={(e) => setConfirmPass(e.target.value)}
						/>
					</div>
					<div className="password3">
						<div className="confirm-password">Password</div>
						<input
							className="confirm-password1"
							type="password"
							placeholder="Password"
							required
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className="user-name">
						<div className="name5">Name</div>
						<input
							className="user-name1"
							type="text"
							placeholder="Name"
							required
							id="user_name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="email4">
						<div className="name5">Email</div>
						<input
							className="user-name1"
							type="email"
							placeholder="Email"
							required
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<button className="sign-up-button1" onClick={onSignUpButtonClick}>
						<div className="sign-up3">Sign Up</div>
					</button>
					<a className="have-an-account" onClick={onHaveAnAccountClick}>
						Have an account? Login here.
					</a>
				</form>
			</main>
			<header className="navbar-l2">
				<h2 className="vintage-verb5">Vintage Verb</h2>
				<form className="button-section5">
					<a className="about-us5">About Us</a>
					<a className="about-us5">Sign Up</a>
					<Link className="login5" to="/login-page">
						Login
					</Link>
				</form>
			</header>
		</div>
	);
};

export default SignUpPage;
