import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
	status: string;
	title: string;
	message: string;
}

interface UIState {
	notification?: Notification;
	isShown: boolean;
}

const initialState: UIState = {
	isShown: false
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		showNotification(state, action: PayloadAction<Notification>) {
			state.isShown = true;

			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			};
		},
		hideNotification(state) {
			state.isShown = false;
		}
	},
});

export const uiActions = uiSlice.actions;

export default uiSlice;
