<template>
    <div class="header">
        <div class="header-manu">
           <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                    <img src="../../assets/leaf1.png"/>
                <DownOutlined />
                </a>
                <template #overlay>
                <a-menu>
                    <a-menu-item key="0">
                    111
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="1">
                   222
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="3" disabled>333</a-menu-item>
                </a-menu>
                </template>
            </a-dropdown>
        </div> 
    </div>
    
</template>
<script>
import { defineComponent } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    name:"Header",
components: {
    DownOutlined,
  },
});
</script>
<style lang="scss" scoped>
.header-manu{
    float:right;
    margin-top:10px;
}
</style>