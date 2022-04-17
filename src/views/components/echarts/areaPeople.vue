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
    pay: {
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
          { name: "周平均数", data: [], type: "line" },
          { name: "实时人数", data: [], type: "line" }
        ];
        for (let i = 0; i < val.length; i++) {
          if (val[i].countType === "WEEK") {
            arr1[0].data.push(val[i].countVal/10000);
          } else if (val[i].countType === "CUR") {
            arr1[1].data.push(val[i].countVal/10000);
          }
        }
        this.chartPeopleInCountry.series[0].data = arr1[0].data;
      
        this.chartPeopleInCountry.series[0].name = arr1[0].name; //周平均数
        this.chartPeopleInCountry.series[1].data = arr1[1].data;
        this.chartPeopleInCountry.series[1].name = arr1[1].name; //实时人数
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
        color: ["#21CBFF", "#FFA502"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["周平均数", "实时人数"],
          itemWidth: 8,
          itemHeight: 8,
          right: "0%",
          top:"5%",
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
            fontSize: this.fontSize(0.12),
          },
          type: "category",
          boundaryGap: true,
          data: ["3","6","9","12","15","18","21","24"],
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
            name: `单位\n(万人)`,
            nameLocation: "end",
            nameTextStyle: {
              padding: [0, 0, 0, -22],
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
          left: "1%",
          bottom: "0%",
          right: "15%",
          top: "30%",
          containLabel: true,
        },
        series: [
          {
            data: [],
            name: "周平均数",
            type: "line",
            symbol: "none",
            lineStyle: {
              color: "#21CBFF",
              width: 1,
            },
          }, //周平均数
          {
            data: [],
            type: "line",
            name: "实时人数",
            symbol: "none",
            lineStyle: {
              color: "#FFA502",
              width: 1,
            },
          }, //实时人数
        ],
      };
    },
  },
};
</script>

<style lang="stylus"></style>