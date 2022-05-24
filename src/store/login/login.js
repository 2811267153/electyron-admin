import getLogin from "@/newwork/user";
import cache from "@/util/cache";
import { Message } from "element-ui";
import router from "@/router";

const login = {
  state() {
    return { token: "", userInfo: {}, menuList: [] };
  },
  mutations: {
    changeToken(state, value) {
      state.token = value;
    },
    changeUserInfo(state, value) {
      state.userInfo = value;
    },
    changeMenu(state, value) {
      state.menuList = value;
    }
  },
  actions: {
    async loginAction({ commit }, payLoad) {
      const result = await getLogin(payLoad);
      console.log(result);
      if (result.data.code === 200) {
        const { JSESSIONID, user } = result.data.data;
        //数据存储到vuex
        commit("changeToken", JSESSIONID);
        commit("changeUserInfo", user);
        commit("changeMenu", user.sysMenuList);

        //数据存储到本地浏览器
        cache.setCache("token", JSESSIONID);
        cache.setCache("user", user);
        cache.setCache("menuList", user.sysMenuList);

        await router.push("/home");
      } else {
        Message.error(result.data.msg);
      }

    },
    localLogin({ commit }) {
      const token = cache.getCache("token");
      if (token) {
        commit("changeToken", token);
      }
      const userInfo = cache.getCache("user");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const menuList = cache.getCache("menuList");
      if (menuList) {
        commit("changeMenu", menuList);
      }
    }
  }
};
export default login;

