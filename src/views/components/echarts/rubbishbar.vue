<template>
  <div class="card mt-card">
    <chart
      :options="chartAgeOptions"
      autoresize
      class="w-100 h-100"
      ref="chartAgeOptions"
    />
  </div>
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
          new Set(val.map((item) => item.countDate))
        );
        let arr1 = [
          { name: "可回收", data: [], type: "line" },
          { name: "有害", data: [], type: "line" },
          { name: "易腐", data: [], type: "line" },
          { name: "其他", data: [], type: "line" },
        ];
        for (let i = 0; i < val.length; i++) {
          if (val[i].trashtypename === "1") {
            arr1[0].data.push(val[i].sumWeight);
          } else if (val[i].trashtypename === "2") {
            arr1[1].data.push(val[i].sumWeight);
          } else if (val[i].trashtypename === "3") {
            arr1[2].data.push(val[i].sumWeight);
          } else {
            arr1[3].data.push(val[i].sumWeight);
          }
        }
        this.chartAgeOptions.series[0].data = arr1[0].data; //可回收
        this.chartAgeOptions.series[3].data = arr1[1].data; //有害
        this.chartAgeOptions.series[1].data = arr1[2].data; //易腐
        this.chartAgeOptions.series[2].data = arr1[3].data; //其他
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
        animationDuration: function (idx) {
          // 越往后的数据时长越大
          return 1500;
        },
        animationDurationUpdate: function (idx) {
          // 越往后的数据时长越大
          return 1500;
        },
        // color: ["#FFA502", "#1890FF", "#29C9C9","#F33A3A"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["可回收", "易腐", "其他", "有害"],
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
          top: "20%",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#FFFFFF",
            fontSize: this.fontSize(0.14),
            rotate: 38,
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
            name: `单位 \n(KG)`,
            nameLocation: "end",
            axisLine: {
              show: false,
            },
            nameTextStyle: {
              padding: [0, 0, 0, -32],
              align: "left",
              color: "#959595",
              fontSize: this.fontSize(0.1),
            },
            axisTick: {
              show: false,
            },
            type: "value",
            axisLabel: {
              color: "#ffffff",
              fontSize: this.fontSize(0.14),
            },
            splitLine: axisSplitLine,
          },
        ],
        series: [
          {
            name: "可回收",
            type: "bar",
            barWidth: "15%",
            data: [],
            itemStyle: {
              normal: {
                barBorderRadius: [6, 6, 0, 0],
                color: new echarts.graphic.LinearGradient(1, 0.8, 0.4, 0, [
                  { offset: 0, color: "#00273F" }, //柱图渐变色
                  //柱图渐变色
                  { offset: 1, color: "#0068FF" }, //柱图渐变色
                ]),
              },
            },
          },
          {
            name: "易腐",
            type: "bar",
            barWidth: "15%",
            data: [],
            itemStyle: {
              normal: {
                barBorderRadius: [6, 6, 0, 0],
                color: new echarts.graphic.LinearGradient(1, 0.8, 0.4, 0, [
                  { offset: 0, color: "#00273F" }, //柱图渐变色
                  //柱图渐变色
                  { offset: 1, color: "#10AA9A" }, //柱图渐变色
                ]),
              },
            },
          },
          {
            name: "其他",
            type: "bar",
            barWidth: "15%",
            data: [],
            itemStyle: {
              normal: {
                barBorderRadius: [6, 6, 0, 0],
                color: new echarts.graphic.LinearGradient(1, 0.8, 0.4, 0, [
                  { offset: 0, color: "#3F1700" }, //柱图渐变色
                  //柱图渐变色
                  { offset: 1, color: "#BA7800" }, //柱图渐变色
                ]),
              },
            },
          },
          {
            name: "有害",
            type: "bar",
            barWidth: "15%",
            data: [],
            itemStyle: {
              normal: {
                barBorderRadius: [6, 6, 0, 0],
                color: new echarts.graphic.LinearGradient(1, 0.8, 0.4, 0, [
                  { offset: 0, color: "#3F002B" }, //柱图渐变色
                  //柱图渐变色
                  { offset: 1, color: "#F94343" }, //柱图渐变色
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