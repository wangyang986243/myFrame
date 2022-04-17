<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
     
      <keep-alive :include="cachedViews">
        
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
 
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  /*34 = tagsView */
  height: calc(100vh - 84px);
  position: relative;
  overflow: hidden;
  /* background:rgba(16,16,17,1); */
  padding: 20px;
}
.app-body{
  height: calc(100vh - 84px - 40px);
}

</style>
