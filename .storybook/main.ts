import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/docs/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    // "Accessibility" panel: checks every story with axe while you work.
    "@storybook/addon-a11y",
  ],
  framework: { name: "@storybook/react-vite", options: {} },
};
export default config;
