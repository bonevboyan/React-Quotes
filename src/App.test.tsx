import React from "react";

import {
	findByAltText,
	fireEvent,
	screen,
	waitFor,
} from "@testing-library/react";
import { renderWithRouter } from "./utils/test-utils";
import fetch from "jest-fetch-mock";

import App from "./App";
import { cartActions } from "./store/cart-slice";

describe("app", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});
	it("should call fetch correct number of times", async () => {
		renderWithRouter(<App />);

		expect(fetch).toBeCalledTimes(2);
		expect(fetch).toHaveBeenCalledWith(
			"https://react-http-demo-ad927-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
		);
		expect(fetch).toHaveBeenCalledWith(
			"https://react-http-demo-ad927-default-rtdb.europe-west1.firebasedatabase.app/products.json"
		);
	});
	it("should render cart total quantity with correct data", async () => {
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
	it("should render cart total quantity with correct data", async () => {
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

		store.dispatch(cartActions.removeItemFromCart("0"));
		expect(element.nextSibling?.textContent).toContain("0");
		expect(store.getState().cart.totalQuantity).toEqual(0);
		expect
	});
});
