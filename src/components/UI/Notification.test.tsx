import React from "react";
import { renderWithProviders } from "../../utils/test-utils";
import { fireEvent, screen } from "@testing-library/react";

import { uiActions } from "../../store/ui-slice";

import Notification from "./Notification";
import exp from "constants";

describe("notfication", () => {
	it.each`
		status
		${"error"}
		${"success"}
		${""}
	`("should add correct css class on error", ({ status }) => {
		const data = {
			status: status,
			message: "test message",
			title: "test title",
		};
		const { container } = renderWithProviders(
			<Notification
				status={data.status}
				message={data.message}
				title={data.title}
			/>
		);

		const el = container.querySelector("section");

		expect(el?.className).toEqual("notification " + status.toString());
	});
	it("should close on button click", () => {
		const data = {
			status: "success",
			message: "test message",
			title: "test title",
		};
		const { store } = renderWithProviders(
			<Notification
				status={data.status}
				message={data.message}
				title={data.title}
			/>
		);

        store.dispatch(uiActions.showNotification(data));

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(store.getState().ui.isShown).toBe(false);
	});
});
