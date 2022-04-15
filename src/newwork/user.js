import {request} from "@/newwork/axios";

export default  function getLogin(username, password){
    return  request({
        url: '/web/login',
        method: 'post',
        params: {
            username,password
        }
    })
}

export  function delLogin(){
    return  request({
        url: '/web/logout',
        method: 'post',
        data: {

        }
    })
}