import {request} from "@/newwork/axios";

/**
 * 话机管理
 *
 * @return {*}
 * @param data
 */
export function addDirectory(data) {
    console.log(data)
    return request({
        url: '/pbx/directory/add',
        method: 'post',
        data
    })
}

export function getDirectory(data) {
    return request({
        url: '/pbx/directory/list',
        params: data
    })
}
export function upDateDirectory(data) {
    return request({
        url: '/pbx/directory/update',
        method: 'put',
        data
    })
}
export function deleteDirectory(data) {
    return request({
        url: '/pbx/directory/delete/' + data,
        method: 'delete',
    })
}

export function recharge(data) {
    return request({
        url: '/pbx/directory/recharge',
        method: 'put',
        data,
    })
}
