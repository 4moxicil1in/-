//数字字母混合
export function checkPassword(value){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,15}$/;
    return reg.test(value);
}
//十一位电话号码
export function checkPhoneNumber(value){
    let reg = /^\d{11}$/;
    return reg.test(value);
}

/* /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
真正的电话号码格式
*/