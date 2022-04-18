import {request} from "@/newwork/axios";
import {getCookie} from "@/auth";
import {stringify, parse} from 'qs';

/*
*
*  ------------字典管理 -----------------
*
* */
//添加字典类型
export function addDictionaryTYpe(data) {
    console.log(data)
    return request({
        url: '/system/dict/type/add',
        method: 'post',
        data: data,
    })
}

//查看字典类型列表
export function addDictionaryList(data) {
    return request({
        url: '/system/dict/type/list',
        method: 'get',
        headers:  {"Content-Type": "application/json"},
        params: data
    })
}

//修改字典类型
export function upDateDictionaryList(data) {
    console.log(data)
    return request({
        url: '/system/dict/type/update',
        method: 'put',
        data: data,
    })
}
//删除字典类型
export function removeDateDictionaryList(data) {
    console.log(data)
    return request({
        url: '/system/dict/type/delete/' + data,
        method: 'delete',
    })
}
/*
*
* 字典
* */

//添加字典

export function addDictionary(data){
    return request({
        url: '/system/dict/item/add',
        method: 'post',
        data: data
    })
}

//通过类型查找字典（默认 可为空）
export function getDictionaryAll(code) {
    console.log(code)
    return request({
        url: '/system/dict/item/list/type',
        method: 'get',
        params: code
    })
}


//修改字典
export function upData(data) {
    return request({
        url: '/system/dict/item/update',
        method: 'put',
        data: data
    })
}
//删除字典
export function removeDictionary(data) {
    return request({
        url: '/system/dict/item/delete/' + data,
        method: 'delete',
        data: data
    })
}




//查看日志
export function getLog(data){
    return request({
        url: '/log/list',
        params: stringify(data)
    })
}


/*
*
*  ------------组织管理 -----------------
*
* */
//添加组织
export function addOrganize(data) {
    return request({
        url: '/system/dept/add',
        method: "post",
        data: data
    })
}

//获取组织列表
export function getOrganizeList(data){
    return request({
        url: '/system/dept/list',
        data: data
    })
}
//获取组织id
export function getOrganizeId(data){
    return request({
        url: '/system/dept/detail/' + data,
    })
}

/*
*
*  ------------角色管理 -----------------
*
* */

export function addRole(data){
    return request({
        url: '/role/add',
        method: 'post',
        data: data
    })
}
export function getRoleList(data){
    return request({
        url: '/system/role/list',
        method: 'get',
        data: data
    })
}

/**
 * 用户管理
 *
 *
 */

//新增用户
export function addUser(data) {
    return request({
        url: '/system/user/add',
        method: 'post',
        data: data
    })
}