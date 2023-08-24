import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BankAccSet from "../components/BankAccSet";
import ConfPayment from "../components/ConfPayment";
import PortalPopup from "../components/PortalPopup";
import "./CartPage.css";
const CartPage = () => {
	const [isBankAccSetPopupOpen, setBankAccSetPopupOpen] = useState(false);
	const [isBankSecOpen, setIsBankSecOpen] = useState(false);
	const navigate = useNavigate();

	const userInfo = JSON.parse(localStorage.getItem("user"));

	const [p1counter, setP1counter] = useState(0);
	const [p2counter, setP2counter] = useState(0);
	const [p3counter, setP3counter] = useState(0);

	const isBankExist = localStorage.getItem("userBank");
	// console.log(localStorage.getItem("userBank"));
	// console.log(isBankExist);

	useEffect(() => {
		if (!userInfo) {
			navigate("/login-page");
		}
	}, []);

	const onViewProductsClick = useCallback(() => {
		navigate("/home-page");
	}, [navigate]);

	const onMyProfileClick = useCallback(() => {
		navigate("/my-profile-page");
	}, [navigate]);

	const onLogOutClick = useCallback(() => {
		localStorage.removeItem("user");
		localStorage.removeItem("userBank");
		navigate("/login-page");
	}, [navigate]);

	const openBankSecPop = useCallback(() => {
		setIsBankSecOpen(true);
	}, []);

	const closeBankSecPop = useCallback(() => {
		setIsBankSecOpen(false);
	}, []);

	const closeBankAccPop = useCallback(() => {
		setBankAccSetPopupOpen(false);
	}, []);

	const onClickHandle = () => {
		localStorage.setItem(
			"amount",
			JSON.stringify({
				amount: p1counter * 98 + p2counter * 55 + p3counter * 40,
			})
		);
		if (isBankExist) {
			// console.log(localStorage.getItem("userBank"));
			setBankAccSetPopupOpen(false);
			setIsBankSecOpen(true);
		} else {
			setBankAccSetPopupOpen(true);
			setIsBankSecOpen(false);
		}
	};

	return (
		<>
			<div className="cart-page">
				<header className="navbar1">
					<h2 className="vintage-verb2">Vintage Verb</h2>
					<div className="button-section2">
						<a className="about-us2">About Us</a>
						<a className="view-products1" onClick={onViewProductsClick}>
							View Product
						</a>
						<a className="view-products1" onClick={onMyProfileClick}>
							My Profile
						</a>
						<button className="cart1">
							<img className="vector-icon1" alt="" src="/vector1.svg" />
						</button>
						<button className="log-out1" onClick={onLogOutClick}>
							Log Out
						</button>
					</div>
				</header>
				<main className="body2">
					<h1 className="items-in-your">Items in Your Cart</h1>
					<form className="cart-section">
						<div className="heading">
							<div className="product-name">Product name</div>
							<div className="product-name">Single price</div>
							<div className="product-name">Quantity</div>
							<div className="product-name">Total Price</div>
						</div>
						<div className="product">
							<div className="product-name">White Sofa</div>
							<div className="product-name">$98</div>
							<div
								className="minus-parent"
								onClick={() =>
									setP1counter((oldCount) =>
										oldCount === 0 ? 0 : oldCount - 1
									)
								}
							>
								<img className="minus-icon" alt="" src="/minus.svg" />
							</div>
							<div className="product-name">{p1counter}</div>
							<div
								className="minus-parent"
								onClick={() => setP1counter((oldCount) => oldCount + 1)}
							>
								<img
									className="minus-icon"
									alt=""
									src="/iconparkoutlineadd.svg"
								/>
							</div>
							<div className="product-name">${p1counter * 98}</div>
						</div>
						<div className="product">
							<div className="product-name">Ribbed Chair</div>
							<div className="product-name">$55</div>
							<div
								className="minus-parent"
								onClick={() =>
									setP2counter((oldCount) =>
										oldCount === 0 ? 0 : oldCount - 1
									)
								}
							>
								<img className="minus-icon" alt="" src="/minus.svg" />
							</div>
							<div className="product-name">{p2counter}</div>
							<div
								className="minus-parent"
								onClick={() => setP2counter((oldCount) => oldCount + 1)}
							>
								<img
									className="minus-icon"
									alt=""
									src="/iconparkoutlineadd.svg"
								/>
							</div>
							<div className="product-name">${p2counter * 55}</div>
						</div>
						<div className="product">
							<div className="product-name">Coffee Table</div>
							<div className="product-name">$40</div>
							<div
								className="minus-parent"
								onClick={() =>
									setP3counter((oldCount) =>
										oldCount === 0 ? 0 : oldCount - 1
									)
								}
							>
								<img className="minus-icon" alt="" src="/minus.svg" />
							</div>
							<div className="product-name">{p3counter}</div>
							<div
								className="minus-parent"
								onClick={() => setP3counter((oldCount) => oldCount + 1)}
							>
								<img
									className="minus-icon"
									alt=""
									src="/iconparkoutlineadd.svg"
								/>
							</div>
							<div className="product-name">${p3counter * 40}</div>
						</div>
						<div className="product">
							<div className="product-name">Sub Total</div>
							<div className="product-name">
								${p1counter * 98 + p2counter * 55 + p3counter * 40}
							</div>
						</div>
					</form>
					<button className="payment-button" onClick={onClickHandle}>
						<div className="proceed-to-payment">Proceed to payment</div>
					</button>
				</main>
			</div>
			{/* {isBankSecOpen && <ConfPayment onClose={closeBankSecPop} />} */}
			{isBankExist && isBankSecOpen && (
				<PortalPopup
					overlayColor="rgba(113, 113, 113, 0.3)"
					placement="Centered"
					onOutsideClick={closeBankSecPop}
				>
					{/* // 	{localStorage.setItem("amount",
				// 	{p1counter * 98 + p2counter * 55 + p3counter * 40})} */}
					<ConfPayment onClose={closeBankSecPop} />
				</PortalPopup>
			)}

			{isBankAccSetPopupOpen && (
				<PortalPopup
					overlayColor="rgba(113, 113, 113, 0.3)"
					placement="Centered"
					onOutsideClick={closeBankAccPop}
				>
					<BankAccSet onClose={closeBankAccPop} />
				</PortalPopup>
			)}
		</>
	);
};

export default CartPage;
