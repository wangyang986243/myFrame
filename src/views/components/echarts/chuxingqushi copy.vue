<template>
  <div class="card mt-card">
    <chart :options="chartPeopleInCountry" autoresize ref="chartAgeOptions" />
  </div>
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
  show: false,
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

//图例样式
let axisLabelTextStyle = {
  color: "rgba(70,197,251,0.6)",
};
export default {
  props: {
    drcxqsList: {
      type: Array,
    },
    danwei: {
      type: Array,
    },
  },
  watch: {
    drcxqsList: {
      handler(val) {
        this.chartPeopleInCountry.xAxis.data = val[0].map(
          (item) => item.countDate
        );
        this.chartPeopleInCountry.series[0].data = val[0].map(
          (item) => item.countNum
        );
        if (!!val[1]) {
          this.chartPeopleInCountry.series[1].data = val[1].map(
            (item) => item.num
          );
        }
      },
      deep: true,
      immediate: false,
    },
  },
  data() {
    return {
      chartPeopleInCountry: {},
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
      this.chartPeopleInCountry = {
        // color: ["#33D0FA", "#FFA502"],
        tooltip: {
          trigger: "axis",
          showContent: true,
          formatter: ``,
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["总", "访客"],
          right: "0%",
          textStyle: {
            color: "#DADADA",
            fontSize: this.fontSize(0.12),
          },
        },
        xAxis: {
          name: "小时",
          nameLocation: "end",
          nameTextStyle: {
            align: "left",
            color: "#DADADA",
            fontSize: this.fontSize(0.1),
          },
          type: "category",
          boundaryGap: true, //表示坐标轴两边留白策略
          data: [],
          axisTick: {
            alignWithLabel: true,
            show: true,
            lineStyle: {
              color: "#DADADA",
            },
          },
          axisLine: axisLineStyle,
          axisLabel: {
            color: "#DADADA",
            fontSize: this.fontSize(0.14),
          },
        },
        yAxis: [
          {
            name: ``,
            nameLocation: "end",
            nameTextStyle: {
              align: "left",
              color: "#DADADA",
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
              color: "#DADADA",
              fontSize: this.fontSize(0.14),
            },
          },
        ],
        grid: {
          left: "0%",
          bottom: "0%",
          right: "15%",
          top: "10%",
          containLabel: true,
        },
        series: [
          {
            name: "总",
            symbol: "none",
            smooth: false,
            data: [],
            type: "line",
            lineStyle: {
              color: "#33D0FA",
              width: 1,
            },
            itemStyle: {
              color: "#33D0FA",
            },
          },
          {
            name: "访客",
            symbol: "none",
            smooth: false,
            data: [],
            type: "line",
            lineStyle: {
              color: "#FFA502",
              width: 1,
            },
            itemStyle: {
              color: "#FFA502",
            },
          },
        ],
      };
    },
  },
};
</script>