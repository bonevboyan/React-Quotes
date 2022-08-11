import setupStore from "./";

import fetch from "jest-fetch-mock";
import { fetchProductsData, sendProductData } from "./product-actions";

describe("product actions", () => {
	it("should show notification on failure when fetching", async () => {
		fetch.mockReject(async () => "Failure");
		const store = setupStore({
			ui: {
				notification: undefined,
				isShown: false,
			},
		});

        const fetchFn = fetchProductsData();

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

        const fetchFn = sendProductData({products: [], changed: false});

        await fetchFn(store.dispatch);

		expect(store.getState().ui.notification?.status).toEqual("error");
		expect(store.getState().ui.isShown).toEqual(true);
	});
});
