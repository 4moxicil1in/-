<template>
 <a-layout>
    <a-layout>
      <a-layout-sider width="200" style="background: #001529">
          <LayoutAside />
      </a-layout-sider>
      <a-layout style="padding: 0 10px 10px">
        <a-layout-header class="header">
        <LayoutHeader />
    </a-layout-header>
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
            <LayoutMain />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import LayoutHeader from "./Header";
import LayoutAside from "./aside/Index";
import LayoutMain from "./Main";

import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
    name:"Layout",
    components:{ 
        LayoutHeader,
        LayoutAside,
        LayoutMain,
        UserOutlined,
        LaptopOutlined,
        NotificationOutlined,
    },

  setup() {
    return {
      selectedKeys1: ref(['2']),
      selectedKeys2: ref(['1']),
      collapsed: ref(false),
      openKeys: ref(['sub1']),
    };
  },
});
</script>
<style lang="scss">
.ant-layout-content{
    height:100vh;
}

</style>