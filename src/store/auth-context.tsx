import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: (): void => {},
	onLogin: (name: string, password: string): boolean => {
		return false;
	},
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = (
	props
) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storedUserLoggedInInformation =
			localStorage.getItem("isLoggedIn");

		if (storedUserLoggedInInformation === "1") {
			setIsLoggedIn(true);
		}
	}, []);

	const logoutHandler = () => {
		localStorage.removeItem("isLoggedIn");
		setIsLoggedIn(false);
	};

	const loginHandler = (name: string, password: string): boolean => {
		if(name === "admin" && password === "admin"){
			localStorage.setItem("isLoggedIn", "1");
			setIsLoggedIn(true);
			return true;
		}
		return false;
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
