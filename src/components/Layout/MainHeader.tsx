import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
	const ctx = useContext(AuthContext);

	return (
		<header className={classes.header}>
			<Link to="/products" style={{ textDecoration: 'none' }}>
				<h1>ReduxCart</h1>
			</Link>
			<nav>
				<ul>
					<li>
						<Link to="/products" style={{ textDecoration: 'none' }}>Shop</Link>
						{ctx.isLoggedIn && <>
							<Link to="/addProduct" style={{ textDecoration: 'none' }}>Add a Product</Link>
							<Link to="/logout" style={{ textDecoration: 'none' }} onClick={() => ctx.onLogout()}>Logout</Link>
						</>}
						{!ctx.isLoggedIn && <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>}
						<CartButton />
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainHeader;
