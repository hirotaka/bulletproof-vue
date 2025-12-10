import { fileURLToPath } from 'node:url'

// Base layer configuration
export default defineNuxtConfig({
  alias: {
    '~base': fileURLToPath(new URL('./', import.meta.url)),
  },
  components: [
    {
      path: './components/ui',
      prefix: 'U',
      pathPrefix: false,
    },
    {
      path: './components',
      pathPrefix: true,
    },
  ],
});
