import service from "@/utils/request.js"

//获取验证码
export function Send(data){
    return service.request({
        url:process.env.VUE_APP_ACCOUNT_APIURL+'/v1/send',
        method:'post',
        data,
    })  
}

//用户名检测
export function CheckUserName(data){
    return service.request({
        url:process.env.VUE_APP_ACCOUNT_APIURL+'/v1/account/check',
        method:'post',
        data,
    })  
}


export function GetCode(data){
    return service.request({
        url:'/api/',
        method:'post',
        data,
    })  
}

//账户体系——注册
export function AccountRegister(data){
    return service.request({
        url:process.env.VUE_APP_ACCOUNT_APIURL+'/v1/account/register',
        method:'post',
        data,
    })  
}

//账户体系——登录
export function AccountLogin(data){
    return service.request({
        url:process.env.VUE_APP_ACCOUNT_APIURL+'v1/account/login',
        method:'post',
        data,
    })  
}