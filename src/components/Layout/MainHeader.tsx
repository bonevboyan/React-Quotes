import React from "react";
import { Link } from "react-router-dom";

import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
	return (
		<header className={classes.header}>
			<Link to="/products" style={{ textDecoration: 'none' }}>
				<h1>ReduxCart</h1>
			</Link>
			<nav>
				<ul>
					<li>
						<Link to="/products" style={{ textDecoration: 'none' }}>Shop</Link>
						<Link to="/addProduct" style={{ textDecoration: 'none' }}>Add a Product</Link>
						<CartButton />
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainHeader;
