import { request } from "@/newwork/axios";

export default function getLogin(data) {
    return request({
        url: "/web/login",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data
    });
}

export function delLogin() {
    return request({
        url: "/web/logout",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {}
    });
}
