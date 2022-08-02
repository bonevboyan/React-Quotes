import React from "react";
import classes from "./Notification.module.css";

import { useAppDispatch } from "../../store/hooks";
import { uiActions } from "../../store/ui-slice";

const Notification: React.FC<{
	status: string;
	title: string;
	message: string;
}> = (props) => {
	const dispatch = useAppDispatch();

	const closeNotificationHandler = () => {
		dispatch(uiActions.hideNotification());
	};

	let specialClasses = "";

	if (props.status === "error") {
		specialClasses = classes.error;
	}
	if (props.status === "success") {
		specialClasses = classes.success;
	}

	const cssClasses = `${classes.notification} ${specialClasses}`;

	return (
		<section className={cssClasses}>
			<h2>{props.title}</h2>
			<p>{props.message}</p>
			<button
				className={classes.close}
				onClick={closeNotificationHandler}
			>
				X
			</button>
		</section>
	);
};

export default Notification;
