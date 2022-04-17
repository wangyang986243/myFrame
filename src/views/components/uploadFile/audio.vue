<template>
  <div class="upload-content">
    <!-- 上传音频 -->
    <el-card class="mb-3" shadow="never">
      <div class="mb-3" style>
        <audio v-if="audioUrl" width="100%" :src="audioUrl" controls="controls">
          您的浏览器不支持该音频
        </audio>
        <p
          v-if="!audioUrl"
          style="
            background-color: #f5f5f5;
            border: 1px solid #e1e1e1;
            padding: 20px;
            color: #aaa;
            line-height: 1.5em;
            min-height: 120px;
          "
        >
          音频素材要求:
          <br />
          <span>音频素材：mp3格式,文件大小在3MB内</span>
        </p>
        <el-progress
          v-if="audioUploading"
          :percentage="audioUploadPercent"
        ></el-progress>
      </div>
      <el-upload
        v-if="!justShow"
        class="upload-box"
        :headers="headers"
        accept=".mp3, .MP3"
        :action="$Config.axiosBaseUrl + $Config.apiUrl.fileUpload"
        :on-progress="uploadAudioProcess"
        :before-upload="beforeAudioUpload"
        :on-error="handleError"
        :on-success="handleAudioSuccess"
      >
        <el-button plain slot="trigger" size="mini" icon="el-icon-upload"
          >本地上传</el-button
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
  name: "upload-audio",
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
      audioUrl: "",
      audioUploading: false,
      audioUploadPercent: 0,
    };
  },
  watch: {
    fileUrl: {
      handler(val) {
        this.audioUrl = val;
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
    // 上传音频
    beforeAudioUpload(file) {
      NProgress.start();
      let _this = this;
      let isOk = false;
      if (file.type.indexOf("audio") > -1) {
        //上传音频大小
        isOk = file.size / 1024 / 1024 < 3;
        if (!isOk) {
          this.$message.error("上传音频文件大小不能超过 3MB!");
        } else {
          _this.audioUploading = true;
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
    uploadAudioProcess(e, file) {
      this.audioUploadPercent = parseInt(file.percentage.toFixed(0));
    },
    handleAudioSuccess(res, file) {
      NProgress.done();
      this.audioUploading = false;
      if (res.code === 0) {
        this.audioUploadPercent = parseInt(file.percentage.toFixed(0));
        this.audioUrl = res.data.dbFileUrl;
        this.$emit("upload-audio-success", this.audioUrl);
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
