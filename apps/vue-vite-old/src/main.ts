import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@vueuse/head";
import { VueQueryPlugin } from "@tanstack/vue-query";

import type { VueQueryPluginOptions } from "@tanstack/vue-query";

import App from "./App.vue";
import router from "./router";

import { initMocks } from "./test/server";

initMocks();

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

// VueQueryPlugin
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        useErrorBoundary: true,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  },
};

app.use(router);
app.use(pinia);
app.use(head);
app.use(VueQueryPlugin, vueQueryPluginOptions);

app.mount("#app");
