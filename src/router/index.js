import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

import headers from "@/components/header";

import layout from '@/views/layout'

import myManage from '@/views/layout/manage/my-manage'
import organizationManage from '@/views/layout/manage/organization-manage'
import recordMange from '@/views/layout/manage/record-mange'
import roleManage from '@/views/layout/manage/role-manage'
import serveManage from '@/views/layout/manage/searce-manage'
import serveStauts from '@/views/layout/manage/serveStauts'
import dictionaryManage from '@/views/layout/manage/dictionary-manage'
import dataManage from '@/views/layout/manage/dataManage'

import configure from '@/views/configure/configure'
import phoneConfig from '@/views/configure/conmonters/phoneConfig'
import observeOnDispatcher from '@/views/configure/conmonters/observeOnDispatcher'
import cameraView from '@/views/configure/conmonters/cameraView'
import terminal from '@/views/configure/conmonters/terminal'
import networkManagement from '@/views/billing/networkManagement'
import trunkGroup from '@/views/billing/trunkGroup'
import dialPlan from '@/views/billing/dialPlan'
import rate from '@/views/billing/rate'
import call from '@/views/call/call'
import converse from '@/views/converse/converse'
import ivr from '@/views/call/ivr'
import calls from '@/views/call/calls'


import hisBill from "@/views/converse/hisBill";
import intercept from "@/views/converse/intercept";

import user from "@/views/user/user";
import menu from "@/views/layout/manage/menu";
import jsCookie from "js-cookie";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    component: headers,
    redirect: 'layout',
    children: [
      {
        path: '/layout',
        name: 'layout',
        component: layout,
        redirect: {
          path: '/layout/serveStarts'
        },
        meta: { title: '系统配置' },
        children: [
          {
            meta: { title: '服务器状态' },
            path: '/layout/serveStarts',
            component: serveStauts,
            name: 'serveManage'
          },
          {
            meta: { title: '字典类型' },
            component: dataManage,
            path: '/layout/dataManage',
            name: 'dataManage',
            children: [
              {
                meta: { title: '字典管理' },
                component: dictionaryManage,
                path: '/layout/dicManage',
                name: 'dataManage'
              }
            ]
          },
          {
            meta: { title: '用户管理' },
            path: '/layout/myManage',
            component: myManage,
            name: 'myManage'
          },
          {
            meta: { title: '角色管理' },
            path: '/layout/roleManage',
            component: roleManage,
            name: 'roleManage'
          },
          {
            meta: { title: '组织管理' },
            path: '/layout/organizationManage',
            component: organizationManage,
            name: 'organizationManage'
          },
          {
            meta: { title: '菜单权限' },
            path: '/layout/menu',
            component: menu,
            name: 'menu'
          },
          {
            meta: { title: '日志' },
            path: '/layout/recordMange',
            component: recordMange,
            name: 'recordMange'
          }
        ]
      },
      {
        path: '/converse',
        name: 'configure',
        component: configure,
        meta: { title: '设备管理' },
        redirect: {
          path: '/converse/phoneConfig'
        },
        children: [
          {
            meta: { title: '话机管理' },
            path: '/configure/phoneConfig',
            name: 'phoneConfig',
            component: phoneConfig
          },
          {
            meta: { title: '调度台' },
            path: '/configure/observeOnDispatcher',
            name: 'observeOnDispatcher',
            component: observeOnDispatcher
          },
          {
            meta: { title: '摄像头' },
            path: '/configure/cameraView',
            name: 'cameraView',
            component: cameraView
          },
          {
            meta: { title: '会议终端' },
            path: '/configure/terminal',
            name: 'terminal',
            component: terminal
          }
        ]
      },
      {
        path: '/billing',
        name: 'billing',
        component: configure,
        meta: { title: '落地管理' },
        redirect: {
          path: '/billing/networkManagement'
        },
        children: [
          {
            meta: { title: '网关管理' },
            path: '/billing/networkManagement',
            name: 'networkManagement',
            component: networkManagement
          },
          {
            meta: { title: '中继组' },
            path: '/billing/trunkGroup',
            name: 'trunkGroup',
            component: trunkGroup
          },
          {
            meta: { title: '拨号方案' },
            path: '/billing/dialPlan',
            name: 'dialPlan',
            component: dialPlan
          },
          {
            meta: { title: '费率组' },
            path: '/billing/rate',
            name: 'rate',
            component: rate
          }
        ]
      },
      {
        path: '/call',
        component: call,
        meta: { title: '呼叫管理' },
        redirect: {
          path: '/call/ivr'
        },
        children: [
          {meta: {title: 'IVR管理'}, path: '/call/ivr', name: 'ivr', component: ivr, hidden: true},
          // {
          //   meta: { title: 'DID管理' },
          //   path: '/call/did',
          //   name: 'did',
          //   component: did
          // },
          {
            meta: { title: '呼叫转移' },
            path: '/call/calls',
            name: 'calls',
            component: calls
          }
        ]
      },
      {
        path: '/bill',
        component: converse,
        meta: { title: '通话账单' },
        redirect: {
          path: '/bill/index'
        },
        children: [
          {meta: {title: '历史话单'}, path: '/bill/index', name: 'billIndex', component: hisBill},
          // {
          //   meta: { title: 'DID管理' },
          //   path: '/call/did',
          //   name: 'did',
          //   component: did
          // },
          {
            meta: { title: '拦截通话' },
            path: '/bill/intercept',
            name: 'intercept',
            component: intercept
          }
        ]
      },
    ]
  },
  ///----------系统配置-----------

  {
    path : '/user',
    component: user,
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, form, next) => {
  console.log(to)
  next()
  if(to.path !== '/user'){
    console.log(jsCookie.get('JSESSIONID') === undefined)
    /**
     * 哈看用户是否有cookie 没有则登录
     * 有则继续
     */
    if(jsCookie.get('JSESSIONID') === undefined){
      next('/user')
      window.localStorage.setItem('userInfo', '')
    }else {
      next()
      console.log(store)
      store.dispatch('userInfo', JSON.parse(window.localStorage.getItem('userInfo')))
    }
  }else {
    next('/user')
    window.localStorage.setItem('userInfo', '')

  }
})

export default router
