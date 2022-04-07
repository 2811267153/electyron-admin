import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from "@/views/layout";


import manage from "@/views/layout/manage/manage";
import myManage from "@/views/layout/manage/my-manage";
import organizationManage from "@/views/layout/manage/organization-manage";
import recordMange from "@/views/layout/manage/record-mange";
import roleManage from "@/views/layout/manage/role-manage";
import serveManage from "@/views/layout/manage/searce-manage";
import serveStauts from "@/views/layout/manage/serveStauts";
import dictionaryManage from "@/views/layout/manage/dictionary-manage";
import dataManage from "@/views/layout/manage/dataManage";

import configure from "@/views/configure/configure";
import phoneConfig from "@/views/configure/conmonters/phoneConfig";
import observeOnDispatcher from "@/views/configure/conmonters/observeOnDispatcher";
import cameraView from "@/views/configure/conmonters/cameraView";
import terminal from "@/views/configure/conmonters/terminal";
import networkManagement from "@/views/billing/networkManagement";
import trunkGroup from "@/views/billing/trunkGroup";
import dialPlan from "@/views/billing/dialPlan";
import rate from "@/views/billing/rate";
import call from "@/views/call/call";
import converse from "@/views/converse/converse";
import ivr from "@/views/call/ivr";
import did from "@/views/call/did";
import calls from "@/views/call/calls";
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: 'layout',
    },
    ///----------系统配置-----------
    {

        path: '/layout',
        name: 'layout',
        component: layout,
        redirect: {
            path: '/layout/serveStarts'
        },
        meta: {title: '系统配置'},
        children: [
            {meta: {title: '服务器状态'}, path: '/layout/serveStarts', component: serveStauts, name: 'serveManage'},
            {meta: {title: '字典管理'}, path: '/layout/dicManage', component: dictionaryManage, name: 'dicManage', children: [ {meta: {title: '数据值'}, path: '/layout/dataManage', component: dataManage, name: 'dataManage'},]},
            {meta: {title: '用户管理'}, path: '/layout/myManage', component: myManage, name: 'myManage'},
            {meta: {title: '角色管理'}, path: '/layout/roleManage', component: roleManage, name: 'roleManage'},
            {meta: {title: '组织管理'}, path: '/layout/organizationManage',component: organizationManage, name: 'organizationManage'},
            {meta: {title: '日志'}, path: '/layout/recordMange', component: recordMange, name: 'recordMange'},
        ]
    },
    {
        path: '/converse',
        name: 'configure',
        component: configure,
        meta: {title: '设备管理'},
        redirect: {
            path: '/converse/phoneConfig'
        },
        children: [
            {meta: {title: '话机管理'}, path: '/configure/phoneConfig', name: 'phoneConfig', component: phoneConfig},
            {meta: {title: '调度台'}, path: '/configure/observeOnDispatcher', name: 'observeOnDispatcher', component: observeOnDispatcher},
            {meta: {title: '摄像头'}, path: '/configure/cameraView', name: 'cameraView', component: cameraView},
            {meta: {title: '会议终端'}, path: '/configure/terminal', name: 'terminal', component: terminal},
        ]
    },
    {
        path: '/billing',
        name: 'billing',
        component: configure,
        meta: {title: '落地管理'},
        redirect: {
            path: '/billing/networkManagement'
        },
        children: [
            {meta: {title: '网管管理'}, path: '/billing/networkManagement', name: 'networkManagement', component: networkManagement},
            {meta: {title: '中继组'}, path: '/billing/trunkGroup', name: 'trunkGroup', component: trunkGroup},
            {meta: {title: '拨号方案'}, path: '/billing/dialPlan', name: 'dialPlan', component: dialPlan},
            {meta: {title: '费率组'}, path: '/billing/rate', name: 'rate', component: rate},
        ]
    },
    {
        path: "/call",
        component: call,
        meta: {title: '呼叫管理'},
        redirect: {
            path: '/call/ivr'
        },
        children: [
            {meta: {title: 'IVR管理'}, path: '/call/ivr', name: 'ivr', component: ivr},
            {meta: {title: 'DID管理'}, path: '/call/did', name: 'did', component: did},
            {meta: {title: '呼叫转移'}, path: '/call/calls', name: 'calls', component: calls},
        ]
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
