import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import { createPinia } from 'pinia';
import { createMemoryHistory, createRouter } from 'vue-router';
import { initialize, mswLoader } from 'msw-storybook-addon';

// Import Tailwind CSS
import '../apps/vue-vite/src/index.css';

// Initialize MSW
initialize();

// Setup Vue plugins
setup((app) => {
  // Setup Pinia
  const pinia = createPinia();
  app.use(pinia);

  // Setup Vue Router with a mock router
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        component: { template: '<div>Mock Route</div>' },
      },
    ],
  });
  app.use(router);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
