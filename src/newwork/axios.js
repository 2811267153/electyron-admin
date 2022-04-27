import axios from 'axios'
import store from "@/store";
import router from "@/router/index";
import {getCookie} from "@/auth";
import jsCookie from "js-cookie";

export function request(config) {
    const instance = axios.create({
        baseURL: '/dispatch',
        timeout: 1500,
        withCredentials: true,
    })
    instance.interceptors.request.use(config => {
        // 如果有一个接口需要认证才能访问，就在这里统一设置
        if(store.state.userInfo){
            config.headers.Authorization= getCookie()
        }
        return config;
    }, error => {

    })
    instance.interceptors.response.use(config => {
        if(config.data.code !== 200){
            jsCookie.remove('JSESSIONID')
        }
        return config
    }, error => {
    })

    return instance(config)
}
