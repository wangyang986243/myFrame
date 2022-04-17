<template>
  <chart
    :options="chartAgeOptions"
    autoresize
    class="w-100 h-100"
    ref="chartAgeOptions"
  />
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";
let axisSplitLine = {
  lineStyle: {
    show: false,
    color: "#FFFFFF",
    type: "dashed",
    opacity: 0.14,
  },
};
export default {
  props: {
    zddqryList: {
      type: Array,
    },
  },
  watch: {
    zddqryList: {
      handler(val) {
        this.chartAgeOptions.xAxis.data = Array.from(
          new Set(val.map((item) => item.fMonth))
        );
        this.chartAgeOptions.series[0].data = val.map((item) => {
          return item.xzl;
        });
        this.chartAgeOptions.series[1].data = val.map((item) => {
          return item.cll;
        });
      },
      deep: true,
      immediate: false,
    },
  },
  data() {
    return {
      chartAgeOptions: {},
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
        color: ["#108AAA", "#BA7800"],
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["新增量", "处理量"],
          itemWidth: 8,
          itemHeight: 8,
          right: "0%",
          backgroundColor: "transparent",
          textStyle: {
            color: "#DADADA",
            fontSize: this.fontSize(0.12),
          },
        },
        grid: {
          top: "13%",
          left: "5%",
          right: "10%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: {
          name: `月`,
          nameLocation: "end",
          nameTextStyle: {
            color: "#DADADA",
            fontSize: this.fontSize(0.12),
          },
          type: "category",
          axisLabel: {
            color: "#DADADA",
            fontSize: this.fontSize(0.12),
          },
          data: [],
          axisTick: {
            alignWithLabel: true,
            show: true,
            lineStyle: {
              color: "#696969",
            },
          },
        },
        yAxis: [
          {
            name: `单位 \n(个)`,
            nameLocation: "end",
            axisLine: {
              show: false,
            },
            nameTextStyle: {
              padding: [0, 0, 0, -25],
              align: "left",
              color: "#959595",
              fontSize: this.fontSize(0.12),
            },
            axisTick: {
              show: false,
            },
            type: "value",
            axisLabel: {
              color: "#ffffff",
              fontSize: this.fontSize(0.12),
            },
            splitLine: axisSplitLine,
          },
        ],
        series: [
          {
            name: "新增量",
            type: "bar",
            barWidth: "15%",
            data: [],
            itemStyle: {
              normal: {
                barBorderRadius: [3, 3, 0, 0],
                color: new echarts.graphic.LinearGradient(1, 0.8, 0.4, 0, [
                  { offset: 0, color: "#00273F" }, //柱图渐变色
                  //柱图渐变色
                  { offset: 1, color: "#108AAA" }, //柱图渐变色
                ]),
              },
            },
          },
          {
            name: "处理量",
            type: "bar",
            barWidth: "15%",
            data: [],
            itemStyle: {
              normal: {
                barBorderRadius: [3, 3, 0, 0],
                color: new echarts.graphic.LinearGradient(1, 0.8, 0.4, 0, [
                  { offset: 0, color: "#3F1700" }, //柱图渐变色
                  //柱图渐变色
                  { offset: 1, color: "#BA7800" }, //柱图渐变色
                ]),
              },
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="stylus"></style>