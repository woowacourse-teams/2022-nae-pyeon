import React from "react";
import { Global, ThemeProvider } from "@emotion/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { UserProvider } from "../src/context/UserContext";

import reset from "../src/styles/reset";
import theme from "../src/styles/theme";

const queryClient = new QueryClient();

export const decorators = [
  (Story) => (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Global styles={reset} />
          <UserProvider>
            <Story />
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
