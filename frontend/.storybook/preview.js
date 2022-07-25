import React from "react";
import { Global, ThemeProvider } from "@emotion/react";
import reset from "../src/styles/reset";

import theme from "../src/styles/theme";

export const decorators = [
  (Story) => (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={reset} />
        <Story />
      </ThemeProvider>
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
