import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    dictionaryData: {}
  },
  getters: {},
  mutations: {
    userInfo(state, userInfo){
      state.userInfo = userInfo
    },
    dictionaryData(state, dictionaryData){
      state.dictionaryData = dictionaryData
    }
  },
  actions: {
    userInfo(state, value){
      state.commit('userInfo', value)
    },
    dictionaryData(context, value){
      context.commit('dictionaryData', value)
    }
  },
  modules: {}
})
