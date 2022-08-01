import cartSlice, { cartActions } from "./cart-slice";
import { fetchCartData, sendCartData } from "./cart-actions";
import { useSelector, useDispatch } from 'react-redux'; 

const cartReducer = cartSlice.reducer;
const initialState = cartReducer(undefined, { type: "" });

const testItem = {
	id: "1",
	price: 1,
	quantity: 1,
	totalPrice: 1,
	name: "test",
};

const testCartState = {
	items: [testItem],
	totalQuantity: 1
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(testCartState),
  }),
) as jest.Mock;

describe("cart actions", () => {
	it("should fetch correct data", async () => {

		const fetchData = fetchCartData();
		
		const dispatch = jest.fn();

		fetchData(dispatch);

		
	});
});
