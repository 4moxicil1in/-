//数字字母混合
export function checkPassword(value){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,15}$/;
    return reg.test(value);
}
