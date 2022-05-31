import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store, { setupStore } from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";

// import echarts from "echarts";
// import axios from "axios";

Vue.prototype.$bus = new Vue();
//
// Vue.prototype.$axios = axios;
// axios.defaults.baseURL = "http://123.60.212.9:9528/dispatch";
// axios.defaults.timeout = 1500;
// Vue.config.productionTip = false;
// Vue.prototype.$echarts = echarts;
Vue.use(ElementUI, { locale });
setupStore();
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
