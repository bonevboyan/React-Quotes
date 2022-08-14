import { uiActions } from "./ui-slice";
import { productActions, ProductsState } from "./product-slice";
import { AppDispatch } from ".";

export const fetchProductsData = () => {
	return async (dispatch: AppDispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				process.env.REACT_APP_FIREBASE_DEMO_URL + "products.json"
			);

			if (!response.ok) {
				throw new Error("Could not fetch products data!");
			}

			const data = await response.json();

			return data;
		};

		try {
			const cartData = await fetchData();
			dispatch(productActions.replaceProducts(cartData.products));
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Fetching product data failed!",
				})
			);
		}
	};
};

export const sendProductData = (products: ProductsState) => {
	return async (dispatch: AppDispatch) => {
		dispatch(
			uiActions.showNotification({
				status: "pending",
				title: "Sending...",
				message: "Sending cart data!",
			})
		);

		const sendRequest = async () => {
			const response = await fetch(
				process.env.REACT_APP_FIREBASE_DEMO_URL + "products.json",
				{
					method: "PUT",
					body: JSON.stringify({
						products: products.products,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Sending product data failed.");
			}
		};

		try {
			await sendRequest();

			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Success!",
					message: "Sent product data successfully!",
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Sending product data failed!",
				})
			);
		}
	};
};
