<template>
  <div class="account">
    <div class="form-wrap">
      <a-form
        ref="formRef"
        name="custom-validation"
        v-bind="formConfig.layout"
      >
        <a-form-item>
          <label>用户名</label>
          <a-input type="text" autocomplete="off" />
        </a-form-item>
        <a-form-item>
          <label>密码</label>
          <a-input type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item>
          <Captcha/>
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
import {reactive,onMounted} from "vue";
import Captcha from "@/components/Captcha"
export default {
  name: "Login",
  components:{
    Captcha
  },
  setup(props){
    const formConfig=reactive({
      layout:{
        labelCol: { span: 4 },

      }
    })

    return {
      formConfig
      }
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
