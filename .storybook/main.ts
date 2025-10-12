import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const config: StorybookConfig = {
  stories: [
    '../apps/vue-vite/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  staticDirs: ['./public'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
  },
  async viteFinal(config) {
    const tailwindConfigPath = path.resolve(__dirname, '../apps/vue-vite/tailwind.config.cjs');

    return mergeConfig(config, {
      plugins: [vue()],
      css: {
        postcss: {
          plugins: [
            tailwindcss(tailwindConfigPath),
            autoprefixer(),
          ],
        },
      },
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('../apps/vue-vite/src', import.meta.url)),
        },
      },
    });
  },
};

export default config;
