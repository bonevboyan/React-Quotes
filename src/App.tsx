import React, { Fragment, useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "./store/hooks";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";
import { sendProductData, fetchProductsData } from "./store/product-actions";
import AddProduct from "./components/AddProduct/AddProduct";
import AuthContext from "./store/auth-context";
import Login from "./components/Login/Login";

function App() {
	const ctx = useContext(AuthContext);

	const dispatch = useAppDispatch();
	const cart = useAppSelector((state) => state.cart);
	const products = useAppSelector((state) => state.products);
	const notification = useAppSelector((state) => state.ui.notification);
	const isNotificationShown = useAppSelector((state) => state.ui.isShown);

	useEffect(() => {
		console.log(process.env.REACT_APP_FIREBASE_DEMO_URL);
		dispatch(fetchCartData());
		dispatch(fetchProductsData());
	}, [dispatch]);

	useEffect(() => {
		if (cart.changed) {
			dispatch(sendCartData(cart));
		}
	}, [cart, dispatch]);

	useEffect(() => {
		if (products.changed) {
			dispatch(sendProductData(products));
		}
	}, [products, dispatch, products.changed]);

	return (
		<Fragment>
			{isNotificationShown && notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				<Routes>
					<Route path="/products" element={<Products />} />
					{!ctx.isLoggedIn && (
						<Route path="/login" element={<Login />} />
					)}
					{ctx.isLoggedIn && (
						<Route path="/addProduct" element={<AddProduct />} />
					)}

					<Route path="/cart" element={<Cart />} />
					<Route
						path="*"
						element={<Navigate to="/products" replace />}
					/>
				</Routes>
			</Layout>
		</Fragment>
	);
}

export default App;
