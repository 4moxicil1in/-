<template>
  <div class="role">
    <h1>管理</h1>
    <Button>click</Button>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="danger">Danger</Button>
    <Button type="link">Link</Button>
    <User />
  </div>
</template>

<script>
import {defineComponent} from "vue";
import User from "./User.vue";
export default defineComponent({
    name:"Role",
    components: {
    User,
    },
})
</script>