<template>
  <chart :options="chartPeopleInCountry" autoresize ref="chartAgeOptions" />
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";
import echartColor from "@/assets/js/ecahrtColor";

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
    trushList: {
      type: Array,
    },
    pay: {
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
    trushList: {
      handler(val) {
        let arr = val.map((item) => {
          return item.countDate;
        });
        this.chartPeopleInCountry.xAxis.data = Array.from(new Set(arr));
        this.chartPeopleInCountry.color = [
          "#1890FF",
          "#29C9C9",
          "#FFA502",
          "#F33A3A",
        ];
        this.chartPeopleInCountry.legend.data = [
          "可回收",
          "易腐",
          "其他",
          "有害",
        ];
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
        this.chartPeopleInCountry.series[0].data = arr1[0].data;
        this.chartPeopleInCountry.series[0].name = arr1[0].name;
        this.chartPeopleInCountry.series[1].data = arr1[2].data;
        this.chartPeopleInCountry.series[1].name = arr1[2].name;
        this.chartPeopleInCountry.series[2].data = arr1[3].data;
        this.chartPeopleInCountry.series[2].name = arr1[3].name;
        this.chartPeopleInCountry.series[3].data = arr1[1].data;
        this.chartPeopleInCountry.series[3].name = arr1[1].name;
      },
    },
    pay: {
      handler(val) {
        let arr = val.map((item) => {
          return item.fMonth;
        });
        this.chartPeopleInCountry.xAxis.data = Array.from(new Set(arr));
        this.chartPeopleInCountry.color = ["#FFA502", "#1890FF"];
        this.chartPeopleInCountry.legend.data = ["物业费", "停车费"];
        this.chartPeopleInCountry.title.text = "每月缴费趋势";
        this.chartPeopleInCountry.yAxis[0].name = "单位：次";
        let arr1 = [
          { name: "物业费", data: [], type: "line" },
          { name: "停车费", data: [], type: "line" },
        ];
        for (let i = 0; i < val.length; i++) {
          if (val[i].feeType === "WYF") {
            arr1[0].data.push(val[i].payNum);
          } else {
            arr1[1].data.push(val[i].payNum);
          }
        }
        this.chartPeopleInCountry.series[0].data = arr1[1].data;
        this.chartPeopleInCountry.series[0].name = arr1[1].name;
        this.chartPeopleInCountry.series[1].data = arr1[0].data;
        this.chartPeopleInCountry.series[1].name = arr1[0].name;
      },
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
        this.chartPeopleInCountry.legend.textStyle.color =
          echartColor[this.themeColor].legendTextStyle;
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
        color: [],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#444",
            },
          },
        },
        title: {
          text: "垃圾投放量",
          textStyle: {
            color: echartColor[this.themeColor].titleColor,
          },
        },
        legend: {
          data: [],
          itemWidth: 8,
          itemHeight: 8,
          right: "0%",
          textStyle: {
            color: echartColor[this.themeColor].legendTextStyle,
            fontSize: this.fontSize(0.12),
          },
        },

        xAxis: {
          name: "日",
          nameLocation: "end",
          nameTextStyle: {
            align: "left",
            color: echartColor[this.themeColor].xAxisNameTextStyleColor,
            fontSize: this.fontSize(0.14),
          },
          type: "category",
          boundaryGap: true,
          data: [],
          axisTick: {
            alignWithLabel: true,
            show: true,
            lineStyle: {
              color: echartColor[this.themeColor].axisTickColor,
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: echartColor[this.themeColor].xAxisColor,
              opacity: 0.14,
            },
          },
          axisLabel: {
            color: echartColor[this.themeColor].axisLabelColor,
            fontSize: this.fontSize(0.14),
          },
        },
        yAxis: [
          {
            name: `单位：KG`,
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
            axisLine: axisLineStyle,
            axisTick: false,
            axisLabel: {
              color: echartColor[this.themeColor].axisLabelColor,
              fontSize: this.fontSize(0.14),
            },
          },
        ],
        grid: {
          left: "4%",
          bottom: "0%",
          right: "5%",
          top: "15%",
          containLabel: true,
        },
        series: [
          {
            data: [],
            type: "line",
            name: "",
            symbol: "none",
            lineStyle: {
              // color: "#1890FF",
              width: 1,
            }, //可回收
          },
          {
            data: [],
            type: "line",
            name: "",
            symbol: "none",
            lineStyle: {
              // color: "#29C9C9",
              width: 1, //易腐
            },
          },
          {
            data: [],
            name: "",
            type: "line",
            symbol: "none",
            lineStyle: {
              // color: "#FFA502",
              width: 1,
            }, //其他
          },

          {
            data: [],
            type: "line",
            name: "",
            symbol: "none",
            lineStyle: {
              // color: "#F33A3A",
              width: 1,
            }, //有害
          },
        ],
      };
    },
  },
};
</script>

<style lang="stylus"></style>