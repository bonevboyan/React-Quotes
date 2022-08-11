import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock"

fetchMock.enableMocks();

fetchMock.mockIf(/^https?:\/\/react-http-demo-ad927-default-rtdb.europe-west1.firebasedatabase.app*$/, async (req) => {
    console.log("123 TESTSTTSTSTSTS")
    if (req.url.endsWith("/cart.json")) {
        return {
            body: JSON.stringify({
                items: [
                    {
                        id: "0",
                        name: "Test",
                        price: 10,
                        quantity: 1,
                        totalPrice: 10,
                    },
                ],
                totalQuantity: 1,
            }),
        };
    } else if (req.url.endsWith("/products.json")) {
        return {
            body: JSON.stringify({
                products: [{
                    description: "test description",
                    id: "0",
                    price: 10,
                    title: "Book"
                }]
            })
        };
    } else {
        return {
            status: 404,
            body: "Not Found",
        };
    }
});