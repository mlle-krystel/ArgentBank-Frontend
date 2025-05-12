import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/css/main.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "../src/store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
