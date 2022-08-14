import productSlice, { productActions } from "./product-slice";

const productReducer = productSlice.reducer;
const initialState = productReducer(undefined, { type: "" });

const testProductState = {
	products: [
		{ id: "1", price: 1, title: "test", description: "test description" },
	],
	changed: false,
};

describe("product slice", () => {
	it("should return the initial state", () => {
		expect(initialState).toEqual({
			products: [],
			changed: false,
		});
	});
	it("should replace cart with correct data", () => {
		const action = productActions.replaceProducts(testProductState.products);
		const result = productReducer(initialState, action);

		expect(result.products).toEqual(testProductState.products);
	});
	it("should add new product", () => {
		const newProduct = {
			id: "2",
			price: 2,
			title: "another test",
			description: "another test description",
		};

		const action = productActions.addProduct(newProduct);
		const result = productReducer(testProductState, action);

		expect(result.changed).toEqual(true);
		expect(result.products.length).toEqual(testProductState.products.length + 1);
	});
});
