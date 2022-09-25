<template>
  <div class="account">
    <div class="form-wrap">
      <a-form
        ref="formRef"
        name="custom-validation"
        :="layout"
        :rules="rules_form"
        :model="account_form"
        @finish="handleFinish"
      >
        <a-form-item name="username">
          <label>用户名</label>
          <a-input v-model:value="account_form.username" :disabled="input_disabled.username" type="text" autocomplete="off" />
        </a-form-item>

        <a-form-item name="password">
          <label>密码</label>
          <a-input-password v-model:value="account_form.password" type="password" autocomplete="off" placeholder="请输入密码" />
        </a-form-item>

        <a-form-item name="passwords">
          <label>确认密码</label>
          <a-input-password v-model:value="account_form.passwords" type="password" autocomplete="off" placeholder="请再次输入密码" />
        </a-form-item>

        <a-form-item name="code">
          <label>验证码</label>
          <a-row :gutter="16">
            <a-col :span="14"> <a-input v-model:value="account_form.code" type="text" autocomplete="off" /></a-col>
            <a-col :span="10">
              <a-button type="primary" @click="getCode" 
              block :disabled="button_disabled" :loading="button_loading">
              {{button_text}}</a-button>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>注册</a-button>
        </a-form-item>
      </a-form>
      <div class="fs-12 text-center">
        <router-link to="/" class="color-white">登录</router-link> | 
        <router-link to="/forget" class="color-white">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {checkPassword as pass,checkPhoneNumber as phone} from "@/utils/validate.js"
import {useRouter,useRoute} from 'vue-router';
import {reactive,onMounted,toRefs} from "vue";
//加密
import md5 from 'js-md5';
import {getAES} from "@/utils/crypto.js";
import {CheckUserName,Send,AccountRegister} from "@/api/accountApi";
import { message } from 'ant-design-vue';
export default {
  name: "Login",
  setup(props){
    const checkUserName = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('请输入用户名'); //Promise.reject提示出错
      } else {
        if(!phone(value))
        {
          dataItem.button_disabled=true;
          return Promise.reject('用户名应是11位电话号码');
        }
        else{
          checkUserNameFn();
          return Promise.resolve();//Promise.resolve相当于说明成功
        }
      }
    };
    const checkPassword = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('请输入密码'); 
      } else {
        if(!pass(value))
        return Promise.reject('密码应是6-15位数字+大小写字母');
        else {
        return Promise.resolve();
      }}
    };
    let checkPasswords = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('请再次输入密码');
      } else if(!pass(value)){
        return Promise.reject('密码应是6-15位数字+大小写字母');}
      else if (value !== formConfig.account_form.password) {
        return Promise.reject("两次密码输入不同！");
      } else {
        return Promise.resolve();
      }
    };
     const checkCode = async (_rule, value) => {
      let reg = /^\d{6}$/;
      if (value === '') {
        return Promise.reject('请输入验证码'); 
      } else if(!reg.test(value)){
        return Promise.reject('验证码应是6位数字');
      }else {
        return Promise.resolve();}
    };
    const formConfig=reactive({
      layout:{
        labelCol: { span: 4 },
      },
      account_form:{
        username:"",
        password:"",
        passwords:"",
        code:""
      },
      input_disabled:{
        username:false,
      },
      rules_form:{
        username: [{
          required: true,
          validator: checkUserName,
          trigger: 'change',
        }],
        password:[{
          required: true,
          validator: checkPassword,
          trigger: 'change',
        }],
        passwords:[{
          required: true,
          validator: checkPasswords,
          trigger: 'change',
        }],
        code:[{
          required: true,
          validator: checkCode,
          trigger: 'change',
        }]
      },
    })
    const dataItem=reactive({
      button_text:"获取验证码",
      button_loading:false,
      button_disabled:true,
      sec:0,
      timer:null
    })
    const form=toRefs(formConfig);
    const data=toRefs(dataItem);
    //提交表单
    const handleFinish=(value) =>{
      const requestData={
        username:formConfig.account_form.username,
        password:md5(formConfig.account_form.password),
        code:formConfig.account_form.code};
      AccountRegister(requestData).then(response=>{
        const code=response.content.code;
        if(!code) {
          message.error(response.message);
          return false;
        }else{
          message.success("注册成功！");

        }
      })
    }
    const getCode=async() =>{
      const usernameStatus=await checkUserNameFn();
      if(usernameStatus)
      {return false;}
      dataItem.button_loading=true;
      dataItem.button_text="加载中";
      Send({username:formConfig.account_form.username,type:"Register"}).then(response=>{
        dataItem.button_loading=false;
        dataItem.button_disabled=true;
        countDown();
      }).catch(error=>{
        dataItem.button_text="重新获取";
        dataItem.button_disabled=false;
      });
    }
    const checkUserNameFn=()=>{
      formConfig.input_disabled.username=true;
      return CheckUserName({username:formConfig.account_form.username}).then(response=>{
        //获取用户名状态（是否已经被注册
        const userStatus=response.content.user;
        //从而确定发送验证码按钮状态
        dataItem.button_disabled=userStatus; 
        formConfig.input_disabled.username=false;
        return userStatus;
        }).catch(error=>{
          formConfig.input_disabled.username=false;});
    }
    const countDown=()=>{
      //更新倒计时时间
      dataItem.sec=process.env.VUE_APP_COUNTDOWN;
      //定时器
       if(dataItem.timer){
        clearInterval(dataItem.timer);
      }
      dataItem.timer=setInterval(() => {
        const s=dataItem.sec--;
        dataItem.button_text=`${s}秒`;
        if(s<=0){
          clearInterval(dataItem.timer);
          dataItem.button_text="重新获取";
          dataItem.button_disabled=false;
        }
      }, 1000);
    }

    return {
      ...form,
      ...data,
      formConfig,
      handleFinish,
      getCode,
      }
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
