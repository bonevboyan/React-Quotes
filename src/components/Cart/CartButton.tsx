import React from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../store/hooks";

import classes from "./CartButton.module.css";

const CartButton = () => {
	const cartQuantity = useAppSelector((state) => state.cart.totalQuantity);

	return (
		<Link to="/cart" style={{ textDecoration: 'none' }} className={classes.button}>
			<span>My Cart</span>
			<span className={classes.badge}>{cartQuantity}</span>
		</Link>
	);
};

export default CartButton;
