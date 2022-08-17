import React, { useContext } from "react";
import useInput from "../../hooks/use-input";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

import classes from "./Login.module.css";
import { useAppDispatch } from "../../store/hooks";
import { uiActions } from "../../store/ui-slice";

const AddProduct = () => {
	const ctx = useContext(AuthContext);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const {
		value: enteredName,
		isValid: nameIsValid,
		hasError: nameError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		reset: nameReset,
	} = useInput((value: string) => value.length >= 2);

	const {
		value: enteredPassword,
		isValid: passwordIsValid,
		hasError: passwordError,
		valueChangeHandler: passwordChangeHandler,
		inputBlurHandler: passwordBlurHandler,
		reset: passwordReset,
	} = useInput((value: string) => value.length >= 5);

	const isFormValid = nameIsValid && passwordIsValid;

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();

        passwordReset();
        nameReset();

		if (ctx.onLogin(enteredName, enteredPassword)) {
			navigate("/products");
			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Success!",
					message: "Successfully logged in!",
				})
			);
		} else {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Invalid login!",
				})
			);
		}
	};

	return (
		<section className={classes.loginForm}>
			<h2>Login</h2>
			<form className={classes.form} onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						onBlur={nameBlurHandler}
						onChange={nameChangeHandler}
						value={enteredName}
					/>
					{nameError && (
						<p className={classes["error-text"]}>
							Name should be at least 2 characters long.
						</p>
					)}
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Password</label>
					<input
						type="text"
						id="password"
						onBlur={passwordBlurHandler}
						onChange={passwordChangeHandler}
						value={enteredPassword}
					/>
					{passwordError && (
						<p className={classes["error-text"]}>
							Price should be at least 6 characters long.
						</p>
					)}
				</div>
				<div className={classes.actions}>
					<button className={classes.submit} disabled={!isFormValid}>
						Login
					</button>
				</div>
			</form>
		</section>
	);
};

export default AddProduct;
