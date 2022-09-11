const LandingView = () => import("@/features/misc/routes/LandingView.vue");
const LoginView = () => import("@/features/auth/routes/LoginView.vue");
const RegisterView = () => import("@/features/auth/routes/RegisterView.vue");

export const publicRoutes = [
  {
    path: "/",
    name: "landing",
    component: LandingView,
  },
  {
    path: "/auth/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/auth/register",
    name: "register",
    component: RegisterView,
  },
];
