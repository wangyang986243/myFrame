<template>
  <chart :options="chartPeopleInCountry" autoresize ref="chartAgeOptions" />
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

//图例样式
let axisLabelTextStyle = {
  color: "rgba(70,197,251,0.6)",
};
export default {
  props: {
    trushList: {
      type: Array,
    },
  },
  watch: {
    trushList: {
      handler(val) {
        let arr = val.map((item) => {
          return item.countDate;
        });
        this.chartPeopleInCountry.xAxis.data = Array.from(new Set(arr));
        let arr1 = [
          { name: "可回收", data: [], type: "line" },
          { name: "易腐", data: [], type: "line" },
          { name: "有害", data: [], type: "line" },
          { name: "其他", data: [], type: "line" },
        ];
        for (let i = 0; i < val.length; i++) {
          if (val[i].countType === "khs") {
            arr1[0].data.push(val[i].countVal);
          } else if (val[i].countType === "yf") {
            arr1[1].data.push(val[i].countVal);
          } else if (val[i].countType === "yh") {
            arr1[2].data.push(val[i].countVal);
          } else if (val[i].countType === "qt") {
            arr1[3].data.push(val[i].countVal);
          }
        }
        this.chartPeopleInCountry.series[0].data = arr1[0].data;
        this.chartPeopleInCountry.series[0].name = arr1[0].name; //可回收
        this.chartPeopleInCountry.series[1].data = arr1[1].data;
        this.chartPeopleInCountry.series[1].name = arr1[1].name; //易腐
        this.chartPeopleInCountry.series[2].data = arr1[2].data;
        this.chartPeopleInCountry.series[2].name = arr1[2].name; //有害
        this.chartPeopleInCountry.series[3].data = arr1[3].data;
        this.chartPeopleInCountry.series[3].name = arr1[3].name; //其他
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
        color: ["#33D0FA", "#10AA9A", "#FFA502", "#F33A3A"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ['可回收','易腐','有害','其他'],
          itemWidth: 8,
          itemHeight: 8,
          right: "0%",
          top: "5%",
          textStyle: {
            color: "#DADADA",
            fontSize: this.fontSize(0.12),
          },
        },

        xAxis: {
          name: "天",
          nameLocation: "end",
          nameTextStyle: {
            align: "left",
            color: "#DADADA",
            fontSize: this.fontSize(0.12),
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
            color: "#DADADA",
            fontSize: this.fontSize(0.12),
          },
        },
        yAxis: [
          {
            name: "KG",
            nameLocation: "end",
            nameTextStyle: {
              align: "left",
              color: "#949494",
              fontSize: this.fontSize(0.12),
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
              fontSize: this.fontSize(0.12),
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
          //可回收
          {
            data: [],
            name: "可回收",
            type: "line",
            symbol: "none",
            lineStyle: {
              color: "#33D0FA",
              width: 1,
            },
          },
          //易腐
          {
            data: [],
            type: "line",
            name: "易腐",
            symbol: "none",
            lineStyle: {
              color: "#10AA9A",
              width: 1,
            },
          },
          //有害
          {
            data: [],
            type: "line",
            name: "有害",
            symbol: "none",
            lineStyle: {
              color: "#FFA502",
              width: 1,
            },
          },
          //其他
          {
            data: [],
            type: "line",
            name: "其他",
            symbol: "none",
            lineStyle: {
              color: "#F33A3A",
              width: 1,
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="stylus"></style>