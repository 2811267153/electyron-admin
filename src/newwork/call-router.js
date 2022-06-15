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
    url: "/pbx/group/add",
    method: "post",
    data
  });
}

export function upDataGroupData(data) {
  return request({
    url: "/pbx/group/update",
    method: "put",
    data
  });
}

export function deleteGroupData(data) {
  return request({
    url: "/pbx/group/delete/" + data,
    method: "delete",
    data
  });
}

export function getMeeting(data) {
  return request({
    url: "/pbx/conference/list",
    params: data
  });
}

export function addMeeting(data) {
  return request({
    url: "/pbx/conference/add",
    data,
    method: "post"
  });
}

export function upDataMeeting(data) {
  return request({
    url: "/pbx/conference/update",
    method: "put",
    data
  });
}

export function deleteMeeting(data) {
  return request({
    url: "/pbx/conference/delete/" + data,
    method: "delete"
  });
}
