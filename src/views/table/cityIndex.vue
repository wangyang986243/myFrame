<template>
  <div class="view-container" :model="form" label-width="80px">
    <el-form class="form" :inline="true">
      <el-form-item label="城市名称:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <div class="select">
      <div class="word-list">
        <div v-for="item in wordList" :key="item" @click="goIndex(item)">
          {{ item }}
        </div>
      </div>
      <div class="group-content">
        <div class="group-list-container" ref="groupRef">
          <div
            class="group-list"
            v-for="(item, index) in groupList"
            :key="index"
          >
            <div class="list-title" ref="titleRef">
              {{ item.title }}
            </div>
            <div
              class="city"
              v-for="(item1, index1) in item.children"
              :key="index1"
            >
              {{ item1.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      form: {},

      groupList: [
        {
          title: "A",
          children: [
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
            { name: "A区域" },
          ],
        },
        {
          title: "B",
          children: [
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
            { name: "B区域" },
          ],
        },
        {
          title: "C",
          children: [
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
            { name: "C区域" },
          ],
        },
        {
          title: "D",
          children: [
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
            { name: "D区域" },
          ],
        },
        {
          title: "E",
          children: [
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
            { name: "E区域" },
          ],
        },
        {
          title: "F",
          children: [
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
            { name: "F区域" },
          ],
        },
        {
          title: "G",
          children: [
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
            { name: "G区域" },
          ],
        },
        {
          title: "H",
          children: [
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
            { name: "H区域" },
          ],
        },
      ],
      checkList: [],
      wordList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
    };
  },
  methods: {
    goIndex(params) {
      console.log(params);
      const groupRef = this.$refs.groupRef || "";
      const titleRef = this.$refs.titleRef || "";
      titleRef.map((item) => {
        if (item.innerText === params) {
          groupRef.scrollTo({
            top: item.offsetTop,
            behavior: "smooth", // 平滑移动
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.view-container {
  position: relative;
  .form {
    width: 300px;
  }
  .select {
    display: flex;
    position: absolute;
    left: 70px;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 200px;
    .word-list {
      width: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 500px;
      font-size: 12px;
      font-weight: 400;
      color: #3e4451;
      div {
        text-align: center;
        cursor: pointer;
      }
    }
    .group-content {
      height: 500px;
      position: relative;
      flex: 1;
      .group-list-container {
        height: 100%;
        overflow: auto;
        padding-left: 19px;
        .group-list {
          margin-bottom: 16px;
          .list-title {
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: bold;
            color: #3e4451;
          }
        }
      }
    }
  }
}
</style>
