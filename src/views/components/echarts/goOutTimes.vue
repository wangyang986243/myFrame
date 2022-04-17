<template>
  <div>
    <chart :options="options" autoresize class="w-100 h-100" />
  </div>
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";
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
    opacity: 0.15,
  },
};

//字样式
let axisNameTextStyle = {
  color: "rgba(70,197,251,0.7)",
};
export default {
  props: ["xData", "yData", "countType"],
  watch: {
    xData: {
      handler(val) {
        this.options.xAxis.data = val;
      },
      immediate: false,
      deep: true,
    },
    yData: {
      handler(val) {
        this.options.series[0].data = val;
      },
      immediate: false,
      deep: true,
    },
    countType: {
      handler(val) {
        let type = val == "day" ? "日" : "月";
        this.options.xAxis.name = type;
      },
      immediate: false,
      deep: true,
    },
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: "axis",
          showContent: true,
          formatter: `日期:{b0} <br/> 次数:{c0} `,
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "4%",
          bottom: "0%",
          right: "12%",
          top: "14%",
          containLabel: true,
        },
        xAxis: {
          name: "日",
          nameLocation: "end",
          nameTextStyle: {
            align: "left",
            color: "#FFFFFF",
            fontSize: this.fontSize(0.14),
          },
          type: "category",
          boundaryGap: true,
          data: [],
          axisTick: {
            alignWithLabel: true,
            show: true,
            lineStyle: {
              color: "#696969",
            },
          },
          axisLine: axisLineStyle,
          axisLabel: {
            color: "#FFFFFF",
            fontSize: 16,
            rotate: 45,
            // showMinLabel:false,
            // showMaxLabel: true
          },
        },
        yAxis: {
          name: `单位\n(次)`,
          nameLocation: "end",
          nameTextStyle: {
            padding: [0, 0, 0, -32],
            align: "left",
            color: "#8EA3C0",
            fontSize: this.fontSize(0.14),
          },
          splitLine: axisSplitLine,
          type: "value",
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: axisLineStyle,
          axisTick: false,
          axisLabel: {
            color: "#FFFFFF",
            fontSize: this.fontSize(0.14),
          },
        },
        series: [
          {
            data: [],
            type: "line",
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 1,
                  color: "rgba(51,208,250,.5)",
                },
                {
                  offset: 0,
                  color: "rgba(51,208,250,0)",
                },
              ]),
            },
            lineStyle: {
              color: "#33D0FA",
            },
            itemStyle: {
              color: "#21CBFF",
            },
          },
        ],
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

<style>
</style>
