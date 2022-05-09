import axios from 'axios'
import store from "@/store";
import {getCookie, removeCookie} from "@/auth";
import { MessageBox } from 'element-ui'

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
        // if(config.data.code !== 200){
        //     removeCookie()
        // }
        // axios.get('http://123.60.212.9:9528/dispatch/unauth').then(res => {
        //     console.log(res, '________________');
        // })
        return config
    }, error => {
        MessageBox.alert('登录状态异常,请重新登录', '权限异常', {
            confirmButtonText: '确定',
            callback: action => {
                removeCookie()
                location.reload()
            }
        }).then(res => console.log(res));
    })

    return instance(config)
}
