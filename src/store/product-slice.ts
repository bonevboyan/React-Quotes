import { createSlice } from "@reduxjs/toolkit";

interface Product {
    id: string;
	price: number;
	title: string;
    description: string;
}

export interface ProductsState {
	products: Product[];
	changed: boolean;
}

const initialState: ProductsState = {
    products: [],
	changed: false
};

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
        replaceProducts(state, action) {
			state.products = action.payload.items;
		},
		addProduct(state, action) {
            state.products.push({
                id: state.products.length.toString(),
                title: action.payload.title,
                price: action.payload.price,
                description: action.payload.description
            });
			state.changed = true;
		},
	},
});

export const productActions = productSlice.actions;

//export const selectNotification = (state: RootState) => state.ui.notification;
//export const selectIsCartVisible = (state: RootState) => state.ui.cartIsVisible;

export default productSlice;
