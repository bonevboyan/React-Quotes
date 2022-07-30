import React, { Fragment } from "react";
import MainHeader from "./MainHeader";

const Layout: React.FC<{ children?: React.ReactNode }> = (props) => {
	return (
		<Fragment>
			<MainHeader />
			<main>{props.children}</main>
		</Fragment>
	);
};

export default Layout;
