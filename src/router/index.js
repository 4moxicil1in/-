import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  //登录
  {
    path: "/",
    name: "login",
    component: () =>
      import(/*  */ "../views/account/Login.vue"),
  },
  //注册
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/*  */ "../views/account/Register.vue"),
  },
  //注册
  {
    path: "/forget",
    name: "forget",
    component: () =>
      import(/*  */ "../views/account/Forget.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/explain",
    name: "explain",
    component: () =>
      import(/* 为啥把注释删了就报错啊 */ "../views/ExplainView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
