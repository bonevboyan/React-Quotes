import React from 'react';

import { screen } from "@testing-library/react";

import { renderWithProviders } from '../../utils/test-utils'
import AddProduct from "./AddProduct";

describe("addProduct component", () => {
	it("should render correctly", () => {
		renderWithProviders(<AddProduct />);

		expect(screen.getByText("Title")).toBeInTheDocument();
	});
	it("disables add button", () => {
		renderWithProviders(<AddProduct />);

		expect(screen.getByText("Add")).toBeDisabled();
	});
});
