import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { SnackbarProvider } from "@/context/SnackbarContext";
import App from "./App";

/* eslint-disable */

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");

  worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
