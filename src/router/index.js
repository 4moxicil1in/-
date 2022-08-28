import { createRouter, createWebHashHistory } from "vue-router";
import LayoutIndex from "../views/layout/Index.vue";

const routes = [
  //登录
  {
    path: "/",
    name: "login",
    hidden:true,
    meta:{
      title:"登录"
    },
    component: () =>
      import(/*  */ "../views/account/Login.vue"),
    children:[],
  },
  //注册
  {
    path: "/register",
    name: "Register",
    hidden:true,
    meta:{
      title:"注册"
    },
    component: () =>
      import(/*  */ "../views/account/Register.vue"),
    children:[],
  },
  //忘记密码
  {
    path: "/forget",
    name: "Forget",
    hidden:true,
    meta:{
      title:"忘记密码"
    },
    component: () =>
      import(/*  */ "../views/account/Forget.vue"),
    children:[],
  },
  {
    path: "/index",
    name: "Index",
    meta:{
      title:"首页"
    },
    component: LayoutIndex,
    children:[
      {
        path: "/home",
        name: "Home",
        meta:{
          title:"首页111"
        },
        component:()=>import("../views/home/Index.vue")
      }
    ]
  },
  {
    path: "/adminIndex",
    name: "AdminIndex",
    meta:{
      title:"管理总台"
    },
    component: LayoutIndex,
    children:[
      {
        path: "/role",
        name: "Role",
        meta:{
          title:"角色管理"
        },
        component:  () =>
        import(/*  */ "../views/admin/Role.vue"),
        children:[
          {
            path: "/test",
            name: "ExplainView",
            meta:{
              title:"测试子菜单"
            },
            component:  () =>
            import(/*  */ "../views/ExplainView.vue"),
          },
        ]
      },
      {
        path: "/user",
        name: "User",
        meta:{
          title:"用户列表"
        },
        component:  () =>
        import(/*  */ "../views/admin/User.vue"),
      },
      {
        path: "/menus",
        name: "Menus",
        meta:{
          title:"菜单管理"
        },
        component:  () =>
        import(/*  */ "../views/admin/Menus.vue"),
      },
    ]
  },
  {
    path: "/informIndex",
    name: "InformIndex",
    meta:{
      title:"信息管理"
    },
    component: LayoutIndex,
    children:[
      {
        path: "/informList",
        name: "InformList",
        meta:{
          title:"信息列表"
        },
        component:  () =>
        import(/*  */ "../views/inform/InformList.vue"),
      },
      {
        path: "/informClass",
        name: "InformClass",
        meta:{
          title:"信息类别"
        },
        component:  () =>
        import(/*  */ "../views/inform/InformClass.vue"),
      },
    ]
  },
  {
    path: "/productIndex",
    name: "ProductIndex",
    meta:{
      title:"产品管理"
    },
    component: LayoutIndex,
    children:[],
  },
  {
    path: "/vipIndex",
    name: "VipIndex",
    meta:{
      title:"会员管理"
    },
    component: LayoutIndex,
    children:[],
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
