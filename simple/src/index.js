import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";

import App from "./App";
import "./index.css";

const savedState = JSON.parse(localStorage.getItem("savedState") || "{}");

ReactDOM.render(
  <Provider store={configureStore(savedState)}>
    <App />
  </Provider>,
  document.getElementById("root")
);
