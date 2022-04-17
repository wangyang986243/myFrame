<template>
  <div class="card mt-card">
    <chart
      :options="chartAgeOptions"
      autoresize
      class="w-100 h-100"
      ref="chartAgeOptions"
    />
  </div>
</template>

<script>
import ECharts from "@/components/map-chart/dataBoard/index";
var data = [];
export default {
  props: ["cityStat"],
  watch: {
    cityStat: {
      handler(val) {
        this.chartAgeOptions.series[0].data = val;
        this.chartAgeOptions.legend.data = val;
      },
      immediate: false,
      deep: true,
    },
  },
  data() {
    return {
      chartAgeOptions: {
        animationDuration: function (idx) {
          // 越往后的数据时长越大
          return 1500;
        },
        animationDurationUpdate: function (idx) {
          // 越往后的数据时长越大
          return 1500;
        },

        color: [
          "#F48F1B",
          "#31C5C0",
          "#1E9BD1",
          "#0F347B",
          "#585247",
          "#7F6AAD",
          "#009D85",
          "#1A7FCC",

          "rgba(250,250,250,0.3)",
        ],

        grid: {
          bottom: 150,
          left: 100,
          right: "10%",
        },
        legend: {
          orient: "horizontal",
          top: "bottom",
          itemWidth: 16,
          itemHeight: 8,
          data: [],
          textStyle: {
            fontSize: 16,
            color: "#FFFFFF",
          },
        },
        series: [
          // 主要展示层的
          {
            radius: ["36%", "50%"],
            center: ["50%", "50%"],
            type: "pie",
            avoidLabelOverlap: false,
            label: {
              show: false,
              formatter: `{b}\n{d}%`,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                textStyle: {
                  color: "#FFFFFF",
                  fontSize: this.fontSize(0.14),
                  fontWeight: "normal",
                },
              },
            },
            // label: {
            //   normal: {
            //     show: true,
            //     formatter: "{b} \n  {c}(千人)",
            //     textStyle: {
            //       color: "#FFFFFF",
            //       fontSize: this.fontSize(0.14)
            //     },
            //     position: "outside"
            //   },
            //   emphasis: {
            //     show: true
            //   }
            // },

            name: "人口来源",
            data: data,
          },
          // 边框的设置
          {
            radius: ["35%", "39%"],
            center: ["50%", "50%"],
            type: "pie",
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            animation: false,
            tooltip: {
              show: false,
            },
            data: [
              {
                value: 1,
                itemStyle: {
                  color: "rgba(250,250,250,0.3)",
                },
              },
            ],
          },
        ],
      },
    };
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
  },
};
</script>

<style >
.card {
  width: 100%;
  height: 100%;
}
</style>