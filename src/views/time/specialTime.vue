<template>
  <div class="time">
    <div class="block">
      <span class="title1">选择年月日 时分秒</span>
      <el-date-picker
        v-model="value1"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </div>
    <div class="block">
      <span class="title1">选择年月日 时分</span>
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd hh:mm"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: [],
      value2: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.time {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.block {
    margin-bottom: 1.25rem;
  .title1 {
    margin-right: 1.25rem;
  }
}
</style>