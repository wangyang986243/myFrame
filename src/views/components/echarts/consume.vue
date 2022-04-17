<template>
  <div class="card mt-card">
    <chart :options="chartAgeOptions" autoresize class="w-100 h-100" ref="chartAgeOptions" />
  </div>
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";
export default {
  data() {
    return {
      chartAgeOptions: {
        color: ["#F69000", "#F65F62", "#29A2FD", "#7A58A4", "#442260"],
        legend: {
          orient: "horizontal",
          top: "bottom",
          itemWidth: 16,
          itemHeight: 8,
          data: [],
          textStyle: {
            fontSize: 16,
            color: "#FFFFFF",
          }
        },
        series: {
          type: "pie",
          radius: ["40%", "60%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            formatter: `{b}\n{c}%`,
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

          data: [],
        },
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
  props: ["abilityStat"],
  watch: {
    abilityStat: {
      handler(val) {
        this.chartAgeOptions.series.data = val.map((item) => {
          return { value: item.percent, name: item.ability };
        });
        this.chartAgeOptions.legend.data = val.map((item) => {
          return item.ability;
        });
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