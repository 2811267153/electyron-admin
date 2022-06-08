import { request } from "@/newwork/axios";

/**
 * 呼叫路由
 * @param data
 * @return {AxiosPromise}
 */
export function getRouter(data) {
  return request({
    url: "/pbx/router/list",
    params: data
  });
}

export function addRouter(data) {
  return request({
    url: "/pbx/router/add",
    method: "post",
    data
  });
}

export function upDataRouter(data) {
  return request({
    url: "/pbx/router/update",
    data,
    method: "put"
  });
}

export function delRouter(data) {
  return request({
    url: "/pbx/router/delete/" + data,
    method: "delete"
  });
}

/**
 * 获取分组数据
 * @param data
 * @return {AxiosPromise}
 */
export function getGroupData(data) {
  return request({
    url: "/pbx/group/list",
    params: data
  });
}

export function addGroupData(data) {
  return request({
    url: "/pbx/group/list",
    method: "post",
    data
  });
}

export function upDataGroupData(data) {
  return request({
    url: "/pbx/group/list",
    method: "put",
    data
  });
}

export function deleteGroupData(data) {
  return request({
    url: "/pbx/group/list",
    method: "delete",
    data
  });
}

