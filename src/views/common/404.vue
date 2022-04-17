<template>
  <div class="my404">
    <div class="img">
      <img :src="bgUrl" alt="背景图" />
    </div>
    <div class="text">
      <h1 class="text-danger">404...</h1>
      <h2 class="text-info">找不到该地址，请检查您的地址路径……</h2>
      <el-button
        type="primary"
        @click="
          () => {
            this.$router.replace({ path: '/' });
          }
        "
        size="small"
        >回到首页</el-button
      >
      <el-button @click="reLogin" size="small">重新登录</el-button>
    </div>
  </div>
</template>

<script>
import bgUrl from "@/assets/images/404.jpg";

export default {
  data() {
    return {
      bgUrl: bgUrl,
    };
  },
  methods: {
    reLogin() {
      this.$Utils.removeToken();
      this.$router.replace({
        path: "/login",
      });
    },
  },
};
</script>

<style>
/* 404 */
.my404 {
  width: 900px;
  margin: 80px auto;
  background-size: cover;
}

.my404 .img {
  float: left;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  overflow: hidden;
}

.my404 .img img {
  width: auto;
  height: 100%;
}

.my404 .text {
  margin-left: 320px;
}

.my404 .text h1 {
  margin: 0.1rem 0 1.5rem;
  font-size: 5rem;
}

.my404 .text h2 {
  margin-bottom: 2rem;
  font-weight: normal;
}
</style>
