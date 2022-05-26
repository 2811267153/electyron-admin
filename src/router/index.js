import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/views/login";
import index from "@/views/index";
import cache from "@/util/cache";
import { setupStore } from "@/store";

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
    redirect: "/home/layout/serveStarts"
    // children: [
    //   {
    //     path: "/home/layout/serveStarts",
    //     component: serveStart,
    //     meta: { icon: "" }
    //   }, {
    //     path: "/home/layout/menu",
    //     component: menu,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/layout/recordMange",
    //     component: recordMange,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/layout/myManage",
    //     component: myManage,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/layout/organizationManage",
    //     component: organizationManage,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/layout/dataManage",
    //     component: dataManage,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/layout/dicManage",
    //     component: dictionaryManage,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/layout/roleManage",
    //     component: roleManage,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/configure/phoneConfig",
    //     component: phoneConfig,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/configure/observeOnDispatcher",
    //     component: observeOnDispatcher,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/configure/cameraView",
    //     component: cameraView,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/configure/terminal",
    //     component: terminal,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/configure/queue",
    //     component: queue,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/billing/networkManagement",
    //     component: networkManagement,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/billing/trunkGroup",
    //     component: trunkGroup,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/billing/dialPlan",
    //     component: dialPlan,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/billing/configure",
    //     component: configure,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/billing/rate",
    //     component: rate,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/call/ivr",
    //     component: ivr,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/call/calls",
    //     component: calls,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/bill/hisBill",
    //     component: hisBill,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/call/meetingMinutes",
    //     component: meetingMinutes,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/bill/intercept",
    //     component: intercept,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/billing/rate/list",
    //     component: rateList,
    //     meta: { icon: "" }
    //   },
    //   {
    //     path: "/home/account",
    //     component: account,
    //     meta: { icon: "" }
    //   }
    // ]
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
      next("/login");
    }
    next();
    setupStore();
  }
  next();
});

export default router;
