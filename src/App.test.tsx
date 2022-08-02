import React from "react";

import { fireEvent, screen } from "@testing-library/react";
import { renderWithRouter } from "./utils/test-utils";

import App from "./App";

describe("app", () => {
    beforeEach(() => {
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
		};
        jest.clearAllMocks();
        global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(testCartState),
			})
		) as jest.Mock;
      });
	it("should render cart data", () => {
		const { store } = renderWithRouter(<App />);

        expect(store.getState().cart.totalQuantity).toEqual(1);
	});
});
