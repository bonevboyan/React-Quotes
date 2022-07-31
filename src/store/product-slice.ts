import { createSlice } from "@reduxjs/toolkit";

interface Product {
    id: string;
	price: number;
	title: string;
    description: string;
}

export interface ProductsState {
	products: Product[];
}

const initialState: ProductsState = {
    products: []
};

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
        
		addProduct(state, action) {
            state.products.push({
                id: state.products.length.toString(),
                title: action.payload.title,
                price: action.payload.price,
                description: action.payload.description
            });
		},
	},
});

export const productActions = productSlice.actions;

//export const selectNotification = (state: RootState) => state.ui.notification;
//export const selectIsCartVisible = (state: RootState) => state.ui.cartIsVisible;

export default productSlice;
