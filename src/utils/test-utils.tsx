import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import type { AppStore, RootState } from "../store/index";
import setupStore from "../store/index";

import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import AuthContext, { AuthContextProvider } from "../store/auth-context";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: PreloadedState<RootState>;
	store?: AppStore;
}

export function renderWithProviders(
	ui: React.ReactElement,
	{
		preloadedState = {},
		store = setupStore(preloadedState),
		...renderOptions
	}: ExtendedRenderOptions = {}
) {
	function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
		return (
			<Provider store={store}>
				<AuthContextProvider>{children}</AuthContextProvider>
			</Provider>
		);
	}

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderAsLoggedIn(
	ui: React.ReactElement,
	{
		preloadedState = {},
		store = setupStore(preloadedState),
		...renderOptions
	}: ExtendedRenderOptions = {}
) {
	function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
		return (
			<Provider store={store}>
				<AuthContext.Provider
					value={{
						isLoggedIn: true,
						onLogin(name: string, password: string) {
							return false;
						},
						onLogout() {},
					}}
				>
					{children}
				</AuthContext.Provider>
			</Provider>
		);
	}

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderWithRouter(ui: React.ReactElement) {
	const history = createMemoryHistory({ initialEntries: ["/products"] });
	return renderWithProviders(
		<Router location={history.location} navigator={history}>
			{ui}
		</Router>
	);
}
