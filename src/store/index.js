import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    dictionaryData: {},
    // formPage: {
    //   pageNum: 1,
    //   pageSize: 10,
    // },
    total: 0  // 获取数据的总长度
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
    total(context, value){
      context.commit('total', value)
    },
    formPage(context, value){
      context.commit('formPage', value)
    }
  },

  mutations: {
    userInfo(state, userInfo){
      state.userInfo = userInfo
    },
    dictionaryData(state, dictionaryData){
      state.dictionaryData = dictionaryData
    },
    total(state, total){
      state.total = total
    },
    formPage(state, formPage){
      state.formPage = formPage
    },
  },

  modules: {}
})
