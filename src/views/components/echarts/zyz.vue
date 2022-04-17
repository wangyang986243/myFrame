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
import echartColor from "@/assets/js/ecahrtColor";
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
    zyzList: {
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
    zyzList: {
      handler(val) {
        this.chartAgeOptions.xAxis.data = val.map((item) => {
          return item.projectTitle;
        });
        this.chartAgeOptions.series[0].data = val.map((item) => {
          return item.postPlanNum;
        });
        this.chartAgeOptions.series[1].data = val.map((item) => {
          return item.postRealNum;
        });
      },
      deep: true,
      immediate: false,
    },
    themeColor: {
      handler(val) {
        this.chartAgeOptions.title.textStyle.color =
          echartColor[this.themeColor].titleColor;
        this.chartAgeOptions.xAxis.axisLabel.color =
          echartColor[this.themeColor].axisLabelColor;
        this.chartAgeOptions.xAxis.axisTick.lineStyle.color =
          echartColor[this.themeColor].axisTickColor;
        this.chartAgeOptions.xAxis.axisLine.lineStyle.color =
          echartColor[this.themeColor].xAxisColor;
        this.chartAgeOptions.yAxis.nameTextStyle.color =
          echartColor[this.themeColor].yAxisNameTextStyleColor;
        this.chartAgeOptions.yAxis.axisLabel.color =
          echartColor[this.themeColor].axisLabelColor;
        this.chartAgeOptions.yAxis.splitLine.lineStyle.color =
          echartColor[this.themeColor].yAxisSplitLineColor;
        this.chartAgeOptions.series[0].itemStyle.normal.color =
          echartColor[this.themeColor].barColor_grey;
        this.chartAgeOptions.series[1].itemStyle.normal.color =
          echartColor[this.themeColor].barColor_blue;
      },
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
        // color: ["#FFA502", "#1890FF", "#29C9C9","#F33A3A"],
        title: {
          text: "志愿者",
          textStyle: {
            color: echartColor[this.themeColor].titleColor,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [],
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
          top: "15%",
          left: "0%",
          right: "5%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: echartColor[this.themeColor].axisLabelColor,
            fontSize: this.fontSize(0.14),
            formatter: function (params) {
              var newParamsName = ""; // 最终拼接成的字符串
              var paramsNameNumber = params.length; // 实际标签的个数
              var provideNumber = 5; // 每行能显示的字的个数
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
              /**
               * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
               */
              // 条件等同于rowNumber>1
              if (paramsNameNumber > provideNumber) {
                /** 循环每一行,p表示行 */
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ""; // 表示每一次截取的字符串
                  var start = p * provideNumber; // 开始截取的位置
                  var end = start + provideNumber; // 结束截取的位置
                  // 此处特殊处理最后一行的索引值
                  if (p == rowNumber - 1) {
                    // 最后一次不换行
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    // 每一次拼接字符串并换行
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr; // 最终拼成的字符串
                }
              } else {
                // 将旧标签的值赋给新标签
                newParamsName = params;
              }
              //将最终的字符串返回
              return newParamsName;
            },
          },
          data: [],
          axisTick: {
            alignWithLabel: true,
            show: true,
            lineStyle: {
              color: echartColor[this.themeColor].axisTickColor,
            },
          },
          axisLine: {
            //坐标线
            lineStyle: {
              type: "solid",
              color: echartColor[this.themeColor].xAxisColor, //轴线的颜色
              width: "1", //坐标线的宽度
            },
          },
        },
        yAxis: {
          name: `单位：(人数)`,
          nameLocation: "end",
          axisLine: {
            show: false,
          },
          nameTextStyle: {
            align: "left",
            color: echartColor[this.themeColor].yAxisNameTextStyleColor,
            fontSize: this.fontSize(0.1),
          },
          axisTick: {
            show: false,
          },
          type: "value",
          axisLabel: {
            color: echartColor[this.themeColor].axisLabelColor,
            fontSize: this.fontSize(0.14),
          },
          splitLine: {
            lineStyle: {
              show: false,
              color: echartColor[this.themeColor].yAxisSplitLineColor,
              type: "dashed",
              opacity: 0.14,
            },
          },
        },

        series: [
          {
            name: "人数",
            type: "bar",
            barWidth: "15%",
            data: [],
            itemStyle: {
              normal: {
                color: echartColor[this.themeColor].barColor_grey,
              },
            },
          },
          {
            barGap: "-100%",
            name: "已报名人数",
            type: "bar",
            barWidth: "15%",
            data: [],
            itemStyle: {
              normal: {
                color: echartColor[this.themeColor].barColor_blue,
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