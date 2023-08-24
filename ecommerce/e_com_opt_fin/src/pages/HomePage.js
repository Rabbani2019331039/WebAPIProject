import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SUPPLIER_EMAIL } from "../api/apiURL";
import "./HomePage.css";
const HomePage = () => {
	const navigate = useNavigate();

	const userInfo = JSON.parse(localStorage.getItem("user"));
	const isSupplier = userInfo.email === SUPPLIER_EMAIL;

	const onViewProductsClick = useCallback(() => {
		navigate("/home-page");
	}, [navigate]);

	const onMyProfileClick = useCallback(() => {
		navigate("/my-profile-page");
	}, [navigate]);

	const onCartClick = useCallback(() => {
		if (!isSupplier) {
			navigate("/cart-page");
		}
	}, [navigate]);

	const onLogOutClick = useCallback(() => {
		localStorage.removeItem("user");
		localStorage.removeItem("userBank");
		navigate("/login-page");
	}, []);

	return (
		<div className="home-page">
			<header className="navbar2">
				<h2 className="vintage-verb3">Vintage Verb</h2>
				<div className="button-section3">
					<a className="about-us3">About Us</a>
					<a className="view-products2" onClick={onViewProductsClick}>
						View Product
					</a>
					<a className="view-products2" onClick={onMyProfileClick}>
						My Profile
					</a>
					<button className="cart2" onClick={onCartClick}>
						<img className="vector-icon2" alt="" src="/vector.svg" />
					</button>
					<button className="log-out2" onClick={onLogOutClick}>
						Log Out
					</button>
				</div>
			</header>
			<main className="body3">
				<h1 className="our-products">Our Products</h1>
				<ul className="product4">
					<div className="product31">
						<img className="product3-icon" alt="" src="/product3@2x.png" />
						<h1 className="white-ottoma-style">White Ottoma Style Sofa</h1>
						<h3 className="price-98">price 98$</h3>
						{/* <button className="add-cart-button">
							<div className="add-to-cart">Add to Cart</div>
						</button> */}
					</div>
					<div className="product31">
						<img className="product3-icon" alt="" src="/product@2x.png" />
						<h1 className="a-ribbed-mid2">A Ribbed Mid Century Modern Chair</h1>
						<h4 className="price-552">Price 55$</h4>
						{/* <button className="add-cart-button">
							<div className="add-to-cart">Add to Cart</div>
						</button> */}
					</div>
					<div className="product31">
						<img className="product3-icon" alt="" src="/product2@2x.png" />
						<h1 className="wooded-coffee-table">Wooded Coffee Table</h1>
						{/* <button className="add-cart-button2">
							<div className="add-to-cart">Add to Cart</div>
						</button> */}
						<h4 className="price-98">Price 40$</h4>
					</div>
				</ul>
			</main>
		</div>
	);
};

export default HomePage;
