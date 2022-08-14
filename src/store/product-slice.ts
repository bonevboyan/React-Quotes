import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InputProduct {
	price: number;
	title: string;
    description: string;
}

export interface Product extends InputProduct {
    id: string;
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
        replaceProducts(state, action: PayloadAction<Product[]>) {
			state.products = action.payload;
		},
		addProduct(state, action: PayloadAction<InputProduct>) {
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

export default productSlice;
