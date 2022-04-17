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
    color: "#FFFFFF",
    type: "dashed",
    opacity: 0.14,
  },
};
export default {
  props: {
    educationStat: {
      type: Array,
      default: [],
    },
    unit: {
      type: String,
      default: "单位 (百人)",
    },
  },
  watch: {
    educationStat: {
      handler(val) {
        let arr = val.map((item) => {
          return item.date;
        });
        this.chartAgeOptions.xAxis.data = arr; //.reverse()
        this.chartAgeOptions.series.data = val.map((item) => {
          return item.value;
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
        animationDuration: function (idx) {
          // 越往后的数据时长越大
          return 1500;
        },
        animationDurationUpdate: function (idx) {
          // 越往后的数据时长越大
          return 1500;
        },
        color: ["#3398DB"],
        grid: {
          top: "15%",
          left: "3%",
          right: "4%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#DADADA",
            fontSize: this.fontSize(0.14),
          },
          data: [],
          axisTick: {
            alignWithLabel: true,
            show: false,
            lineStyle: {
              color: "#DADADA",
            },
          },
        },
        yAxis: [
          {
            name: this.unit,
            nameLocation: "end",
            nameTextStyle: {
              align: "left",
              color: "#FFFFFF",
              fontSize: this.fontSize(0.14),
            },
            type: "value",
            axisLabel: {
              color: "#DADADA",
              fontSize: this.fontSize(0.14),
            },
            splitLine: axisSplitLine,
          },
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
                { offset: 1, color: "#108AAA" }, //柱图渐变色
              ]),
              label: {
                show: true,
                position: "top",
                textStyle: {
                  //数值样式
                  color: "#21CBFF",
                  fontSize: this.fontSize(0.14),
                },
              },
            },
          },
        },
      };
    },
  },
};
</script>

<style lang="stylus"></style>