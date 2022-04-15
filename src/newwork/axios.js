import axios from  'axios'

export function request(config){
    const instance = axios.create({
        baseURL: 'http://192.168.2.103:9527',
        timeout: 1500,
        withCredentials: true,
    })
    return instance(config)
}