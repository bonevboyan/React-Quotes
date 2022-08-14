import React from "react";
import { renderWithProviders } from "../../utils/test-utils";

import Card from "./Card";

describe("main header", () => {
	it("should render correcly", () => {
		const text = "test";
		const { container } = renderWithProviders(
			<Card className={text}>
				<p>{text}</p>
			</Card>
		);

		const el = container.querySelector("section");

		expect(el?.firstChild).toHaveTextContent(text);
		expect(el?.classList.length).toEqual(2);
	});
	it("should render without a class when not provided", () => {
		const text = "test";
		const { container } = renderWithProviders(
			<Card>
				<p>{text}</p>
			</Card>
		);

		const el = container.querySelector("section");

		expect(el?.classList.length).toEqual(1);
	});
});
