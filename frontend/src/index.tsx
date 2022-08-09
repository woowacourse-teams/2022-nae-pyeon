import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { SnackbarProvider } from "@/context/SnackbarContext";
import App from "./App";

import { Global, ThemeProvider } from "@emotion/react";
import reset from "@/styles/reset";
import font from "@/styles/font";
import theme from "@/styles/theme";

import { queryClient } from "@/api";

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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Global styles={reset} />
          <Global styles={font} />
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
