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
          return item.name;
        });
        this.chartAgeOptions.xAxis.data = arr; //.reverse()
        this.chartAgeOptions.series.data = val.map((item) => {
          return item.value;
        });
      },
      deep: true,
      immediate: false,
    },
    unit: {
      handler(val) {},
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
        color: ["#3398DB"],
        grid: {
          top: "20%",
          left: "3%",
          right: "14%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: {
          name: "km",
          nameLocation: "end",
          type: "category",
          axisLabel: {
            color: "#DADADA",
            fontSize: this.fontSize(0.12),
          },
          nameTextStyle: {
            align: "left",
            color: "#949494",
            fontSize: this.fontSize(0.12),
          },
          data: [],
          axisTick: {
            alignWithLabel: true,
            show: true,
            lineStyle: {
              color: "#FFFFFF",
              fontSize: this.fontSize(0.12),
            },
          },
        },
        yAxis: [
          {
            name: `单位\n(千人)`,
            nameLocation: "end",
            nameTextStyle: {
              padding: [0, 0, 0, -28],
              align: "left",
              color: "#949494",
              fontSize: this.fontSize(0.12),
            },
            type: "value",
            axisLabel: {
              color: "#FFFFFF",
              fontSize: this.fontSize(0.12),
            },
            splitLine: axisSplitLine,
          },
        ],
        series: {
          //   name: "学历",
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
                  fontSize: this.fontSize(0.12),
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