import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/views/login";
import index from "@/views/index";
import cache from "@/util/cache";

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
    component: index
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
    if (!token) {
      next("/");
    }
    console.log(to.path);

    next();
  }
  next();
});

export default router;
