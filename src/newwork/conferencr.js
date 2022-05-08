import {request} from "@/newwork/axios";

/**
 *
 * 查看会议记录
 * @param data
 * @returns {AxiosPromise}
 */
export function getRecord(data) {
    return request({
        url: '/pbx/conference/record/list',
        params: data
    })
}

export function getRecordDetail(data) {
    return request({
        url: '/pbx/conference/record/detail',
        params: data
    })
}