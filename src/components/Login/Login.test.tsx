import React from "react";
import { screen, fireEvent } from "@testing-library/react";

import { renderWithRouter, renderWithProviders } from "../../utils/test-utils";
import Login from "./Login";

import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

describe("login component", () => {
	it("disables add button", () => {
		renderWithRouter(<Login />);

		expect(screen.getByRole("button")).toBeDisabled();
	});
	it("clears input fields", () => {
		const { store } = renderWithRouter(<Login />);
		const inputs = screen.getAllByRole("textbox");

		inputs.forEach((field) => {
			fireEvent.change(field, {
				target: { value: "testing" },
			});
		});

		fireEvent.click(screen.getByRole("button"));
		expect(store.getState().ui.isShown).toEqual(true);

		expect(inputs.every((field) => field.textContent === "")).toBeTruthy();
	});
	it("shows error messages", () => {
		const { container } = renderWithRouter(<Login />);
		const inputs = screen.getAllByRole("textbox");

		inputs.forEach((field) => {
			field.focus();
			fireEvent.change(field, {
				target: { value: "1" },
			});
			field.blur();
		});

		expect(container.querySelectorAll("p").length).toEqual(2);
	});
	it("redirects on correct login", () => {
		const history = createMemoryHistory({ initialEntries: ["/login"] });
		const { store } = renderWithProviders(
			<Router location={history.location} navigator={history}>
				<Login />
			</Router>
		);
		const inputs = screen.getAllByRole("textbox");

		inputs.forEach((field) => {
			field.focus();
			fireEvent.change(field, {
				target: { value: "admin" },
			});
			field.blur();
		});

		fireEvent.click(screen.getByRole("button"));

		expect(history.location.pathname).toEqual("/products");
		expect(store.getState().ui.isShown).toEqual(true);
	});
});
