<template>
    <div>
      <h1 id="logo">
        <img :src="logo" alt="手把手撸码" />
      </h1>
    <a-menu
      theme="dark"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :inline-collapsed="collapsed"
      @click="selectMenu"
      @openChange="openMenu"
    >
      <template v-for="item in routers">
        <div  v-if="!item.hidden">
          <a-menu-item :key="item.children[0].path" v-if="hasOnlyChildren(item)">
            <router-link :to="item.children[0].path">
              <i class="icon icon-size-21 mb--6">
                <img src="@/assets/layoutAssets/home.png" />
              </i>
              {{item.children[0].meta&&item.meta.title}}
            </router-link>
          </a-menu-item>
          <Menu :menu="item" :key="item.path" v-else />
        <!-- 这个menu是用prop自定义的对象，这里将menu和一级菜单成员item绑定 -->
        
      </div>
      </template>
      
    </a-menu>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, watch, } from 'vue';
//路由
import {useRouter,useRoute} from 'vue-router';
import Menu from "./Menu.vue"
export default defineComponent({
    name:"Aside",
    components: {
    Menu,
    },

setup() {
    const {options}=useRouter();
    const routers=options.routes;
    const state = reactive({
      collapsed: false,
      selectedKeys: [localStorage.getItem("selectedKeys")],
      openKeys:[localStorage.getItem("openKeys")],
      logo:require("@/assets/layoutAssets/logo.png")
      // 绑定属性中被绑定的属性，这里openKeys是有问题的，只能读取最近一次点击的第一层菜单
    });

    const selectMenu=({ item, key, keyPath })=>{
      // data.selectedKeys=keyPath;
      state.selectedKeys=[key];
      // console.log(state.selectedKeys);
      localStorage.setItem("selectedKeys",key);
    };

    const openMenu=(openKeys)=>{
      console.log(openKeys);
      localStorage.setItem("openKeys",openKeys[1]);

    }
    //检测是否只有一个子路由
    const hasOnlyChildren=(state)=>{
      //不存在子级
      if(!state.children){return false;}
      //判断是否只有一个子级
      const routers=state.children.filter(item=>{
        return item.hidden?false:true;
      })
      if(routers.length===1){return true;}
      return false;
    }

    return { 
        ...toRefs(state),
        routers,
        selectMenu,
        openMenu,
        hasOnlyChildren,
    };
  },

});
</script>
<style lang="scss" scoped>
#logo{
  padding:24px 0 20px;
  border-bottom:1px solid black;
  text-align:center;
  img{
    display:inline-block;
    // img是块元素，要居中首先要把它转化为内联元素
  }

}
i[class^=icon]{
// 寻找开头的值为icon的对应class属性
    display: inline-block;
    background-repeat: no-repeat;
    background-position: 0 0;
}
.icon-size-21{
  width:21px;
  height:21px;
}
.mb--6{ margin-bottom:-6px;}
</style>