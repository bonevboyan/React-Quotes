import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";

import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";
import productSlice from "./product-slice";

const rootReducer = combineReducers({
	cart: cartSlice.reducer,
	ui: uiSlice.reducer,
	products: productSlice.reducer,
});

const setupStore = (preloadedState?: PreloadedState<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
};

export default setupStore;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
