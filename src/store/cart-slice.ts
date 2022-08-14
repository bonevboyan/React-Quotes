import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InputItem {
	id: string;
	price: number;
	name: string;
}

export interface Item extends InputItem {
	id: string;
	price: number;
	quantity: number;
	totalPrice: number;
	name: string;
}

interface Cart {
	items: Item[];
	totalQuantity: number;
}

export interface CartState extends Cart {
	changed: boolean;
}

const initialState: CartState = {
	items: [],
	totalQuantity: 0,
	changed: false,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		replaceCart(state, action: PayloadAction<Cart>) {
			state.totalQuantity = action.payload.totalQuantity;
			state.items = action.payload.items;
		},
		addItemToCart(state, action: PayloadAction<InputItem>) {
			const newItem = action.payload;
			const existingItem = state.items.find(
				(item) => item.id === newItem.id
			);

			state.totalQuantity++;
			state.changed = true;

			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.name,
				});
			} else {
				existingItem.quantity++;

				existingItem.totalPrice =
					existingItem.totalPrice + newItem.price;
			}
		},
		removeItemFromCart(state, action: PayloadAction<string>) {
			const id = action.payload;
			const existingItem = state.items.find((item) => item.id === id);

			if(!existingItem) return;

			state.totalQuantity--;
			state.changed = true;

			if (existingItem.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== id);
			} else {
				existingItem.quantity--;
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			}
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;
