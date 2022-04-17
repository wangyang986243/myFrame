<template>
  <div>
    <el-menu class="navbar flexRFSC" mode="horizontal">
      <hamburger
        :toggle-click="toggleSideBar"
        :is-active="sidebar.opened"
        class="hamburger-container"
      />
      <div
        class="logo"
        style="
          width: 170px;
          flex: 1;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          line-height: 25px;
        "
      >
        框架结构
      </div>

      <!-- 选择主题 -->
      <switch-theme></switch-theme>
      <!-- 搜索框 -->
      <div class="searchInput" style="margin-right: 2rem">
        <i @click="search" class="el-icon-search"></i>
        <el-input
          @clear="clear"
          @keyup.enter.native="search"
          placeholder="一键快搜"
          v-model="searchInput"
          clearable
        ></el-input>
      </div>
      <!-- 用户名 -->
      <el-dropdown
        class="avatar-container"
        trigger="click"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
        "
      >
        <div class="avatar-wrapper">
          <div
            class="mr-2"
            style="
              height: 20px;
              font-family: PingFangSC-Medium, PingFang SC;
              line-height: 20px;
              display: inline-block;
            "
          >
            你好,{{ cnname ? cnname : name }}
          </div>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided>
            <span style="display: block" @click="resetPwd">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display: block" @click="dialogVisible = true"
              >退出登录</span
            >
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <ResetPwd ref="resetPwd"></ResetPwd>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
      <span>是否确认退出登录？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import ResetPwd from "@/views/components/resetPwd";

import Hamburger from "@/components/Hamburger";
import bitbug from "@/assets/images/bitbug.png";
import Bus from "../../bus/bus";
import store from "@/store";

import SwitchTheme from "./SwitchTheme.vue";

export default {
  data() {
    return {
      searchInput: "",
      dialogVisible: false,
      bitbug,
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
    ResetPwd,
    SwitchTheme,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name", "cnname"]),
    currentColor() {
      return this.$store.state.themeColor.themeColor;
    },
  },
  methods: {
    search() {
      this.$router.push({ name: "onePersonOneFile" });
      sessionStorage.setItem("searchInput", this.searchInput);
      //为了再实有人口处触发
      Bus.$emit("search", this.searchInput);
    },

    clear() {
      Bus.$emit("search", this.searchInput);
    },

    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },

    async logout() {
      this.dialogVisible = false;
      const arg = {
        url: this.$Config.apiUrl.authLogout,
      };
      const { result } = await this.$Axios._post(arg);
      if (this.$root.handleRes(result, true, "退出成功")) {
        this.$store.dispatch("FedLogOut").then(() => {
          setTimeout(() => {
            // window.location.reload(); // 为了重新实例化vue-router对象 避免bug
            // window.location.href = "https://jh-dev.meishutech.com:18089/jh/#/login";
            this.$router.replace({
              path: "/login",
            });
          }, 1000);
        });
      }
    },

    resetPwd() {
      this.$refs["resetPwd"].init();
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  // background-color: #1B1D29;
  // color: #D9DAE0;

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .breadcrumb-container {
    float: left;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }

  .avatar-container {
    height: 50px;
    margin-right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      line-height: initial;

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .user-mobile {
        line-height: 50px;
        color: #409eff;
      }

      .el-icon-caret-bottom {
        display: inline-block;
      }
    }
  }

  .searchInput {
    position: relative;
    .el-input {
      width: 14.25rem !important;
      height: 2rem !important;
    }
    .el-input__inner::placeholder {
      font-size: 1rem;
      height: 1.25rem;
      font-weight: 400;
      position: relative;
    }
    .el-icon-search {
      position: absolute;
      top: 0.95rem;
      right: 1.5625rem;
      display: inline-block;
      height: 1rem;
      width: 1rem;
      font-size: 1rem;
      z-index: 9;
    }
  }
}
</style>
