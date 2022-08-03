import React from "react";

import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import CartItem from "./CartItem";

describe("cart item", () => {
    it("should render correcly with provided props", () => {
        const item = {
            name: "test name",
            quantity: 10,
            totalPrice: 120,
            price: 12,
            id: "1",
        }

        renderWithProviders(<CartItem item={item}/>);

        expect(screen.getByText(item.name)).toBeInTheDocument();
        expect(screen.getByText(`($${(item.price)}.00/item)`)).toBeInTheDocument();
        expect(screen.getByText(`$${(item.totalPrice)}`)).toBeInTheDocument();
        expect(screen.getByText(item.quantity)).toBeInTheDocument();
    });
    it("should change quantity when item is added or removed", () => {
        const item = {
            name: "test name",
            quantity: 10,
            totalPrice: 120,
            price: 12,
            id: "1",
        }
        
        const {store} = renderWithProviders(<CartItem item={item}/>);

        const button = screen.getAllByRole("button");
        fireEvent.click(button[1]);
        expect(store.getState().cart.items.length).toEqual(1);

        fireEvent.click(button[0]);
        expect(store.getState().cart.items.length).toEqual(0);
    });
})