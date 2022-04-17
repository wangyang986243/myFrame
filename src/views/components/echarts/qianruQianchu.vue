<template>
  <chart :options="chartPeopleInCountry" autoresize ref="chartAgeOptions" />
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";
import echartColor from "@/assets/js/ecahrtColor";
//分割线
let axisSplitLine = {
  lineStyle: {
    color: "#FFFFFF",
    type: "dashed",
    opacity: 0.15,
  },
};
export default {
  props: {
    resiMovingList: {
      type: Array,
    },
  },
  computed: {
    themeColor: {
      get() {
        return this.$store.getters.themeColor;
      },
      set(val) {},
    },
  },
  watch: {
    resiMovingList: {
      handler(val) {
        this.chartPeopleInCountry.xAxis.data = val.map((item) => {
          return item.fdate;
        });
        this.chartPeopleInCountry.series[1].data = val.map((item) => {
          return item.innum;
        });
        this.chartPeopleInCountry.series[0].data = val.map((item) => {
          return item.outnum;
        });
        this.chartPeopleInCountry.title.text = "人员迁入迁出统计";
      },
      deep: true,
      immediate: false,
    },
    themeColor: {
      handler(val) {
        this.chartPeopleInCountry.title.textStyle.color =
          echartColor[this.themeColor].titleColor;
        this.chartPeopleInCountry.xAxis.axisLine.lineStyle.color =
          echartColor[this.themeColor].xAxisColor;
        this.chartPeopleInCountry.xAxis.nameTextStyle.color =
          echartColor[this.themeColor].xAxisNameTextStyleColor;
        this.chartPeopleInCountry.xAxis.axisTick.lineStyle.color =
          echartColor[this.themeColor].axisTickColor;
        this.chartPeopleInCountry.xAxis.axisLabel.color =
          echartColor[this.themeColor].axisLabelColor;
        this.chartPeopleInCountry.yAxis[0].nameTextStyle.color =
          echartColor[this.themeColor].yAxisNameTextStyleColor;
        this.chartPeopleInCountry.yAxis[0].axisLabel.color =
          echartColor[this.themeColor].axisLabelColor;
        this.chartPeopleInCountry.yAxis[0].splitLine.lineStyle.color =
          echartColor[this.themeColor].yAxisSplitLineColor;
      },
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
        // color: ["#F46065", "#21CBFF", "#33A4FA"],
        title: {
          text: "",
          textStyle: {
            color: echartColor[this.themeColor].titleColor,
          },
        },
        tooltip: {
          trigger: "axis",
          showContent: true,
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#444",
            },
          },
        },
        xAxis: {
          name: "日",
          nameLocation: "end",
          nameTextStyle: {
            align: "left",
            fontSize: this.fontSize(0.12),
            color: echartColor[this.themeColor].xAxisNameTextStyleColor,
          },
          type: "category",
          data: [],
          axisLine: {
            //坐标线
            lineStyle: {
              type: "solid",
              color: echartColor[this.themeColor].xAxisColor, //轴线的颜色
              width: "1", //坐标线的宽度
            },
          },
          axisTick: {
            alignWithLabel: true,
            show: true,
            lineStyle: {
              color: echartColor[this.themeColor].axisTickColor,
            },
          },
          axisLabel: {
            color: echartColor[this.themeColor].axisLabelColor,
            fontSize: this.fontSize(0.12),
          },
        },
        yAxis: [
          {
            name: `单位：人数`,
            nameLocation: "end",
            nameTextStyle: {
              align: "left",
              color: echartColor[this.themeColor].yAxisNameTextStyleColor,
              fontSize: this.fontSize(0.1),
            },
            splitLine: {
              lineStyle: {
                color: echartColor[this.themeColor].yAxisSplitLineColor,
                type: "dashed",
                opacity: 0.15,
              },
            },
            type: "value",
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              show: false,
            },
            axisTick: false,
            axisLabel: {
              color: echartColor[this.themeColor].axisLabelColor,
              fontSize: this.fontSize(0.14),
            },
          },
        ],
        grid: {
          left: "5%",
          bottom: "5%",
          right: "10%",
          top: "15%",
          containLabel: true,
        },
        series: [
          {
            name: "迁出数",
            symbol: "none",
            smooth: true,
            data: [],
            type: "line",
            lineStyle: {
              color: "#DA9D3B",
              width: 1,
            },
            itemStyle: {
              color: "#DA9D3B",
            },
          },
          {
            name: "迁入数",
            symbol: "none",
            smooth: true,
            data: [],
            type: "line",
            lineStyle: {
              color: "#384DCD",
              width: 1,
            },
            itemStyle: {
              color: "#384DCD",
            },
          },
        ],
      };
    },
  },
};
</script>