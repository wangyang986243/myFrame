<template>
  <div>
    <div class="tag flexCCC">
      <div>{{ timeArr[selectIndex] }}</div>
      <div class="line"></div>
    </div>
    <div ref="ruler" class="ruler" @mousemove="stopAutoScroll">
      <div class="rule-hook" ref="ruleHook">
        <template v-for="(item, index) in timeArr">
          <li class="cs-scroll-item" :key="index">
            <div class="flexCFEC item">
              <div class="line2" v-if="index % 5 == 0"></div>
              <div class="line3" v-else></div>
              <div class="bottom"></div>
            </div>
          </li>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "ruler",
  props: {
    startTime: {
      type: String,
      default: "2020-05-11 06:00:00",
    },
    endTime: {
      type: String,
      default: "2020-05-11 23:00:00",
    },
  },
  watch: {
    startTime: {
      handler(val) {},
      deep: true,
    },
  },
  data() {
    return {
      oneWidth: 0,
      selectIndex: 8,
    };
  },
  computed: {
    timeArr: function () {
      let _startTime = new Date(Date.parse(this.startTime));
      _startTime.setHours(_startTime.getHours() - 4);
      let _endTime = new Date(Date.parse(this.endTime));
      _endTime.setHours(_endTime.getHours() + 10);

      let timeArr = [];
      while (_startTime.getTime() <= _endTime.getTime()) {
        timeArr.push(
          this.lpad(_startTime.getHours(), 2, "0") +
            ":" +
            this.lpad(_startTime.getMinutes(), 2, "0")
        );
        _startTime.setMinutes(_startTime.getMinutes() + 60);
      }
      return timeArr;
    },
  },
  mounted() {
    this.initRuler();
    this.calculateWidth();
    this.autoScroll();
  },
  methods: {
    autoScroll() {
      this.interval = setInterval(() => {
        this.selectIndex = this.selectIndex + 1;
        if (this.selectIndex >= this.timeArr.length - 20) {
          this.selectIndex = 8;
        }
        this.scrollrule.scrollTo(
          -this.oneWidth * (this.selectIndex - 8),
          0,
          500
        );
      }, 6000);
    },
    stopAutoScroll() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
      if (this.reAuto) {
        clearTimeout(this.reAuto);
        this.reAuto = null;
      }
      this.reAuto = setTimeout(() => {
        this.autoScroll();
      }, 10000);
    },
    lpad(str, len, pad) {
      let _str = str + "";
      if (_str.length < len) {
        _str = pad + _str;
      }
      return _str;
    },
    test() {},
    initRuler() {
      this.scrollrule = new BScroll(this.$refs.ruler, {
        // 实时监听滚动的位置并返回
        probeType: 3,
        scrollX: true,
      });
      // 监听滚动开始
      this.scrollrule.on("scrollStart", (pos) => {});

      // 监听滚动
      this.scrollrule.on("scroll", (pos) => {
        this.scrollX = Math.abs(Math.round(pos.x));
        this.selectIndex =
          Math.abs(Math.round(this.scrollX / this.oneWidth)) + 8;

        if (this.selectIndex >= this.timeArr.length - 20) {
          this.selectIndex = this.timeArr.length - 20;
        }
      });

      //滚动结束监听
      this.scrollrule.on("scrollEnd", (pos) => {
        this.scrollX = Math.abs(Math.round(pos.x));
        this.selectIndex =
          Math.abs(Math.round(this.scrollX / this.oneWidth)) + 8;

        if (this.selectIndex >= this.timeArr.length - 20) {
          this.selectIndex = this.timeArr.length - 20;
        }
        this.$emit("timeChange", this.timeArr[this.selectIndex]);
      });
    },
    // 获取宽度用于计算滚动区域
    calculateWidth() {
      // 获取右侧菜单每一个的li
      let goodsList = this.$refs.ruleHook;
      let listWidth = goodsList.clientWidth;
      // 每一格的距离大小
      this.oneWidth = listWidth / this.timeArr.length;
    },
  },
};
</script>
<style scoped>
:root {
  --scale: 1;
}
.ruler {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.tag {
  position: absolute;
  top: 0;
  left: 40%;
  font-size: 1rem;
  color: #33d0fa;
}
.line {
  height: 1.5rem;
  width: 0.11rem;
  background-color: #33d0fa;
}
.line2 {
  height: 1rem;
  width: 0.11rem;
  background-color: #33d0fa;
}
.line3 {
  height: 0.5rem;
  width: 0.11rem;
  background-color: #33d0fa;
}
.rule-hook {
  margin-top: 3rem;
  list-style: none;

  border-collapse: collapse;
  white-space: nowrap;
  display: inline-block;
}
.cs-scroll-item {
  display: inline-block;
  width: 1rem;
  height: 2rem;
  text-align: end;
  vertical-align: bottom;
}
.item {
  width: 1rem;
  height: 2rem;
}

.bottom {
  width: 1rem;
  height: 0.16rem;
  border-bottom: 0.16rem solid #33d0fa;
}
</style>