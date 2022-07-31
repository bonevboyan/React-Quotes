import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";
import productSlice from "./product-slice";

const store = configureStore({
	reducer: {
		ui: uiSlice.reducer,
		cart: cartSlice.reducer,
		products: productSlice.reducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
