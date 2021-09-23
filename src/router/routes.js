import { createRouter, createWebHistory } from "vue-router";
import Main from "../Pages/Main";
import Blog from "../Pages/Blog";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/blog",
    name: Blog,
    component: Blog,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
