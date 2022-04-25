import {request} from "@/newwork/axios";

/**
 *
 * 网关接口
 * Pbx Gate Way Controller
 */
export function getPbxAll(data){
    return request({
        url:'/pbx/gateway/list',
        data: data
    })
}
export function getPbxAdd(data){
    return request({
        url:'/pbx/gateway/add',
        data: data,
        method: 'post'
    })
}

export function deletePbx(data){
    return request({
        url:'/pbx/gateway/delete/' + data,
        data: data,
        method: 'delete'
    })
}
export function upDatePbx(data){
    console.log(data)
    return request({
        url:'/pbx/gateway/update',
        data: data,
        method: 'put'
    })
}

/**
 *
 * 中继管理
 *
 */
export function getGwgroup(data) {
    return request({
        url: '/pbx/gwgroup/list',
        data: data,
        method: 'get'
    })
}export function addGwgroup(data) {
    console.log(data);
    return request({
        url: '/pbx/gwgroup/add',
        data: data,
        method: 'post'
    })
}
export function upDateGwgroup(data) {
    return request({
        url: '/pbx/gwgroup/list',
        data: data,
        method: 'put'
    })
}
export function deleteGwgroup(data) {
    return request({
        url: '/pbx/gwgroup/delete/' + data,
        data: data,
        method: 'delete'
    })
}

/**
 *
 * 拨号方案
 */
export function diaPlanList(data) {
    return request({
        url: '/pbx/diaplan/list',
        params: data
    })
}
export function addDiaPlanList(data) {
    console.log(data);
    return request({
        url: '/pbx/diaplan/add',
        method: 'post',
        data: data
    })
}
export function upDateDiaPlan(data) {
    return request({
        url: '/pbx/diaplan/update',
        method: 'put',
        data: data
    })
}
export function delDiaPlan(data) {
    return request({
        url: '/pbx/diaplan/delete/' + data,
        method: 'delete'
    })
}

/**
 *
 * 费率组
 */

//查询费率组

export function getRateList(data) {
    return request({
        url: '/pbx/rate/group/list',
        params: data
    })
}
export function addRateList(data) {
    console.log(data)
    return request({
        url: '/pbx/rate/group/add',
        data: data,
        method: 'post'
    })
}
export function putRateList(data) {
    console.log(data)
    return request({
        url: '/pbx/rate/group/update',
        method: 'put',
        data:data
    })
}
export function deleteRate(data) {
    return request({
        url: '/pbx/rate/group/delete/' + data,
        method: 'delete'
    })
}

//新增费率
export function addRateItemList(data){
    return request({
        url: '/pbx/rate/group/item/add',
        method: 'post',
        data: data
    })
}

export function getRateItemList(data) {
    return request({
        url: '/pbx/rate/group/item/list',
        params: data
    })
}
export function upDaterateItem(data) {
    return request({
        url: '/pbx/rate/group/item/update',
        method: 'put',
        data: data
    })
}
export function deleteRateItem(data) {
    return request({
        url: '/pbx/rate/group/item/delete/' + data,
        method: 'delete'
    })
}
