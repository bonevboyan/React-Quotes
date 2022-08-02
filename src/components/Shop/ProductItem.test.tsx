import React from "react";

import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { cartActions } from "../../store/cart-slice";
import ProductItem from "./ProductItem";

describe("product item", () => {
	it("should render all data correcly", () => {
		const item = {
			id: "1",
			title: "test title",
			price: 1,
			description: "test description",
		};

		renderWithProviders(
			<ProductItem
				key={item.id}
				id={item.id}
				title={item.title}
				price={item.price}
				description={item.description}
			/>
		);

		expect(screen.getByText(item.title)).toBeInTheDocument();
		expect(screen.getByText(`$${item.price.toFixed(2)}`)).toBeInTheDocument();
		expect(screen.getByText(item.description)).toBeInTheDocument();
	});
	it("should add product to cart on button click", () => {
		const item = {
			id: "1",
			title: "test title",
			price: 1,
			description: "test description",
		};

		const { store } = renderWithProviders(
			<ProductItem
				key={item.id}
				id={item.id}
				title={item.title}
				price={item.price}
				description={item.description}
			/>
		);

        const button = screen.getByRole("button");
        fireEvent.click(button);

		expect(store.getState().cart.totalQuantity).toEqual(1);
	});
});
