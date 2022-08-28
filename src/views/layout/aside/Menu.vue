<template>
    <a-sub-menu :key="menu.path">
        <template #title>
            <span>
                <img class="icon icon-size-21 mb--5" style="display:inline-block" src="@/assets/layoutAssets/home.png" />
                {{menu.meta&&menu.meta.title}} 
            </span>
        </template>
        <template v-if="menu.children&&menu.children.length">
            <template v-for="item in menu.children">
                <div  v-if="!item.hidden">
                    <a-menu-item v-if="!item.children" :key="item.path">
                        <router-link :to="item.path">
                            {{item.meta&&item.meta.title}}
                        </router-link>
                    </a-menu-item>
                    <!-- 组件调用自身的时候不需要引用，即嵌套不需要再import -->
                    <Menu :menu="item" :key="item.path" v-else />
                </div>
            </template>
        </template>
    </a-sub-menu>
</template>
<script>
export default{
    name:"Menu",
    props:{
        menu:{
            type:Object,
            default:()=>({})
        },
    },
    setup(){

    }
};
</script>
<style>
.icon{
    style:inline-block;
}
</style>