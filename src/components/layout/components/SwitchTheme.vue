<template>
  <ul class="theme-list">
    <!-- <li
      title="简约白"
      class="white"
      :class="{ active: themeVal == 'white' }"
      @click="changeTheme('white')"
    ></li> -->
    <li
      title="低调灰"
      class="gray"
      :class="{ active: themeVal == 'gray' }"
      @click="changeTheme('gray')"
    ></li>
    <li
      title="神秘黑"
      class="dark"
      :class="{ active: themeVal == 'dark' }"
      @click="changeTheme('dark')"
    ></li>
    <li
      title="酷炫蓝"
      class="blue"
      :class="{ active: themeVal == 'blue' }"
      @click="changeTheme('blue')"
    ></li>
    <!-- <li
      title="热情红"
      class="red"
      :class="{ active: themeVal == 'red' }"
      @click="changeTheme('red')"
    ></li> -->
  </ul>
</template>
<script>
import "@/assets/css/theme-white.css";
import "@/assets/css/theme-gray.css";
import "@/assets/css/theme-dark.css";
import "@/assets/css/theme-blue.css";
import "@/assets/css/theme-red.css";

// import { _post } from "@/axios/api";
export default {
  props: {
    userId: String,
  },
  data() {
    return {
      themeVal: "gray",
    };
  },
  methods: {
    //修改主题
    changeTheme(val) {
      this.themeVal = val;
      this.updateTheme();
    },
    //更新主题
    updateTheme() {
      document.getElementsByTagName("BODY")[0].className = this.themeVal;
      this.setThemeColor();
    },

    //将颜色主题存在本地
    setThemeColor() {
      this.$store.commit("SET_THEMECOLOR", this.themeVal);
      localStorage.setItem("themeColor", this.themeVal);
    },
  },
  mounted() {
    this.setThemeColor();
    document.getElementsByTagName("BODY")[0].className = this.themeVal;
  },
};
</script>
<style>
.theme-list {
  margin: 0;
  display: inline-block;
  list-style: none;
  vertical-align: middle;
}

.theme-list li {
  display: inline-block;
  vertical-align: middle;
  box-sizing: content-box;
  width: 12px;
  height: 12px;
  margin: 0 4px;
  background-color: #000;
  border: 0.5px solid #000;
  border-radius: 50%;
  cursor: pointer;
}

.theme-list li.white {
  background-color: #eee;
}

.theme-list li.gray {
  background-color: #777;
}

.theme-list li.dark {
  background-color: #222;
}

.theme-list li.blue {
  background-color: #007bff;
}

.theme-list li.red {
  background-color: rgb(236, 65, 77);
}

.theme-list li.active {
  border-color: #fff;
}
</style>