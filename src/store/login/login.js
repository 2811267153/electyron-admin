import getLogin from "@/newwork/user";
import cache from "@/util/cache";
import { Message } from "element-ui";
import router from "@/router";
import { menuToTree } from "@/uti";
import { mapMenuRouter } from "@/util/map-menu";

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
      console.log(value, "@@@@@@@@@2");
      //动态添加路由
      const routers = mapMenuRouter(value);
      routers.forEach(item => {
        router.addRoute("/home", item);
      });
    }
  },
  actions: {
    async loginAction({ commit }, payLoad) {
      const result = await getLogin(payLoad);
      console.log(result);
      if (result.data.code === 200) {
        const { JSESSIONID, user } = result.data.data;
        const { sysMenuList } = result.data.data.user;
        //数据存储到vuex
        commit("changeToken", JSESSIONID);
        commit("changeUserInfo", user);
        commit("changeMenu", sysMenuList);

        //数据存储到本地浏览器
        cache.setCache("token", JSESSIONID);
        cache.setCache("user", user);
        cache.setCache("menuList", menuToTree(user.sysMenuList)[0].children);

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

