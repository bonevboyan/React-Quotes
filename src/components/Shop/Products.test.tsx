import React from "react";
import { renderWithProviders } from "../../utils/test-utils";
import Products from "./Products";
import { productActions } from "../../store/product-slice";

describe("products", () => {
	it("should rerender when product is added", () => {
		const item = {
			title: "test title",
			price: 1,
			description: "test description",
		};

		const {store, container} = renderWithProviders(<Products />);
		expect(container.querySelectorAll("li").length).toEqual(0);

		store.dispatch(productActions.addProduct(item))
		expect(container.querySelectorAll("li").length).toEqual(1);
	});
});
