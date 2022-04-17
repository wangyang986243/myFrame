<template>
  <div class="upload-content">
    <!-- 上传图片 -->
    <el-card class="mb-3" shadow="never">
      <div
        class="mb-3"
        style="background-color: #f5f5f5; border: 1px solid #e1e1e1"
      >
        <img v-if="imgUrl" width="100%" :src="imgUrl" alt="素材" />
        <p
          v-if="!imgUrl"
          style="
            padding: 20px;
            color: #aaa;
            line-height: 1.5em;
            min-height: 120px;
          "
        >
          图片素材要求:
          <br />
          <span>
            图片尺寸：{{ width }}px * {{ height }}px
            <br />
            <span>图片素材：jpg/png格式,文件大小在300KB内</span>
          </span>
        </p>
        <el-progress
          v-if="imgUploading"
          :percentage="imgUploadPercent"
        ></el-progress>
      </div>
      <el-upload
        v-if="!justShow"
        class="upload-box"
        :headers="headers"
        accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG"
        :action="$Config.axiosBaseUrl + $Config.apiUrl.fileUpload"
        :on-progress="uploadImgProcess"
        :before-upload="beforeImgUpload"
        :on-error="handleError"
        :on-success="handleImgSuccess"
      >
        <el-button plain slot="trigger" size="mini" icon="el-icon-upload"
          >本地上传</el-button
        >
        <el-button plain icon="el-icon-picture" size="mini" class="ml-2"
          >素材库</el-button
        >
        <el-button
          plain
          icon="el-icon-menu"
          size="mini"
          @click="openDialogLibrary"
          >模板库</el-button
        >
      </el-upload>
    </el-card>
  </div>
</template>
<script>
import NProgress from "nprogress"; // Progress 进度条
import Utils from "@/utils";
import Config from "@/config";

export default {
  name: "upload-image",
  props: {
    fileUrl: String,
    width: String,
    height: String,
    justShow: Boolean,
  },
  data() {
    return {
      headers: {
        Authorization: Utils.getToken(),
        [Config.header["key"]]: Config.header["value"],
      },
      imgUrl: "",
      imgUploading: false,
      imgUploadPercent: 0,
    };
  },
  watch: {
    fileUrl: {
      handler(val) {
        this.imgUrl = val;
      },
      immediate: true,
    },
  },
  methods: {
    // 上传图片检验
    beforeImgUpload(file) {
      NProgress.start();
      let _this = this;
      let isOk = false;
      if (file.type.indexOf("image") > -1) {
        // 上传图片 先看大小
        isOk = file.size / 1024 < 300; // 300kb
        if (!isOk) {
          this.$message.error("上传图片文件大小不能超过 300K!");
          NProgress.done();
          return isOk;
        } else {
          // 看图片尺寸
          return new Promise((resolve, reject) => {
            let _URL = window.URL || window.webkitURL;
            let img = new Image();
            img.onload = () => {
              if (
                [parseInt(this.width) / parseInt(this.height)].includes(
                  img.width / img.height
                )
              ) {
                resolve();
              } else {
                reject();
              }
            };
            img.src = _URL.createObjectURL(file);
          }).then(
            // 接收成功
            () => {
              NProgress.done();
              _this.uploading = true;
              return file;
            },
            // 接收失败
            () => {
              _this.$message.error("您上传的图片尺寸不符合要求, 请重新上传");
              NProgress.done();
              return Promise.reject();
            }
          );
        }
      } else {
        // 不支持其他类型
        this.$message.error("上传文件不匹配或不支持的文件类型");
        NProgress.done();
        return false;
      }
    },
    // 图片进度条
    uploadImgProcess(event, file) {
      this.imgUploadPercent = parseInt(file.percentage.toFixed(0));
    },

    // 上传图片成功回调
    handleImgSuccess(res, file) {
      NProgress.done();
      this.imgUploading = false;
      if (res.code === 0) {
        this.imgUploadPercent = parseInt(file.percentage.toFixed(0));
        this.imgUrl = res.data.dbFileUrl;
        this.$emit("upload-img-success", this.imgUrl);
        this.imgUploadPercent = 0;
      } else if (res.code == 20003) {
        this.$root.msgError("登录已失效, 请重新登录");
        this.$store.dispatch("FedLogOut").then(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      } else {
        this.$root.msgError(res.msg);
      }
    },
    // 上传失败
    handleError(err) {
      if (err.status == 401) {
        this.$root.msgError("登录已失效, 请重新登录");
        this.$store.dispatch("FedLogOut").then(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      } else if (err.status == 200) {
        console.log(err);
      }
    },
    //模板库选择
    openDialogLibrary() {},
  },
};
</script>
<style>
.upload-content {
  width: 100%;
}
.upload-box {
  width: 98%;
}

.upload-box .el-upload-list {
  display: none;
}
</style>
