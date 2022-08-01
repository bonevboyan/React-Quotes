import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import setupStore from "./store/index";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

const rootEl = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootEl);
root.render(
	<BrowserRouter>
		<Provider store={setupStore()}>
			<App />
		</Provider>
	</BrowserRouter>
);
