import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

interface UIState {
	cartIsVisible: boolean;
	notification?: {
		status: string;
		title: string;
		message: string;
	};
}

const initialState: UIState = {
	cartIsVisible: false,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		toggle(state) {
			state.cartIsVisible = !state.cartIsVisible;
		},
		showNotification(state, action) {
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			};
		},
	},
});

export const uiActions = uiSlice.actions;

//export const selectNotification = (state: RootState) => state.ui.notification;
//export const selectIsCartVisible = (state: RootState) => state.ui.cartIsVisible;

export default uiSlice;
