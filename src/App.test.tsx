import React from "react";

import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithRouter } from "./utils/test-utils";

import App from "./App";

describe("app", () => {
	let originFetch: any;
	beforeEach(() => {
		originFetch = (global as any).fetch;
	});
	afterEach(() => {
		(global as any).fetch = originFetch;
	});
	it("should pass", async () => {
		const fakeResponse = { totalQuantity: 2, items: [] };
		const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
		const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
		(global as any).fetch = mockedFetch;
		
		const { store } = renderWithRouter(<App />);

		await waitFor(() => expect(store.getState().cart.totalQuantity).toEqual(2));
		expect(mockedFetch).toBeCalledTimes(2);
	});
});
