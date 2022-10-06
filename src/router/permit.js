import router from "./index";

router.beforeEach((to,form,next)=>{
    next();
    //to是要去的路由，form是来源，next是是否可以去路由
})