<template>
  <chart
    class="w-100 h-100"
    :options="chartPeopleInCountry"
    autoresize
    ref="chartAgeOptions"
  />
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";
//标题风格
let titleTextStyle = {
  color: "#FFFFFF",
  fontWeight: "normal",
  fontSize: 17,
  fontFamily: "monospace",
};

//坐标线
let axisLineStyle = {
  lineStyle: {
    color: "#ffffff",
    opacity: 0.14,
  },
};

//分割线
let axisSplitLine = {
  lineStyle: {
    color: "#FFFFFF",
    type: "dashed",
    opacity: 0.14,
  },
};

//字样式
let axisNameTextStyle = {
  color: "rgba(70,197,251,0.7)",
};

//图例样式
let axisLabelTextStyle = {
  color: "rgba(70,197,251,0.6)",
};
export default {
  props: {
    wsryList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    wsryList: {
      handler(val) {
        (this.chartPeopleInCountry.yAxis.data = val.map(
          (item) => item.countItemsName
        )),
          (this.chartPeopleInCountry.series.data = val.map(
            (item) => item.countNum
          ));
      },
      deep: true,
      immediate: false,
    },
  },
  data() {
    return {
      chartPeopleInCountry: {
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: "5%",
          left: "0%",
          bottom: "0%",
          right: "23%",
          containLabel: true,
        },
        yAxis: {
          type: "category",
          inverse: true,
          data: [],
          axisTick: {
            alignWithLabel: true,
            show: true,
            lineStyle: {
              color: "#ffffff",
            },
          },
          axisLine: axisLineStyle,
          axisLabel: {
            color: "#DADADA",
            fontSize: this.fontSize(0.14),
            formatter(val) {
              let valueText = "";
              if (val.length > 2) {
                valueText = val.substring(0, 3) + "...";
              } else {
                valueText = val;
              }
              return valueText;
            },
          },
        },
        xAxis: {
          name: "人数",
          nameLocation: "end",
          nameTextStyle: {
            align: "left",
            color: "#DADADA",
            fontSize: this.fontSize(0.14),
          },
          type: "value",
          //分割线样式
          splitLine: axisSplitLine,
          data: [],
          //x轴文字样式
          axisLabel: {
            color: "#DADADA",
            fontSize: this.fontSize(0.14),
            // rotate: 38
          },
        },
        series: {
          name: "人数",
          type: "bar",
          barWidth: "20%",
          data: [],
          itemStyle: {
            normal: {
              barBorderRadius: [0, 3, 3, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#00273F" }, //柱图渐变色
                //柱图渐变色
                { offset: 1, color: "#108AAA" }, //柱图渐变色
              ]),
              label: {
                show: true,
                position: "right",
                textStyle: {
                  //数值样式
                  color: "#21CBFF",
                  fontSize: this.fontSize(0.14),
                },
              },
            },
          },
        },
      },
    };
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
  },
};
</script>

<style >
.card .mt-card {
  width: 100%;
  height: 90%;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>