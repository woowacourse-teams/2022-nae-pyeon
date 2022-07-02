import React from "react";
import { Global } from "@emotion/react";
import reset from "../src/styles/reset";

export const decorators = [
  (Story) => (
    <>
      <Global styles={reset} />
      <Story />
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
