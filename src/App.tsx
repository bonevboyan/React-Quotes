import React, { Fragment, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "./store/hooks";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";
import AddProduct from "./components/AddProduct/AddProduct";

let isInitial = true;

function App() {
	const dispatch = useAppDispatch();
	const cart = useAppSelector((state) => state.cart);
	const notification = useAppSelector((state) => state.ui.notification);

	useEffect(() => {
		dispatch(fetchCartData());
	}, [dispatch]);

	useEffect(() => {
		if (isInitial) {
			isInitial = false;
			return;
		}

		if (cart.changed) {
			dispatch(sendCartData(cart));
		}
	}, [cart, dispatch]);

	return (
		<Fragment>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				<Routes>
					<Route path="/products" element={<Products />} />
					<Route path="/addProduct" element={<AddProduct />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="*" element={<Navigate to="/products" replace />} />
				</Routes>
			</Layout>
		</Fragment>
	);
}

export default App;
