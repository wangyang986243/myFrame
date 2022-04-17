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
  fontFamily: "monospace"
};

//坐标线
let axisLineStyle = {
  lineStyle: {
    color: "#ffffff",
    opacity: 0.14
  }
};

//分割线
let axisSplitLine = {
  lineStyle: {
    color: "#FFFFFF",
    type: "dashed",
    opacity: 0.15
  }
};

//字样式
let axisNameTextStyle = {
  color: "rgba(70,197,251,0.7)"
};

//图例样式
let axisLabelTextStyle = {
  color: "rgba(70,197,251,0.6)"
};
export default {
  props: {
    drift: {
      type: Array
    }
  },
  watch: {
    drift: {
      handler(val) {
        this.chartPeopleInCountry.xAxis.data = val.map(item => {
          return item.name
        });
        this.chartPeopleInCountry.series[0].data = val.map(item => {
          return item.value
        });
      }
    }
  },
  data() {
    return {
      chartPeopleInCountry: {}
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
          formatter: `日期:{b0} <br/> 数量:{c0}(千人) `,
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          name: "日期",
          nameLocation: "end",
          nameTextStyle: {
            align: "left",
            color: "#FFFFFF",
            fontSize: this.fontSize(0.14)
          },
          type: "category",
          boundaryGap: false,
          data: [],
          axisTick: {
            alignWithLabel: true,
            show: true,
            lineStyle: {
              color: "#FFFFFF"
            }
          },
          axisLine: axisLineStyle,
          axisLabel: {
            color: "#FFFFFF",
            fontSize: this.fontSize(0.14)
          }
        },
        yAxis: [
          {
            name: `单位 (千人)`,
            nameLocation: "end",
            nameTextStyle: {
              align: "left",
              color: "#FFFFFF",
              fontSize: this.fontSize(0.14)
            },
            splitLine: axisSplitLine,
            type: "value",
            axisTick: {
              alignWithLabel: true
            },
            axisLine: axisLineStyle,
            axisTick: false,
            axisLabel: {
              color: "#FFFFFF",
              fontSize: this.fontSize(0.14)
            }
          }
        ],
        grid: {
          left: "0%",
          bottom: "0%",
          right: "12%",
          top: "20%",
          containLabel: true
        },
        series: [
          {
            data: [],
            type: "line",
            lineStyle: {
              color: "#FFFFFF",
              width: 1
            },
            symbol: "circle",
            itemStyle: {
              color: "#FFFFFF"
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 1,
                  color: "rgba(51,208,250,.5)"
                },
                {
                  offset: 0,
                  color: "rgba(51,208,250,0)"
                }
              ])
            }
          }
        ]
      };
    }
  }
};
</script>

<style lang="stylus"></style>