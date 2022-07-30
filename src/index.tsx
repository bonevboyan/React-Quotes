import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store/index';
import './index.css';
import App from './App';

const rootEl = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootEl);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);