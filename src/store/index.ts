// import { configureStore } from "@reduxjs/toolkit";

// import uiSlice from "./ui-slice";
// import cartSlice from "./cart-slice";
// import productSlice from "./product-slice";

// const store = configureStore({
// 	reducer: {
// 		ui: uiSlice.reducer,
// 		cart: cartSlice.reducer,
// 		products: productSlice.reducer,
// 	},
// });

// export default store;

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";

import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";
import productSlice from "./product-slice";

// Create the root reducer separately so we can extract the RootState type
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
