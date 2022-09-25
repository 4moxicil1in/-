import Cookies from 'js-cookie';

const token="tokenAdmin";
const username="username";//目的：解耦合，方便统一修改

export function setToken(params){
    Cookies.set(token,params.token);
}
export function getToken(){
    return Cookies.get(token);
}
export function removeToken(){
    return Cookies.removeToken(token);
}

export function setUsername(params){
    Cookies.set(username,params.username);
}