<template>
  <div class="card mt-card">
    <chart :options="chartAgeOptions" autoresize class="w-100 h-100" ref="chartAgeOptions" />
  </div>
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";
let axisSplitLine = {
  lineStyle: {
    color: "#FFFFFF",
    type: "dashed",
    opacity: 0.12
  }
};
export default {
  props: {
    educationStat: {
      type: Array,
      default:[]
    },
    //y轴单位
    unit: {
      type: String,
      default: ""
    },
    //x轴单位
    xUnit:{
      type: String,
      default: ""
    }
  },
  watch: {
    educationStat: {
      handler(val) {
         let arr = val.map(item => {
          return item.date
        });
        this.chartAgeOptions.xAxis.data = arr//.reverse()
        this.chartAgeOptions.series.data = val.map(item => {
          return item.value
        });
      },
      deep: true,
      immediate: false
    },

  },
  data() {
    return {
      chartAgeOptions: {}
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
        animationDuration: function(idx) {
          // 越往后的数据时长越大
          return 1500;
        },
        animationDurationUpdate: function(idx) {
          // 越往后的数据时长越大
          return 1500;
        },
        tooltip: {
          show:true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        color: ["#3398DB"],
        grid: {
          left: "5%",
          bottom: "5%",
          right: "10%",
          top: "15%",
          containLabel: true
        },
        xAxis: {
          name: this.xUnit,
          nameTextStyle: {
              color: "#fff",
              fontSize: this.fontSize(0.12)
            },
          type: "category",
          axisLabel: {
            color: "#DADADA",
            fontSize: this.fontSize(0.12)
          },
          data: [],
          axisTick: {
            alignWithLabel: true,
            show: false,
            lineStyle: {
              color: "#DADADA"
            }
          }
        },
        yAxis: [
          {
            name: this.unit,
            nameLocation: "end",
            nameTextStyle: {
              padding: [0, 0, 0, -22],
              align: "left",
              color: "#949494",
              fontSize: this.fontSize(0.12)
            },
            type: "value",
            axisLabel: {
              color: "#DADADA",
              fontSize: this.fontSize(0.12)
            },
            splitLine: axisSplitLine
          }
        ],
        series: {
          // name: "学历",
          type: "bar",
          barWidth: "20%",
          data: [],
          itemStyle: {
            normal: {
              barBorderRadius: [6, 6, 0, 0],
              color: new echarts.graphic.LinearGradient(1, 0.8, 0.4, 0, [
                { offset: 0, color: "#00273F" }, //柱图渐变色
                //柱图渐变色
                { offset: 1, color: "#108AAA" } //柱图渐变色
              ]),
              label: {
                show: true,
                position: "top",
                textStyle: {
                  //数值样式
                  color: "#21CBFF",
                  fontSize: this.fontSize(0.12)
                }
              }
            }
          }
        }
      };
    }
  },
  // props: ["educationStat"],
  // watch: {
  //   educationStat: {
  //     handler(val) {
  //       this.chartAgeOptions.xAxis.data = val.education;
  //       this.chartAgeOptions.series.data = val.value;
  //     },
  //     deep: true,
  //     immediate: false
  //   }
  // }
};
</script>

<style lang="stylus"></style>