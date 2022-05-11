import axios from 'axios'
import store from "@/store";
import {getCookie, removeCookie} from "@/auth";
import { MessageBox } from 'element-ui'
import Vue from "vue";

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
        if(config.data.code === 40000){
            MessageBox.alert('登录过期,请重新登录', '确认退出', {
                confirmButtonText: '确定',
                callback: action => {
                    removeCookie()
                    location.reload()
                }
            }).then(res => console.log(res));
        }
        return config
    }, error => {

    })

    return instance(config)
}
