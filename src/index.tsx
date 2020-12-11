import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HistoryRouter } from "./mini-router/index";

ReactDOM.render(
  <HistoryRouter>
    <App />
  </HistoryRouter>,
  document.getElementById("root")
);
