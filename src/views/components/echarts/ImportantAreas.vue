<template>
  <div class="card mt-card">
    <chart :options="chartAgeOptions" autoresize class="w-100 h-100" ref="chartAgeOptions" />
  </div>
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";
let axisSplitLine = {
  lineStyle: {
    color: "#FFFFFF",
    type: "dashed",
    opacity: 0.14
  }
};
export default {
  props: {
    zddqryList: {
      type: Array
    }
  },
  watch: {
    zddqryList: {
      handler(val) {
        this.chartAgeOptions.xAxis.data = val.map(item => item.countItemsName);
        this.chartAgeOptions.series.data = val.map(item => item.countNum);
      },
      deep: true,
      immediate: false
    }
  },
  data() {
    return {
      chartAgeOptions: {}
    };
  },
  mounted() {
    this.initOptions();
  },
  methods: {
    fontSize(res) {
      let docEl = document.documentElement,
        clientWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
    },
    initOptions() {
      this.chartAgeOptions = {
        animationDuration: function(idx) {
          // 越往后的数据时长越大
          return 1500;
        },
        animationDurationUpdate: function(idx) {
          // 越往后的数据时长越大
          return 1500;
        },
        color: ["#3398DB"],
        grid: {
          top: "8%",
          left: "0%",
          right: "4%",
          bottom: "-6%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#FFFFFF",
            fontSize: this.fontSize(0.14),
            rotate: 38
          },
          data: [],
          axisTick: {
            alignWithLabel: true,
            show: true,
            lineStyle: {
              color: "#696969"
            }
          }
        },
        yAxis: [
          {
            name: `单位 (百人)`,
            nameLocation: "end",
            nameTextStyle: {
              align: "left",
              color: "#FFFFFF",
              fontSize: this.fontSize(0.14)
            },
            type: "value",
            axisLabel: {
              color: "#ffffff",
              fontSize: this.fontSize(0.14)
            },
            splitLine: axisSplitLine
          }
        ],
        series: {
          name: "学历",
          type: "bar",
          barWidth: "20%",
          data: [],
          itemStyle: {
            normal: {
              barBorderRadius: [6, 6, 0, 0],
              color: new echarts.graphic.LinearGradient(1, 0.8, 0.4, 0, [
                { offset: 0, color: "#00273F" }, //柱图渐变色
                //柱图渐变色
                { offset: 1, color: "#108AAA" } //柱图渐变色
              ]),
              label: {
                show: true,
                position: "top",
                textStyle: {
                  //数值样式
                  color: "#21CBFF",
                  fontSize: this.fontSize(0.14)
                }
              }
            }
          }
        },
      };
    }
  }
};
</script>

<style lang="stylus"></style>