import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/views/login";
import index from "@/views/index";
import cache from "@/util/cache";
import { setupStore } from "@/store";
import menu from "@/views/layout/manage/menu";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    component: login
  },
  {
    path: "/home",
    component: index,
    children: [
      {
        path: '/home/layout/menu',
        component: menu
      }
    ]
  }

];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    const token = cache.getCache("token");
    setupStore();
    if (!token) {
      next("/");
    }
    next();
  }
  next();
});

export default router;
