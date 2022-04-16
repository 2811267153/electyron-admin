import {request} from "@/newwork/axios";
import {stringify} from "qs";

export default  function getLogin(username, password){
    return  request({
        url: '/web/login',
        method: 'post',
        headers: {"Content-Type": "application/json"},
        data: {
            username, password
        }
    })
}

export  function delLogin(){
    return  request({
        url: '/web/logout',
        method: 'post',
        headers: {"Content-Type": "application/json"},
        data: {

        }
    })
}