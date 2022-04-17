<template>
  <div class="card mt-card">
    <chart :options="chartPeopleInCountry" autoresize ref="chartAgeOptions" />
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

//图例样式
let axisLabelTextStyle = {
  color: "rgba(70,197,251,0.6)",
};
export default {
  props: {
    rkcjqsList: {
      type: Array,
    },
    yjjy: {
      type: Array,
    },
  },
  watch: {
    rkcjqsList: {
      handler(val) {
        this.chartPeopleInCountry.xAxis.data = val.map(
          (item) => item.countDate
        );
        if (val[0].countDate.split("-").length !== 2) {
          this.chartPeopleInCountry.xAxis.name = "日";
          this.chartPeopleInCountry.tooltip.formatter =
            "日期:{b0} <br/> 数量:{c0}(人)";
        } else {
          this.chartPeopleInCountry.xAxis.name = "月";
          this.chartPeopleInCountry.tooltip.formatter =
            "月份:{b0} <br/> 数量:{c0}(人)";
        }

        this.chartPeopleInCountry.series[0].data = val.map(
          (item) => item.countNum
        );
      },
    },
    yjjy: {
      handler(val) {
        this.chartPeopleInCountry.xAxis.name = "日";
        this.chartPeopleInCountry.yAxis[0].name = "单位\n(人数)";
        this.chartPeopleInCountry.xAxis.data = val.map((item) => {
          return item.fMonth ? item.fMonth : item.fDate;
        });

        this.chartPeopleInCountry.series[0].data = val.map((item) => item.num);
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
        color: ["#F46065", "#21CBFF", "#33A4FA"],
        tooltip: {
          trigger: "axis",
          showContent: true,
          formatter: ``,
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          name: "",
          nameLocation: "end",
          nameTextStyle: {
            align: "left",
            color: "#DADADA",
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
            color: "#DADADA",
            fontSize: this.fontSize(0.12),
          },
        },
        yAxis: [
          {
            name: `单位\n(数量)`,
            nameLocation: "end",
            nameTextStyle: {
              padding: [0, 0, 0, -32],
              align: "left",
              color: "#DADADA",
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
              fontSize: this.fontSize(0.14),
            },
          },
        ],
        grid: {
          left: "5%",
          bottom: "0%",
          right: "14%",
          top: "22%",
          containLabel: true,
        },
        series: [
          {
            data: [],
            type: "line",
            lineStyle: {
              color: "#33D0FA",
              width: 1,
            },
            symbol: "circle",
            itemStyle: {
              color: "#21CBFF",
            },
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
          },
        ],
      };
    },
  },
};
</script>

<style lang="stylus"></style>