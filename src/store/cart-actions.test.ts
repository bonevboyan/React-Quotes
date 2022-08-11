import setupStore from "./";

import fetch from "jest-fetch-mock";
import { fetchCartData, sendCartData } from "./cart-actions";

describe("cart actions", () => {
	it("should show notification on failure when fetching", async () => {
		fetch.mockReject(async () => "Failure");
		const store = setupStore({
			ui: {
				notification: undefined,
				isShown: false,
			},
		});

        const fetchFn = fetchCartData();

        await fetchFn(store.dispatch);

		expect(store.getState().ui.notification?.status).toEqual("error");
		expect(store.getState().ui.isShown).toEqual(true);
	});
	it("should show notification on failure when sending", async () => {
		fetch.mockReject(async () => "Failure");
		const store = setupStore({
			ui: {
				notification: undefined,
				isShown: false,
			},
		});

        const fetchFn = sendCartData({items: [], totalQuantity: 0, changed: false});

        await fetchFn(store.dispatch);

		expect(store.getState().ui.notification?.status).toEqual("error");
		expect(store.getState().ui.isShown).toEqual(true);
	});
});
