import React from "react";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "./utils/test-utils";
import fetch from "jest-fetch-mock";

import App from "./App";
import { cartActions } from "./store/cart-slice";
import { productActions } from "./store/product-slice";

describe("app", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});
	it("should call fetch correct number of times", async () => {
		renderWithRouter(<App />);

		expect(fetch).toBeCalledTimes(2);
		expect(fetch).toHaveBeenCalledWith(
			process.env.REACT_APP_FIREBASE_DEMO_URL + "cart.json"
		);
		expect(fetch).toHaveBeenCalledWith(
			process.env.REACT_APP_FIREBASE_DEMO_URL + "products.json"
		);
	});
	it("should render correct cart data", async () => {
		fetch.mockResponseOnce(
			JSON.stringify({
				items: [
					{
						id: "0",
						name: "Test",
						price: 10,
						quantity: 1,
						totalPrice: 10,
					},
				],
				totalQuantity: 1,
			})
		);

		const { store } = renderWithRouter(<App />);

		const element = await screen.findByText("My Cart");
		expect(element.nextSibling?.textContent).toContain("1");
		expect(store.getState().cart.totalQuantity).toEqual(1);
	});
	it("should render correct products data", async () => {
		fetch.mockResponse(
			JSON.stringify({
				products: [
					{
						description: "test description",
						id: "0",
						price: 10,
						title: "Book",
					},
				],
			})
		);

		const { store } = renderWithRouter(<App />);

		const element = await screen.findByText("Book");
		expect(element).toBeInTheDocument();
		expect(store.getState().products.products.length).toEqual(1);
	});
	it("should send new cart data on change", async () => {
		fetch.mockResponseOnce(
			JSON.stringify({
				items: [
					{
						id: "0",
						name: "Test",
						price: 10,
						quantity: 1,
						totalPrice: 10,
					},
				],
				totalQuantity: 1,
			})
		);

		const { store } = renderWithRouter(<App />);

		const element = await screen.findByText("My Cart");

		fetch.mockOnce();
		store.dispatch(cartActions.removeItemFromCart("0"));
		expect(element.nextSibling?.textContent).toContain("0");
		expect(store.getState().cart.totalQuantity).toEqual(0);

		await screen.findByText("My Cart");
		expect(fetch).toHaveBeenCalledTimes(3);
	});
	it("should send new product data on change", async () => {
		fetch.mockResponse(
			JSON.stringify({
				products: [
					{
						description: "test description",
						id: "0",
						price: 10,
						title: "Book",
					},
				],
			})
		);

		const { store } = renderWithRouter(<App />);

		const element = await screen.findByText("Book");

		fetch.mockOnce();

		store.dispatch(
			productActions.addProduct({
				description: "test description",
				price: 10,
				title: "Book 2",
			})
		);

		await screen.findByText("Book 2");

		expect(store.getState().products.products.length).toEqual(2);
		expect(fetch).toHaveBeenCalledTimes(3);
	});
});
