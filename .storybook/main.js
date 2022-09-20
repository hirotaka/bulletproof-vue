const path = require("path");
const { loadConfigFromFile, mergeConfig } = require("vite");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  framework: "@storybook/vue3",
  core: {
    builder: "@storybook/builder-vite",
  },
  typescript: {
    reactDocgen: "react-docgen",
  },
  async viteFinal(config, { configType }) {
    config.plugins = [
      ...config.plugins.filter((p) => !Array.isArray(p)),
      require("@vitejs/plugin-vue-jsx")({
        exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
      }),
    ];
    const { config: userConfig } = await loadConfigFromFile(
      path.resolve(__dirname, "../vite.config.ts")
    );

    return mergeConfig(config, {
      ...userConfig,
      plugins: [],
    });
  },
};
