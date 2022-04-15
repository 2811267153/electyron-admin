import Cookie from "js-cookie";

const COOKIE = 'JSESSIONID'
export  function getCookie(){
    return Cookie.get(COOKIE)
}
export function setCookie(cookie) {
    return  Cookie.set(COOKIE, cookie)
}

export function removeCookie() {
    return Cookie.remove(COOKIE)
}