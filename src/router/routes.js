import { createRouter, createWebHistory } from "vue-router";
import Main from "../Pages/Main";
import Blog from "../Pages/Blog";
import About from "../Pages/About";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
