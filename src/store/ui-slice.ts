import { createSlice } from "@reduxjs/toolkit";
//import type { RootState } from "./index";

interface UIState {
	notification?: {
		status: string;
		title: string;
		message: string;
	};
	isShown: boolean;
}

const initialState: UIState = {
	isShown: false
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		showNotification(state, action) {
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

//export const selectNotification = (state: RootState) => state.ui.notification;
//export const selectIsCartVisible = (state: RootState) => state.ui.cartIsVisible;

export default uiSlice;
