import axios from "axios";
import { MessageBox } from "element-ui";
import cache from "@/util/cache";

// import {message}

export function request(config) {
  const instance = axios.create({
    baseURL: "/dispatch",
    timeout: 1500,
    withCredentials: true
  });
  instance.interceptors.request.use(config => {
    // 如果有一个接口需要认证才能访问，就在这里统一设置
    const token = cache.getCache("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  }, error => {

  });
  instance.interceptors.response.use(config => {
    if (config.data.code === 40000) {
      MessageBox.alert("登录过期,请重新登录", "确认退出", {
        confirmButtonText: "确定",
        callback: action => {
          cache.delCache("token");
          cache.delCache("user");
          cache.delCache("menuList");
          location.reload();
        }
      }).then(res => console.log(res));
    }
    return config;
  }, error => {
    console.log(error);

  });

  return instance(config);
}
