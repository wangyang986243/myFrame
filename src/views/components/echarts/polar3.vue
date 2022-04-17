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
    guardCountList: {
      type: Array,
    },
    date: {
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
    guardCountList: {
      handler(val) {
        this.chartPeopleInCountry.series = val;
      },
      deep: true,
      immediate: false,
    },
    date: {
      handler(val) {
        this.chartPeopleInCountry.xAxis.data = val;
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
        this.chartPeopleInCountry.xAxis.axisLabel.textStyle.color =
          echartColor[this.themeColor].axisLabelColor;
        this.chartPeopleInCountry.yAxis.axisLabel.textStyle.color =
          echartColor[this.themeColor].axisLabelColor;
        this.chartPeopleInCountry.yAxis.splitLine.lineStyle.color =
          echartColor[this.themeColor].yAxisSplitLineColor;
        this.chartPeopleInCountry.yAxis.nameTextStyle.color =
          echartColor[this.themeColor].yAxisNameTextStyleColor;
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
        color: [
          "#007bff",
          "#ffa500",
          "#0063e5",
          "#ff7c00",
          "#00ffc7",
          "#ffcf00",
        ],
        title: {
          text: "开门访问趋势",
          textStyle: {
            color:  echartColor[this.themeColor].titleColor,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#444",
            },
          },
        },
        grid: {
          left: "5%",
          bottom: "5%",
          right: "10%",
          top: "15%",
          containLabel: true,
        },
        // legend: {
        //   //图例
        //   data: [], //开门方式名称
        //   left: "right", //图例的位置
        //   padding: [25, 20, 10, 140], //图例的内边距
        //   itemWidth: 10, //图例图标的宽
        //   itemHeight: 10, //图例图标的高
        //   textStyle: {
        //     color: "#777", //值的具体的颜色
        //   },
        // },
        xAxis: {
          //x轴
          type: "category",
          data: [], //x轴的数据

          // splitArea: {show: true},//保留网格区域
          axisLine: {
            //坐标线
            lineStyle: {
              type: "solid",
              color: echartColor[this.themeColor].xAxisColor, //轴线的颜色
              width: "1", //坐标线的宽度
            },
          },
          axisTick: {
            //刻度
            show: false, //不显示刻度线
          },
          axisLabel: {
            textStyle: {
              color: echartColor[this.themeColor].axisLabelColor, //坐标值的具体的颜色
            },
          },
          splitLine: {
            show: false, //去掉分割线
          },
        },
        backgroundColor: "transparent",
        yAxis: {
          name: "单位：次", //轴的名字，默认位置在y轴上方显示
          nameLocation: "end",
          nameTextStyle: {
            align: "left",
            color:  echartColor[this.themeColor].yAxisNameTextStyleColor,
            fontSize: this.fontSize(0.1),
          },
          // left: 20,
          // max: 100, //最大刻度
          type: "value",
          axisLine: {
            //坐标线
            show: false,
            lineStyle: {
              type: "solid",
              color: "#ff0000", //轴线的颜色
              width: "1", //坐标线的宽度
            },
          },
          axisTick: {
            //刻度
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: echartColor[this.themeColor].axisLabelColor, //坐标值的具体的颜色
            },
          },
          minInterval: 5, //标值的最小间隔
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: echartColor[this.themeColor].yAxisSplitLineColor, //分割线的颜色
              opacity: 0.15,
            },
          },
        },
        series: [], //开门数据
      };
    },
  },
};
</script>