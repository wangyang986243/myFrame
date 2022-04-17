<script>
export default {
  methods: {
    formatBool(val) {
      const values = {
        0: "否",
        1: "是",
        false: "否",
        true: "是",
      };
      return values[val];
    },

    hasAuth(key) {
      let authBtn = this.$store.getters.btns;
      return authBtn[key] || "";
    },

    // message 信息提示
    msgSuccess(message) {
      this.$message.success({
        message: message,
      });
    },

    msgError(message) {
      this.$message.error({
        message: message,
      });
    },

    msgWarning(message) {
      this.$message.warning({
        message: message,
      });
    },

    msgInfo(message) {
      this.$message.info({
        message: message,
      });
    },

    // 表单验证未通过
    validWarning(msg = "请检查您的输入") {
      this.msgWarning(msg);
    },

    // 请求返回后的回调处理
    handleRes(result, show, message = "操作成功") {
      if (result.code === 0) {
        show && this.msgSuccess(message);
        return true;
      } else {
        this.msgError(result.msg);
        return false;
      }
    },
    // 请求失败
    sysError(error) {
      this.msgError(error);
    },
  },
};
</script>

<style>
</style>
