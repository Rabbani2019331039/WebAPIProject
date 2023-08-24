import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	CLIENT_API_URL,
	SUPPLIER_API_URL,
	SUPPLIER_EMAIL,
} from "../api/apiURL";
import "./MyProfilePage.css";
const MyProfilePage = () => {
	const navigate = useNavigate();
	const userInfo = JSON.parse(localStorage.getItem("user"));
	const userBankInfo = JSON.parse(localStorage.getItem("userBank"));

	const isSupplier = userInfo.email === SUPPLIER_EMAIL;
	// console.log(isSupplier);
	const [orders, setOrders] = useState(null);
	const [userOrders, setUserOrders] = useState([]);
	const [orderStatus, setOrderStatus] = useState("Pending");
	// const [orderStatusUpdated, setOrderStatusUpdated] = useState(false);

	const fetch = async (user) => {
		try {
			const response = await axios.post(`${CLIENT_API_URL}/user`, {
				email: user,
			});
			setOrders(response.data);
			// console.log(user);
			// console.log(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchOrders = async () => {
		const orderDetailsPromises = orders.map(async (order) => {
			try {
				const orderDetailsResponse = await axios.get(
					`${SUPPLIER_API_URL}/order/${order}`
				);
				// console.log(orderDetailsResponse.data);
				return orderDetailsResponse.data;
			} catch (err) {
				console.log(err);
				return null;
			}
		});

		const orderDetails = await Promise.all(orderDetailsPromises);
		setUserOrders(orderDetails.filter((order) => order !== null));
		// console.log(orderDetails);

		// userOrders.map((item, index) => {
		// 	console.log(index + " " + item.orders.orderId);
		// });
	};

	const fetchAllOrders = async () => {
		try {
			const orderDetails = await axios.get(`${SUPPLIER_API_URL}/orders`);
			const transformedData = [];

			orderDetails.data.orders.forEach((order) => {
				transformedData.push({ orders: order });
			});

			// console.log(transformedData);
			setUserOrders(transformedData);
			// setUserOrders(orderDetails.data);
		} catch (err) {
			console.log(err);
		}

		// userOrders.map((item, index) => {
		// 	console.log(index + " " + item.orders.orderId);
		// });
	};

	const updateStatus = async (oId, status) => {
		const body = {
			orderId: oId,
			updatedStatus: status,
		};
		try {
			const response = await axios.post(
				`${SUPPLIER_API_URL}/order/updateOrderStatus`,
				body
			);
			console.log(response.data);
			// setOrderStatusUpdated(true);
		} catch (error) {
			console.log(error);
		}
	};
	const handleChange = (e, oId) => {
		setOrderStatus(e.target.value);
		updateStatus(oId, orderStatus);
	};

	useEffect(() => {
		if (!userInfo) {
			navigate("/login-page");
		} else {
			fetch(userInfo.email);
		}
	}, []);
	useEffect(() => {
		if (!isSupplier && orders) fetchOrders();
		if (isSupplier) fetchAllOrders();
	}, [orders, handleChange]);

	const onViewProductsClick = useCallback(() => {
		navigate("/home-page");
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
	}, [navigate]);

	return (
		<div className="my-profile-page">
			<header className="navbar">
				<h2 className="vintage-verb1">Vintage Verb</h2>
				<div className="button-section1">
					<a className="my-profile">About Us</a>
					<a className="view-products" onClick={onViewProductsClick}>
						View Product
					</a>
					<a className="my-profile">My Profile</a>
					<button className="cart" onClick={onCartClick}>
						<img className="vector-icon" alt="" src="/vector.svg" />
					</button>
					<button className="log-out" onClick={onLogOutClick}>
						Log Out
					</button>
				</div>
			</header>
			<main className="body1">
				<div className="info">
					<div className="frame1">
						<h1 className="my-profile1">My Profile</h1>
					</div>
					<div className="frame2">
						<ul className="profile-info">
							<div className="name-info">
								<div className="name">Name</div>
								<div className="name">{userInfo ? userInfo.name : ""}</div>
							</div>
							<div className="name-info">
								<div className="name">Email</div>
								<div className="name">{userInfo ? userInfo.email : ""}</div>
							</div>
							<div className="name-info">
								<div className="name">Bank Account name</div>
								<div className="name">
									{userBankInfo ? userBankInfo.name : ""}
								</div>
							</div>
							<div className="bank-acc-num-info">
								<div className="name">Bank Account number</div>
								<div className="name">
									{userBankInfo ? userBankInfo.accountNumber : ""}
								</div>
							</div>
						</ul>
					</div>
				</div>
				<div className="order-list">
					<h1 className="my-orders">My orders</h1>
					<form className="orders">
						<div className="MyProfileHeading">
							<div className="order-id">Order ID</div>
							<div className="order-id">Transaction ID</div>
							<div className="order-id">Total amount</div>
							<div className="order-id">Order Date</div>
							<div className="order-id">Delivery Date</div>
							<div className="order-id">Order Status</div>
						</div>
						<ul className="list">
							{userOrders.map((item, index) => (
								<li className="My-product" key={index}>
									<div className="oid">{item.orders.orderId}</div>
									<div className="tid">{item.orders.transactionId}</div>
									<div className="tid">${item.orders.amount}</div>
									<div className="tid">
										{String(item.orders.orderAt).substring(0, 10)}
									</div>
									<div className="tid">
										{item.orders.deliveredAt
											? String(item.orders.deliveredAt).substring(0, 10)
											: "-"}
									</div>
									{isSupplier && (
										<select
											value={item.orders.status}
											onChange={(e) => handleChange(e, item.orders.orderId)}
											disabled={item.orders.status === "Delivered"}
										>
											<option value="Pending">Pending</option>

											<option value="Accepted">Accepted</option>

											<option
												value="Delivered"
												disabled={item.orders.status === "Delivered"}
											>
												Delivered
											</option>
										</select>
									)}

									{!isSupplier && (
										<div className="tid">{item.orders.status}</div>
									)}
								</li>
							))}
						</ul>
					</form>
				</div>
			</main>
		</div>
	);
};

export default MyProfilePage;
