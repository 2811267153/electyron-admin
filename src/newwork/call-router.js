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
