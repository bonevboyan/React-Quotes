import React from "react";
import { renderWithRouter } from "../../utils/test-utils";
import { screen } from "@testing-library/react";

import Layout from "./Layout";

describe("layout", () => {
	it("should render correctly", () => {
		const text = "test text";
		renderWithRouter(
			<Layout>
				<p>{text}</p>
			</Layout>
		);

		expect(screen.getByText("test text")).toBeInTheDocument();
	});
});
