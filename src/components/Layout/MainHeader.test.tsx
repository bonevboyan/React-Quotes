import React from "react";
import { renderWithProviders, renderWithRouter } from "../../utils/test-utils";
import { screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";

import { createMemoryHistory } from "history";

import MainHeader from "./MainHeader";

describe("main header", () => {
	it("should render links", () => {
		renderWithRouter(<MainHeader />);

		expect(screen.getAllByRole("link").length).not.toEqual(0);
	});
	it("should redirect to products", () => {
		const history = createMemoryHistory({ initialEntries: ["/products"] });
		renderWithProviders(
			<Router location={history.location} navigator={history}>
				<MainHeader />
			</Router>
		);

		const links = screen.getAllByRole("link");

		fireEvent.click(links[0]);
		expect(history.location.pathname).toBe("/products");
		fireEvent.click(links[1]);
		expect(history.location.pathname).toBe("/products");
		fireEvent.click(links[2]);
		expect(history.location.pathname).toBe("/addProduct");
		fireEvent.click(links[3]);
		expect(history.location.pathname).toBe("/cart");
	});
});
