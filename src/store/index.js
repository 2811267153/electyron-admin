import Vue from "vue";
import Vuex from "vuex";
import login from "./login/login";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  getters: {},

  actions: {},

  mutations: {},

  modules: {
    login
  }
});

export function setupStore() {
  store.dispatch("localLogin").then(res => {
    console.log(res);
  });
}


export default store;
