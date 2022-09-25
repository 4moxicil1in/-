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

        <a-form-item>
          <a-button type="primary" html-type="submit" block>登录</a-button>
        </a-form-item>
        
      </a-form>
      <div class="fs-12 text-center">
        <router-link to="/forget" class="color-white">忘记密码</router-link> | 
        <router-link to="/register" class="color-white">注册账号</router-link>
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
//Cookies
import { setToken,setUsername } from "@/utils/cookies.js"
import {AccountLogin} from "@/api/accountApi";
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
          return Promise.reject('用户名应是11位电话号码');
        }
        else{
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
    const formConfig=reactive({
      layout:{
        labelCol: { span: 4 },
      },
      account_form:{
        username:"",
        password:"",
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
      },
    });
    const form=toRefs(formConfig);
     //提交表单
    const handleFinish=(value) =>{
      const requestData={
        username:formConfig.account_form.username,
        password:md5(formConfig.account_form.password),};
      AccountLogin(requestData).then(response=>{
        const data=response.content;
        setToken({token:data.token});
        setUsername({username:data.username});
      })
    }
    return {
      ...form,
      formConfig,
      handleFinish,
      }
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
