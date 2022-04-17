<template>
  <div>
    <div class="tag flexCCC">
      <div>{{ dateArr[selectIndex] }}</div>
      <div class="line"></div>
    </div>
    <div ref="ruler" class="ruler" @mousemove="stopAutoScroll">
      <div class="rule-hook" ref="ruleHook">
        <template v-for="(item, index) in dateArr">
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
    startDate: {
      type: String,
      default: "2020-05-01",
    },
    endDate: {
      type: String,
      default: "2020-05-11",
    },
    autoScro: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      oneWidth: 0,
      selectIndex: 8,
    };
  },
  computed: {
    dateArr: function () {
      let _startDate = new Date(Date.parse(this.startDate));
      _startDate.setDate(_startDate.getDate() - 20);
      let _endDate = new Date(Date.parse(this.endDate));
      _endDate.setDate(_endDate.getDate() + 8);

      let dateArr = [];
      while (_startDate.getTime() <= _endDate.getTime()) {
        dateArr.push(
          _endDate.getFullYear() +
            this.lpad(_endDate.getMonth() + 1, 2, "0") +
            this.lpad(_endDate.getDate(), 2, "0")
        );
        _endDate.setDate(_endDate.getDate() - 1);
      }
      return dateArr;
    },
  },
  watch: {
    autoScro: {
      handler(val) {
        if (val) {
          this.autoScroll();
        } else {
          this.stopAutoScroll();
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.initRuler();
    this.calculateWidth();
    //this.autoScroll();
  },
  methods: {
    autoScroll() {
      this.interval = setInterval(() => {
        this.selectIndex = this.selectIndex + 1;
        if (this.selectIndex >= this.dateArr.length - 20) {
          this.selectIndex = 8;
        }
        this.scrollrule.scrollTo(
          -this.oneWidth * (this.selectIndex - 8),
          0,
          500
        );
      }, 10000);
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
      if (this.autoScro) {
        this.reAuto = setTimeout(() => {
          this.autoScroll();
        }, 10000);
      }
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

        if (this.selectIndex >= this.dateArr.length - 20) {
          this.selectIndex = this.dateArr.length - 20;
        }
      });

      //滚动结束监听
      this.scrollrule.on("scrollEnd", (pos) => {
        this.scrollX = Math.abs(Math.round(pos.x));
        this.selectIndex =
          Math.abs(Math.round(this.scrollX / this.oneWidth)) + 8;

        if (this.selectIndex >= this.dateArr.length - 20) {
          this.selectIndex = this.dateArr.length - 20;
        }
        this.$emit("dateChange", this.dateArr[this.selectIndex]);
      });
    },
    // 获取宽度用于计算滚动区域
    calculateWidth() {
      // 获取右侧菜单每一个的li
      let goodsList = this.$refs.ruleHook;
      let listWidth = goodsList.clientWidth;
      // 每一格的距离大小
      this.oneWidth = listWidth / this.dateArr.length;
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