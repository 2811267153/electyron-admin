import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    dictionaryData: {}
  },
  getters: {},

  actions: {
    userInfo(context, value){
      context.commit('userInfo', value)
      window.localStorage.setItem('userInfo', JSON.stringify(value))
    },
    dictionaryData(context, value){
      context.commit('dictionaryData', value)
    }
  },

  mutations: {
    userInfo(state, userInfo){
      state.userInfo = userInfo
    },
    dictionaryData(state, dictionaryData){
      state.dictionaryData = dictionaryData
    }
  },

  modules: {}
})
