import { request } from '@/newwork/axios';

/**
 *
 * 查看会议记录
 * @param data
 * @returns {AxiosPromise}
 */
export function getRecord(data) {
	return request({
		url: '/pbx/conference/record/list',
		params: data,
	});
}

export function getRecordDetail(data) {
	return request({
		url: '/pbx/conference/record/detail',
		params: data,
	});
}

export function getPbxList(data) {
	return request({
		url: '/pbx/cdr/list',
		params: data,
	});
}

//重试PBX配置
export function delPbxConfigure(type) {
	return request({
		url: '/pbx/config/reload',
		params: {
			type,
		},
	});
}
/**
 *
 * 会议拦截
 */

export function getCdrController(data) {
	return request({
		url: '/pbx/cdr/intercept/list',
        params: data
	});
}
