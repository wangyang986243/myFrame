<template>
  <div v-loading="loading" class="iframe-container">
    <iframe :src="src" frameborder="no" style="width: 100%;height: 100%" scrolling="auto"/>
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: true
    };
  },
  mounted: function() {
    setTimeout(() => {
      this.loading = false;
    }, 230);
  }
};
</script>
<style>
.iframe-container {
  height: calc(100vh - 84px);
}
</style>
