import { VueQueryPlugin } from '@tanstack/vue-query';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { createHead } from '@unhead/vue/client';
import type { App } from 'vue';
import { queryClient } from '@/lib/vue-query';

export function setupProviders(app: App) {
  // Setup Vue Query
  app.use(VueQueryPlugin, {
    queryClient,
  });

  // Setup Unhead for SEO
  const head = createHead();
  app.use(head);

  // Setup Vue Query Devtools (only in development)
  if (import.meta.env.DEV) {
    app.component('VueQueryDevtools', VueQueryDevtools);
  }
}
