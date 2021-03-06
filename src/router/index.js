import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/views/login";
import index from "@/views/index";
import cache from "@/util/cache";
import serveStaut from "@/views/home/serveStaut";
import menu from "@/views/layout/menu";
import recordMange from "@/views/layout/record-mange";
import myManage from "@/views/layout/my-manage";
import organizationManage from "@/views/layout/organization-manage";
import dataManage from "@/views/layout/dataManage";
import dictionaryManage from "@/views/layout/dictionary-manage";
import roleManage from "@/views/layout/role-manage";
import phoneConfig from "@/views/configure/phoneConfig";
import observeOnDispatcher from "@/views/configure/observeOnDispatcher";
import cameraView from "@/views/configure/cameraView";
import terminal from "@/views/configure/terminal";
import queue from "@/views/configure/queue";
import networkManagement from "@/views/billing/networkManagement";
import trunkGroup from "@/views/billing/trunkGroup";
import dialPlan from "@/views/billing/dialPlan";
import configure from "@/views/billing/configure";
import rate from "@/views/billing/rate";
import ivr from "@/views/call/ivr";
import calls from "@/views/call/calls";
import hisBill from "@/views/converse/hisBill";
import meetingMinutes from "@/views/call/meetingMinutes";
import intercept from "@/views/converse/intercept";
import rateList from "@/views/billing/rateList";
import account from "@/views/user/account";
import callRouting from "@/views/call/callRouting";
import systemParameters from "@/views/layout/systemParameters";
import { setupStore } from "@/store";
import file from "@/views/call/file";
import callGrouping from "@/views/call/callGrouping";
import callMeeting from "@/views/call/callMeeting";
import rollCall from "@/views/call/rollCall";

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
    redirect: "/home/layout/serveStarts",
    children: [
      {
        path: "/home/layout/serveStarts",
        component: serveStaut,
        meta: { icon: "" }
      }, {
        path: "/home/layout/menu",
        component: menu,
        meta: { icon: "" }
      },
      {
        path: "/home/layout/recordMange",
        component: recordMange,
        meta: { icon: "" }
      },
      {
        path: "/home/layout/myManage",
        component: myManage,
        meta: { icon: "" }
      },
      {
        path: "/home/layout/organizationManage",
        component: organizationManage,
        meta: { icon: "" }
      },
      {
        path: "/home/layout/dataManage",
        component: dataManage,
        meta: { icon: "" }
      },
      {
        path: "/home/layout/dicManage",
        component: dictionaryManage,
        meta: { icon: "" }
      },
      {
        path: "/home/layout/roleManage",
        component: roleManage,
        meta: { icon: "" }
      },
      {
        path: "/home/configure/phoneConfig",
        component: phoneConfig,
        meta: { icon: "" }
      },
      {
        path: "/home/configure/observeOnDispatcher",
        component: observeOnDispatcher,
        meta: { icon: "" }
      },
      {
        path: "/home/configure/cameraView",
        component: cameraView,
        meta: { icon: "" }
      },
      {
        path: "/home/configure/terminal",
        component: terminal,
        meta: { icon: "" }
      },
      {
        path: "/home/configure/queue",
        component: queue,
        meta: { icon: "" }
      },
      {
        path: "/home/billing/networkManagement",
        component: networkManagement,
        meta: { icon: "" }
      },
      {
        path: "/home/billing/trunkGroup",
        component: trunkGroup,
        meta: { icon: "" }
      },
      {
        path: "/home/billing/dialPlan",
        component: dialPlan,
        meta: { icon: "" }
      },
      {
        path: "/home/billing/configure",
        component: configure,
        meta: { icon: "" }
      },
      {
        path: "/home/billing/rate",
        component: rate,
        meta: { icon: "" }
      },
      {
        path: "/home/call/ivr",
        component: ivr,
        meta: { icon: "" }
      },
      {
        path: "/home/call/calls",
        component: calls,
        meta: { icon: "" }
      },
      {
        path: "/home/bill/hisBill",
        component: hisBill,
        meta: { icon: "" }
      },
      {
        path: "/home/call/meetingMinutes",
        component: meetingMinutes,
        meta: { icon: "" }
      },
      {
        path: "/home/bill/intercept",
        component: intercept,
        meta: { icon: "" }
      },
      {
        path: "/home/billing/rate/list",
        component: rateList,
        meta: { icon: "" }
      },
      {
        path: "/home/account",
        component: account,
        meta: { icon: "" }
      },
      {
        path: "/home/call/callRouting",
        component: callRouting,
        meta: { icon: "" }
      },
      {
        path: "/home/layout/systemParameters",
        component: systemParameters,
        meta: { icon: "" }
      },
      {
        path: "/home/call/file",
        component: file,
        meta: { icon: "" }
      },
      {
        path: "/home/call/callGrouping",
        component: callGrouping,
        meta: { icon: "" }
      },
      {
        path: "/home/call/callMeeting",
        component: callMeeting,
        meta: { icon: "" }
      },
      {
        path: "/home/call/callRoll",
        component: rollCall,
        meta: { icon: "" }
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
    if (!token) {
      next("/login");
    }
    next();
    setupStore();
  }
  next();
});

export default router;
