<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "600px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
      lineChartData: [],
    };
  },
  created() {
    this.getWorkOrderDealInfo();
  },
  watch: {
    lineChartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    // 获取折线图信息
    async getWorkOrderDealInfo() {
      const arg = {
        url: this.$Config.apiUrl.workOrderDealInfo,
      };
      const { result } = await this.$Axios._get(arg);
      if (this.$root.handleRes(result)) {
        this.lineChartData = result.data;
      }
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    setOptions({ expectedData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: this.lineChartData.map(function (v) {
            return v.orderMonth;
          }),
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        title: {
          show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
          text: "近一年工单数量", //主标题文本，'\n'指定换行
          link: "", //主标题文本超链接,默认值true
          target: null, //指定窗口打开主标题超链接，支持'self' | 'blank'，不指定等同为'blank'（新窗口）
          x: "30%", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          textAlign: null, //水平对齐方式，默认根据x设置自动调整，可选为： left' | 'right' | 'center
          backgroundColor: "rgba(0,0,0,0)", //标题背景颜色，默认'rgba(0,0,0,0)'透明
          borderColor: "#ccc", //标题边框颜色,默认'#ccc'
          borderWidth: 0, //标题边框线宽，单位px，默认为0（无边框）
          padding: 2, //padding: [5,5,5,5],标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
          itemGap: 10, //主副标题纵向间隔，单位px，默认为10
          textStyle: {
            //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            fontFamily: "sans-serif",
            fontSize: 22,
            fontStyle: "normal",
            fontWeight: "normal",
            color: "#000000",
          },
        },
        grid: {
          left: 10,
          right: 30,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
        },
        yAxis: {
          axisTick: {
            show: false,
          },
        },
        legend: {
          data: ["工单数量"],
        },
        series: [
          {
            name: "工单数量",
            itemStyle: {
              normal: {
                color: "#5edbff",
                lineStyle: {
                  color: "#5edbff",
                  width: 2,
                },
              },
            },
            smooth: true,
            type: "line",
            data: this.lineChartData.map(function (v) {
              return v.orderNum;
            }),
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
        ],
      });
    },
  },
};
</script>
