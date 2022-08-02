import React from "react";
import { renderWithRouter } from "../../utils/test-utils";
import { screen } from "@testing-library/react";

import CartButton from "./CartButton";

import { cartActions } from "../../store/cart-slice";

describe("cart button", () => {
	it("renders 0 items with an empty cart", () => {
		renderWithRouter(<CartButton />);

		const link = screen.getByRole("link");

		expect(link).toHaveTextContent("0");
		expect(link).toHaveTextContent("My Cart");
	});
	it("renders correct number of items", () => {
		const { store } = renderWithRouter(<CartButton />);

		const link = screen.getByRole("link");

		store.dispatch(
			cartActions.replaceCart({
				totalQuantity: 2,
				items: [
					{
						id: "1",
						price: 123,
						quantity: 2,
						totalPrice: 123,
						name: "string",
					},
				],
			})
		);

		expect(link).toHaveTextContent("2");
		expect(link).not.toHaveTextContent("0");

		store.dispatch(cartActions.removeItemFromCart("1"));

		expect(link).toHaveTextContent("1");
	});
});
