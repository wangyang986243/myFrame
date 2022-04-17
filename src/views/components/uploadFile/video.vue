<template>
  <div class="upload-content">
    <!-- 上传视频 -->
    <el-card class="mb-3" shadow="never">
      <div
        class="mb-3"
        style="background-color: #f5f5f5; border: 1px solid #e1e1e1"
      >
        <video
          v-if="videoUrl"
          width="100%"
          height="240"
          controls
          :src="videoUrl"
        >
          您的浏览器不支持视频播放
        </video>
        <p
          v-if="!videoUrl"
          style="
            padding: 20px;
            color: #aaa;
            line-height: 1.5em;
            min-height: 120px;
          "
        >
          视频素材要求:
          <br />
          <span>视频素材：mp4,wmv,avi格式，分辨率≥720p,文件大小20M以内</span>
        </p>
        <el-progress
          v-if="videoUploading"
          :percentage="videoUploadPercent"
        ></el-progress>
      </div>
      <el-upload
        v-if="!justShow"
        class="upload-box"
        :headers="headers"
        accept=".mp4, .MP4, .wmv, .WMV, .avi, .AVI"
        :action="$Config.axiosBaseUrl + $Config.apiUrl.fileUpload"
        :on-progress="uploadVideoProcess"
        :before-upload="beforeVideoUpload"
        :on-error="handleError"
        :on-success="handleVideoSuccess"
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
  name: "upload-video",
  props: {
    fileUrl: String,
    justShow: Boolean,
  },
  data() {
    return {
      headers: {
        Authorization: Utils.getToken(),
        [Config.header["key"]]: Config.header["value"],
      },
      videoUrl: "",
      videoUploading: false,
      videoUploadPercent: 0,
    };
  },
  watch: {
    fileUrl: {
      handler(val) {
        this.videoUrl = val;
      },
      immediate: true,
    },
  },
  methods: {
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

    // 上传视频校验
    beforeVideoUpload(file) {
      NProgress.start();
      let _this = this;
      let isOk = false;
      if (file.type.indexOf("video") > -1) {
        //上传视频
        isOk = file.size / 1024 / 1024 < 20; // 视频不超过 20M
        if (!isOk) {
          this.$message.error("上传视频文件大小不能超过 20MB!");
        } else {
          _this.videoUploading = true;
        }
        NProgress.done();
        return isOk;
      } else {
        // 不支持其他类型
        this.$message.error("上传文件不匹配或不支持的文件类型");
        NProgress.done();
        return false;
      }
    },
    // 上传视频进度条
    uploadVideoProcess(event, file) {
      this.videoUploadPercent = parseInt(file.percentage.toFixed(0));
    },
    // 上传视频成功
    handleVideoSuccess(res, file) {
      NProgress.done();
      this.videoUploading = false;
      if (res.code === 0) {
        this.videoUploadPercent = parseInt(file.percentage.toFixed(0));
        this.videoUrl = res.data.dbFileUrl;
        this.$emit("upload-video-success", this.videoUrl);
        this.videoUploadPercent = 0;
      } else if (res.code == 20003) {
        this.$root.msgError("登录已失效, 请重新登录");
        this.$store.dispatch("FedLogOut").then(() => {
          setTimeout(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          }, 1000);
        });
      } else {
        this.$root.msgError(res.msg);
      }
    },
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
