import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    dictionaryData: {},
    sysMenuList: {}, //菜单
    sysDept: {}, //部门
    sysRole: {}, //角色
  },
  getters: {},

  actions: {
    userInfo(context, value){
      context.commit('userInfo', value)
      window.localStorage.setItem('userInfo', JSON.stringify(value))
    },
    dictionaryData(context, value){
      context.commit('dictionaryData', value)
    },
    sysMenuList(context, value){
      context.commit('sysMenuList', value)
      window.localStorage.setItem('sysMenuList', JSON.stringify(value))
    },
    sysDept(context, value){
      context.commit('sysDept', value)
      window.localStorage.setItem('sysDept', JSON.stringify(value))
    },
    sysRole(context, value){
      context.commit('sysRole', value)
      window.localStorage.setItem('sysRole', JSON.stringify(value))
    },
  },

  mutations: {
    userInfo(state, userInfo){
      state.userInfo = userInfo
    },
    dictionaryData(state, dictionaryData){
      state.dictionaryData = dictionaryData
    },
    sysMenuList(state, sysMenuList){
      state.sysMenuList = sysMenuList
    },
    sysDept(state, sysDept){
      state.sysDept = sysDept
    },
    sysRole(state, sysRole){
      state.sysRole = sysRole
    }
  },

  modules: {}
})
