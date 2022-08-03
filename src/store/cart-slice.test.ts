import cartSlice, { cartActions } from "./cart-slice";

const cartReducer = cartSlice.reducer;
const initialState = cartReducer(undefined, { type: "" });

const testItem = {
	id: "1",
	price: 1,
	quantity: 1,
	totalPrice: 1,
	name: "test",
};

const testCartState = {
	items: [testItem],
	totalQuantity: 1,
	changed: false,
};

describe("cart slice", () => {
	it("should return the initial state", () => {
		expect(initialState).toEqual({
			items: [],
			totalQuantity: 0,
			changed: false,
		});
	});
	it("should replace cart with correct data", () => {
		const payload = {
			totalQuantity: 1,
			items: [
				{ id: "1", price: 1, quantity: 1, totalPrice: 1, name: "test" },
			],
		};

		const action = cartActions.replaceCart(payload);
		const result = cartReducer(initialState, action);

		expect(result.items).toEqual(payload.items);
		expect(result.totalQuantity).toEqual(payload.totalQuantity);
	});
	it("should add new item to cart", () => {
		const newItem = {
			id: "2",
			price: 1,
			title: "another test",
		};

		const action = cartActions.addItemToCart(newItem);
		const result = cartReducer(testCartState, action);

        expect(result.changed).toEqual(true);
		expect(result.items.length).toEqual(testCartState.items.length + 1);
		expect(result.items[0].quantity).toEqual(testItem.quantity);
		expect(result.totalQuantity).toEqual(
			testCartState.totalQuantity + 1
		);
	});
	it("should add existing item to cart and increase its quantity", () => {
		const newItem = {
			id: "1",
			price: 1,
			name: "test",
		};

		const action = cartActions.addItemToCart(newItem);
		const result = cartReducer(testCartState, action);

		expect(result.items.length).toEqual(testCartState.items.length);
		expect(result.items[0].quantity).toEqual(
			testItem.quantity + 1
		);
		expect(result.items[0].totalPrice).toEqual(
			testItem.quantity + 1
		);
	});
	it("should remove only existing item from cart", () => {
		const action = cartActions.removeItemFromCart(testItem.id);
		const result = cartReducer(testCartState, action);

        expect(result.changed).toEqual(true);
		expect(result.items.length).toEqual(testCartState.items.length - 1);
        expect(result.totalQuantity).toEqual(testCartState.totalQuantity - 1);
	});
	it("should return if item is nonexistent", () => {
		const action = cartActions.removeItemFromCart("fake id");
		const result = cartReducer(testCartState, action);

        expect(result.changed).toEqual(false);
		expect(result.items.length).toEqual(testCartState.items.length);
        expect(result.totalQuantity).toEqual(testCartState.totalQuantity);
	});
	it("should reduce quantity of item", () => {
        const newTestItem = {
            id: "1",
            price: 1,
            quantity: 2,
            totalPrice: 2,
            name: "test",
        };
        const newTestCartState = {
            items: [newTestItem],
            totalQuantity: 2,
            changed: false,
        };

		const action = cartActions.removeItemFromCart(newTestItem.id);
		const result = cartReducer(newTestCartState, action);

		expect(result.items.length).toEqual(testCartState.items.length);
        expect(result.items[0].quantity).toEqual(newTestItem.quantity - 1);
        expect(result.items[0].totalPrice).toEqual(newTestItem.totalPrice - newTestItem.price);
	});
});
