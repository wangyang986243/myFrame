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
    provinceStat: {
      type: Array,
      default: () => [],
      requried: true,
    },
    moveProvince: {
      type: Object,
      default: () => {},
      requried: true,
    },
    unit: {
      type: String,
      default: "人数",
    },
  },
  data() {
    return {
      chartPeopleInCountry: {},
    };
  },
  watch: {
    provinceStat: {
      handler(val) {
        this.chartPeopleInCountry.yAxis.data = val.map((item) => {
          return item.name;
        });
        this.chartPeopleInCountry.series.data = val.map((item) => {
          return item.value;
        });
      },
      immediate: false,
      deep: true,
    },
    moveProvince: {
      handler(val) {
        this.chartPeopleInCountry.yAxis.data = val.province;
        this.chartPeopleInCountry.series.data = val.value;
      },
      immediate: false,
      deep: true,
    },
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
    start() {
      var _this = this;
      _this.chartPeopleInCountry.yAxis.data = _this.provinceStat.map((item) => {
        return item.name;
      });
      _this.chartPeopleInCountry.series.data = _this.provinceStat.map(
        (item) => {
          return item.value;
        }
      );
    },
    initOptions() {
      this.chartPeopleInCountry = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: "5%",
          left: "3%",
          bottom: "0",
          right: "15%",
          containLabel: true,
        },
        yAxis: {
          type: "category",
          inverse: true,
          data: [],
          axisTick: {
            alignWithLabel: true,
            show: false,
            lineStyle: {
              color: "#DADADA",
            },
          },
          axisLine: axisLineStyle,
          axisLabel: {
            color: "#DADADA",
            fontSize: this.fontSize(0.12),
            formatter: function (value) {
              let valueTxt = "";
              if (value.length > 6) {
                valueTxt = value.substring(0, 6) + "...";
              } else {
                valueTxt = value;
              }
              return valueTxt;
            },
          },
        },
        xAxis: {
          type: "category",
          name: this.unit,
          nameLocation: "end",
          nameTextStyle: {
            align: "left",
            color: "#949494",
            fontSize: this.fontSize(0.12),
          },
          type: "value",
          //分割线样式
          splitLine: axisSplitLine,
          data: [],
          //x轴文字样式
          axisLabel: {
            color: "#DADADA",
            rotate: 0,
            fontSize: this.fontSize(0.12),
          },
        },
        series: {
          name: "人数",
          type: "bar",
          barWidth: "20%",
          itemStyle: {
            normal: {
              barBorderRadius: [0, 6, 6, 0],
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
                  fontSize: this.fontSize(0.12),
                },
              },
            },
          },
        },
      };
    },
  },
  mounted() {
    // this.start()
    this.initOptions();
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