const { resolve } = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    const alias = {
      "@": resolve(__dirname, "../src"),
      "@components": resolve(__dirname, "../src/components"),
    };
    config.resolve.alias = Object.assign(config.resolve.alias, alias);
    return config;
  },
};
