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
      //动态添加路由
      const routers = mapMenuRouter(value);
      console.log(routers);
      router.addRoutes(routers);
      routers.forEach(item => {
        console.log(router, "_____");
      });
    }
  },
  actions: {
    async loginAction({ commit }, payLoad) {
      const result = await getLogin(payLoad);
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
        console.log("sysMenuList", sysMenuList);
        cache.setCache("menuList", menuToTree(sysMenuList)[0].children);
        cache.setCache("defaultCurrentIndex", "1");
        await router.push("/home");
      } else {
        Message.error(result.data.msg);
      }

    },
    localLogin({ commit }) {
      let formatMenuList = [];
      const token = cache.getCache("token");
      if (token) {
        commit("changeToken", token);
      }
      const userInfo = cache.getCache("user");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const menuList = cache.getCache("menuList") || [];
      if (menuList.length !== 0) {
        formatMenuList = menuList.sort((a, b) => {
          return a.orderNum - b.orderNum;
        });
      }
      console.log("formatMenuList", formatMenuList);
      if (formatMenuList) {
        commit("changeMenu", formatMenuList);
      }
    }
  }
};
export default login;

