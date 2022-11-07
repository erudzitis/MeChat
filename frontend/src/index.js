// Requirements
import React from "react";
import ReactDOM from "react-dom/client";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import PrimeReact from "primereact/api";

// Components
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({ reducer: rootReducer, middleware: [thunk] });

// Adding ripple effect to respective ui components
PrimeReact.ripple = true;

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

