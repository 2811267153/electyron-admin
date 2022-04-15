import {request} from "@/newwork/axios";

export default function getLogin(username, password){
    return  request({
        url: '/dispatch/web/login',
        method: 'post',
        params: {
            username,password
        }
    })
}