import { request } from "@/newwork/axios";

/**
 * 话机管理
 *
 * @return {*}
 * @param data
 */
export function addDirectory(data) {
  console.log(data);
  return request({
    url: "/pbx/directory/add",
    method: "post",
    data
  });
}

export function getDirectory(data) {
  return request({
    url: "/pbx/directory/list",
    params: data
  });
}

export function upDateDirectory(data) {
  return request({
    url: "/pbx/directory/update",
    method: "put",
    data
  });
}

export function deleteDirectory(data) {
  return request({
    url: "/pbx/directory/delete/" + data,
    method: "delete"
  });
}

export function recharge(data) {
  return request({
    url: "/pbx/directory/recharge",
    method: "put",
    data
  });
}

/**
 *
 *
 * @param data 队列相关接口
 * @return {AxiosPromise}
 */

export function getFifo(data) {
  return request({
    url: "/pbx/fifo/list",
    params: data
  });
}

export function addFifo(data) {
  return request({
    url: "/pbx/fifo/add",
    data,
    method: "post"
  });
}

export function upDataFifo(data) {
  return request({
    url: "/pbx/fifo/update",
    data,
    method: "put"
  });
}

export function delFifo(data) {
  return request({
    url: "/pbx/fifo/delete/" + data,
    method: "delete"
  });
}

export function unGetFilo() {
  return request({
    url: "/pbx/fifo/unbound/list"
  });
}

/**
 *
 * 出入路由号码
 */

export function fifoRouterIn() {
  return request({
    url: "/pbx/directory/router/in/list"
  });
}

export function fifoRouterOut() {
  return request({
    url: "/pbx/directory/router/out/list"
  });
}
