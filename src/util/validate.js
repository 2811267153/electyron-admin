//是否是合法ip
export  function isValidIP(ip){
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    return reg.test(ip)
}
//是否是合法端口
export function isValidPost(port){
    let reg;
    reg = /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))$/;
    return reg.test(port)
}
//是否是合法数字
export function isValidNumber(num){
    let reg =  /^\+?[1-9]\d*$/;
    return reg.test(num)
}
//是否是合法电话
export function isValidPhone(num) {
    let reg;
    reg = /^1[3|4|5|7|8][0-9]{9}$/;
    return reg.test(num)
}
//是否是合法邮箱
export function isValidEmail(email) {
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    return reg.test(email)
}
