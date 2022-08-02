import React from "react";
import { renderWithProviders } from "../../utils/test-utils";
import { screen, fireEvent } from "@testing-library/react";

import Cart from "./Cart";

import { cartActions } from "../../store/cart-slice";

describe("cart", () => {
	it("should render correcly", () => {
		const { store } = renderWithProviders(<Cart />);

		store.dispatch(
			cartActions.replaceCart({ totalQuantity: 1, items: [{
                id: "1",
                price: 1,
                quantity: 1,
                totalPrice: 1,
                name: "test"
            }] })
		);

        expect(screen.getAllByRole("listitem").length).toEqual(1);
	});
	it("should update visible quantity", () => {
		const { store } = renderWithProviders(<Cart />);

		store.dispatch(
			cartActions.replaceCart({ totalQuantity: 1, items: [{
                id: "1",
                price: 1,
                quantity: 1,
                totalPrice: 1,
                name: "test"
            }] })
		);

        const button = screen.getAllByRole("button");
        fireEvent.click(button[1]);
        expect(screen.getByTestId("quantity").textContent).toEqual("2");

        fireEvent.click(button[0]);
        expect(screen.getByTestId("quantity").textContent).toEqual("1");
	});
});
