import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  // Nuxt 4 compatibility
  future: {
    compatibilityVersion: 4,
  },
  // Layers configuration
  extends: [
    "./layers/base",
    "./layers/auth",
    "./layers/discussions",
    "./layers/comments",
    "./layers/users",
    "./layers/teams",
  ],
  modules: [
    "@pinia/nuxt",
    "nuxt-auth-utils",
    "@nuxt/eslint",
    "@nuxt/test-utils/module",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['./app/assets/css/main.css'],
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  // Nuxt 4 experimental features
  experimental: {
    sharedPrerenderData: true,
  },
});
