import { createRouter, createWebHistory } from "vue-router";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

const routes = [...protectedRoutes, ...publicRoutes];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
