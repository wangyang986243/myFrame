<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <!-- <el-menu unique-opened ref="AsideElMenu" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" mode="vertical" background-color="#1B1D29" text-color="#bfcbd9" active-text-color="#409EFF">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu> -->

    <el-menu
      unique-opened
      ref="AsideElMenu"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  components: {
    SidebarItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      /**
       * 此处有两个路由可以选择，根据具体业务选择
       * 如果是动态路由，解开第一个注释
       * 如果是静态路由，解开第二个注释
       */
      
      // return  this.$store.getters.menus  //此处是动态路由
      return this.$router.options.routes; //此处是静态路由
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  mounted() {},
};
</script>
<style>
</style>
