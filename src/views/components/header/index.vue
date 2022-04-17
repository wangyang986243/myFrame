<template>
  <el-header :class="createAdBtn ? 'header' : 'header'" height="60px">
    <router-link to="/" tag="h3" class="logo">
      <!-- <img src="./../../../assets/logo.png"> -->
      <span>{{ title }}</span>
    </router-link>
    <router-link class="user-info" to="/account" tag="h3">
      <i class="fa fa-user"></i>
      <span>{{ user && user.mobileTel }}</span>
    </router-link>

    <router-link
      class="float-right link"
      v-if="createAdBtn"
      tag="a"
      to="/create-ad"
    >
      <i class="el-icon-edit-outline"></i> 信息公告创建
    </router-link>
    <el-select
      v-model="themeVal"
      placeholder="请选择"
      size="mini"
      class="float-right mt-3"
      style="width: 100px"
      @change="changeTheme"
    >
      <el-option
        v-for="item in themeList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </el-header>
</template>
<script>
export default {
  name: "msHeader",
  props: {
    //   title: {
    //     type: String,
    //     required: true
    //   },
    createAdBtn: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      title: "信息公告管理平台",
      //编辑布局
      isDraggable: false,
      //主题
      themeVal: "",
      user: null,
      themeList: [
        {
          value: "default",
          label: "默认主题",
        },
        {
          value: "dark",
          label: "深色主题",
        },
      ],
    };
  },
  methods: {
    //修改主题
    changeTheme(val) {
      this.$store.commit("SET_THEME", val);
    },
    logout() {
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("Logout")
            .then((res) => {
              if (this.$root.handleRes(res, true, "退出成功！")) {
                location.reload();
                this.$router.push({ path: "/login" });
              }
            })
            .catch((err) => {
              this.$root.sysError(err);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.user = this.$store.getters.user;
  },
  mounted() {
    this.themeVal = this.$store.getters.theme;
  },
};
</script>
<style>
.header {
  background: linear-gradient(to right, #0063e5, #00ffc7);
  font-size: 14px;
}
.logo {
  float: left;
  margin-top: 15px;
  margin-right: 50px;
  font-weight: normal;
  cursor: pointer;
}

.logo img {
  float: left;
  height: 30px;
  margin-right: 5px;
}

.logo span {
  float: left;
  font-size: 20px;
  line-height: 30px;
}

.nav-list {
  display: inline-block;
  margin: 0;
  padding: 0;
}

.nav-list li {
  display: inline-block;
}

.nav-list li + li {
  margin-left: 1em;
}

.nav-list li a {
  text-decoration: none;
}

.header .link {
  height: 60px;
  margin: 0 -20px 0 30px;
  padding: 0 30px;
  line-height: 60px;
}

.header .link i {
  margin-right: 3px;
  font-size: 24px;
  vertical-align: middle;
}

.home::before {
  background-color: rgba(0, 138, 222, 0.5);
}

.header {
  color: #666;
  /* background: linear-gradient(#008ade, #00d8ce); */
}

.header .logo {
  color: #00ffc7;
}

.header .nav-list li {
  color: #444;
}

.header .nav-list li a {
  color: #444;
}

.header .nav-list li a:hover {
  color: #444;
}

.header .user-info {
  color: #fff;
  float: left;
  line-height: 60px;
  cursor: pointer;
}

.header .link {
  color: #fff;
  text-decoration: none;
  background-color: rgba(0, 99, 229, 0.7);
}

.header .link:hover {
  background-color: rgba(0, 99, 229, 0.8);
}

.header .link i {
  color: rgba(255, 255, 255, 0.5);
}
</style>
