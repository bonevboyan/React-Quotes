import React, { useContext } from "react";
import { renderWithProviders, renderWithRouter, renderAsLoggedIn } from "../../utils/test-utils";
import { screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";

import { createMemoryHistory } from "history";

import MainHeader from "./MainHeader";
import AuthContext from "../../store/auth-context";



describe("main header", () => {
	it("should render links", () => {
		renderWithRouter(<MainHeader />);

		expect(screen.getAllByRole("link").length).not.toEqual(0);
	});
	it("should redirect to correct URLs when logged out", () => {
		const history = createMemoryHistory({ initialEntries: ["/products"] });
		const { store } = renderWithProviders(
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
		expect(history.location.pathname).toBe("/login");
		fireEvent.click(links[3]);
		expect(history.location.pathname).toBe("/cart");
	});
	it("should redirect to correct URLs when logged in", () => {
		const history = createMemoryHistory({ initialEntries: ["/products"] });
		const { store } = renderAsLoggedIn(
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
		expect(history.location.pathname).toBe("/logout");
		fireEvent.click(links[4]);
		expect(history.location.pathname).toBe("/cart");
	});
});
