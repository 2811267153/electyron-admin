import {request} from "@/newwork/axios";
import {getCookie} from "@/auth";
import {stringify} from 'qs';

//添加字典类型
export function addDictionaryTYpe(data) {
    console.log(data)
    return request({
        url: '/dict/type/add',
        method: 'post',
        data: stringify(data),
    })
}

//查看字典类型列表
export function addDictionaryList(data) {
    return request({
        url: '/dict/type/list',
        method: 'get',
        params: stringify(data),
    })
}

//修改字典类型
export function upDateDictionaryList(data) {
    console.log(data)
    return request({
        url: '/dict/type/update',
        method: 'post',
        data: stringify(data),
    })
}
//删除字典类型
export function removeDateDictionaryList(data) {
    console.log(data)
    return request({
        url: '/dict/type/delete/' + data,
        method: 'delete',
    })
}

//通过类型查找字典（默认 可为空）
export function getDictionaryAll(data) {
    console.log(data)
    return request({
        url: '/dict/item/list',
        method: 'get',
        params: stringify(data)
    })
}