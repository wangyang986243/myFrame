<template>
  <div class="card mt-card">
    <chart :options="chartPeopleInCountry" autoresize ref="chartAgeOptions" />
  </div>
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";
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
    drift: {
      type: Array,
      default:()=>[],
    },
    danwei: {
      type: String,
      default:()=>'万人',
    },
    qushi: {
      type: Array,
       default:()=>[],
    },
   
  },
  watch: {
    drift: {
      handler(val) {
        let date = val.map((item) => {
          return item.countDate;
        });
        this.chartPeopleInCountry.xAxis.data = date.reverse();
        let data = val.map((item) => {
          return item.countNum;
        });
        this.chartPeopleInCountry.series[0].data = data.reverse();
      },
      deep: true,
      // immediate: true,
    },
    qushi: {
      handler(val) {
        this.chartPeopleInCountry.xAxis.data = val.map(item => {
          return item.date
        });
        this.chartPeopleInCountry.series[0].data = val.map(item => {
          return item.value
        });
      },
      deep: true,
      // immediate: true,
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
          formatter: `日期:{b0} <br/> 数量:{c0} `,
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          name: "日期",
          nameLocation: "end",
          nameTextStyle: {
            align: "left",
            fontSize: this.fontSize(0.14),
            color: "#DADADA",
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
          axisLabel: {
            color: "#DADADA",
            rotate: 40,
            fontSize: this.fontSize(0.14),
          },
        },
        yAxis: [
          {
            name: this.danwei,
            nameLocation: "end",
            nameTextStyle: {
              align: "left",
              color: "#DADADA",
              fontSize: this.fontSize(0.14),
            },
            splitLine: axisSplitLine,
            type: "value",
            axisTick: {
              alignWithLabel: true,
            },
            axisTick: false,
            axisLabel: {
              color: "#DADADA",
              fontSize: this.fontSize(0.14),
            },
          },
        ],
        grid: {
          left: "3%",
          bottom: "0%",
          right: "12%",
          top: "13%",
          containLabel: true,
        },
        series: [
          {
           
            symbol: "none",
            smooth: true,
            data: [],
            type: "line",
            lineStyle: {
              color: "#33D0FA",
              width: 1,
            },
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
          {
            
            symbol: "none",
            smooth: true,
            data: [],
            type: "line",
            lineStyle: {
              color: "#33D0FA",
              width: 1,
            },
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