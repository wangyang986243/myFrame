<template>
  <div class="card mt-card">
    <chart
      :options="chartAgeOptions"
      autoresize
      class="w-100 h-100"
      ref="chartAgeOptions"
      id="Mycharts"
    />
  </div>
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";

export default {
  props: ["traffic"],
  data() {
    return {
      highIndex: 1,
      chartAgeOptions: {},
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

    initOptions() {
      this.chartAgeOptions = {
        color: ["#F46065", "#F48F1B", "#33A4FA"],
        legend: {
          orient: "horizontal",
          top: "bottom",
          itemWidth: 16,
          itemHeight: 8,
          data: ["飞机", "汽车", "火车"],
          textStyle: {
            fontSize: this.fontSize(0.16),
            color: "#DADADA",
          },
          // selected:{
          // 	'汽车':true,
          // 	'汽车':false,
          // 	'火车':false
          // }
        },
        series: {
          type: "pie",
          radius: ["40%", "60%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          labelLine: {
            show: true,
            formatter: "{b}\n{d}%",
            // fontSize: this.fontSize(0.16),
            // position: "inner",
          },
          // emphasis: {
          //   label: {
          //     show: true,
          //     textStyle: {
          //       color: "#FFFFFF",
          //       fontSize: this.fontSize(0.16),
          //       fontWeight: "normal",
          //     },
          //   },
          // },
          // itemStyle: {
          //   normal: {
          //     borderWidth: 3,
          //     borderColor: "#000308",
          //     labelLine: {
          //       show: true
          //     },
          //     label: {
          //       formatter: `{b}({c}%)`,
          //       textStyle: {
          //         color: "#FFFFFF",
          //         fontSize: this.fontSize(0.16),
          //         fontWeight: "normal"
          //       }
          //     }
          //   }
          // },
          // itemStyle: {
          //     normal: {
          //       borderWidth: 3,
          //       borderColor: "#000308"
          //     }
          //   },
          data: [
            {
              value: 10,
              name: "飞机",
            },
            {
              value: 20,
              name: "汽车",
            },
            {
              value: 35,
              name: "火车",
            },
          ],
        },
      };
    },
  },
  mounted() {
    this.initOptions();
  },
  watch: {
    traffic: {
      handler(val) {
        this.chartAgeOptions.series.data[0].value = val.plane;
        this.chartAgeOptions.series.data[1].value = val.car;
        this.chartAgeOptions.series.data[2].value = val.train;
      },
      deep: true,
      immediate: false,
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