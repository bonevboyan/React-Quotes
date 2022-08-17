import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import setupStore from "./store/index";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";

const rootEl = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootEl);
root.render(
	<BrowserRouter>
		<Provider store={setupStore()}>
			<AuthContextProvider>
				<App />
			</AuthContextProvider>
		</Provider>
	</BrowserRouter>
);
