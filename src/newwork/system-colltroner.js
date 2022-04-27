import {request} from "@/newwork/axios";
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
}//删除组织
export function delOrganizeList(data){
    console.log(data)
    return request({
        url: '/system/dept/delete/' + data,
        method: 'delete'
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
        url: '/system/role/add',
        method: 'post',
        data: data
    })
}
export function getRoleList(data){
    console.log(data)
    return request({
        url: '/system/role/list',
        method: 'get',
        params: data
    })
}
export function upDataRoleList(data){
    return request({
        url: '/system/role/update',
        method: 'put',
        data: data
    })
}export function deleteRoleList(data){
    return request({
        url: '/system/role/delete/' + data,
        method: 'delete',
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

export function getUserAll(data) {
    return request({
        url: "/system/user/list",
        params: data
    })
}
export function deleteUser(data){
    return request({
        url: '/system/user/delete/' + data,
        method: 'delete'
    })
}

/**
 *
 * 菜单权限
 *
 */

//查看所有菜单

export function getMenuAll(){
    return request({
        url: '/system/menu/list',
        method: 'get'
    })
}

/**
 *
 * 系统相关接口
 */


//查看日志
export function getLog(data){
    return request({
        url: '/system/log/list',
        params: data
    })
}
//查看 服务器运行信息
export function getSystem(){
    return request({
        url: '/system/monitor/server',
    })
}
