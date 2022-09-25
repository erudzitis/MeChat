// Requirements
import React from "react";
import ReactDOM from "react-dom/client";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

// Components
import App from "./App";

// CSS
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({ reducer: rootReducer, middleware: [thunk] });

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

