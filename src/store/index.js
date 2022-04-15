import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
  },
  getters: {},
  mutations: {
    userInfo(state, userInfo){
      state.userInfo = userInfo
    }
  },
  actions: {
    userInfo(state, value){
      state.commit('userInfo', value)
    }
  },
  modules: {}
})
