import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Atnd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Axios from "axios";

const app=createApp(App);
app.config.globalProperties.$axios=Axios;
app.use(store).use(router).use(Atnd).mount("#app");
