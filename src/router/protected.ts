import { MainLayout } from "@/components/Layout";

const DashboardView = () => import("@/features/misc/routes/DashboardView.vue");
const UsersView = () => import("@/features/users/routes/UsersView.vue");
const ProfileView = () => import("@/features/users/routes/ProfileView.vue");
const DiscussionsView = () =>
  import("@/features/discussions/routes/DiscussionsView.vue");
const DiscussionView = () =>
  import("@/features/discussions/routes/DiscussionView.vue");

export const protectedPaths = [
  {
    path: "",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "users",
    name: "users",
    component: UsersView,
  },
  {
    path: "discussions",
    name: "discussions",
    component: DiscussionsView,
  },
  {
    path: "discussions/:id",
    name: "discussion",
    component: DiscussionView,
  },
  {
    path: "profile",
    name: "profile",
    component: ProfileView,
  },
];

export const protectedRoutes = [
  {
    path: "/app",
    component: MainLayout,
    children: protectedPaths,
  },
];
