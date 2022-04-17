<template>
  <div class="card mt-card">
    <chart
      :options="chartAgeOptions"
      autoresize
      class="w-100 h-100"
      ref="chartAgeOptions"
      id="Mycharts"
    />
    <p v-if="typeOption === 'zz'" class="czrkjgP">职住同区 {{ total }}人</p>
  </div>
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";

export default {
  props: ["traffic", "typeOption"],
  data() {
    return {
      highIndex: 1,
      chartAgeOptions: {},
      total: "483207",
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
        color: ["#00D0FE", "#474DAE", "#1265CB"],
        series: [
          {
            type: "pie",
            radius: ["45%", "55%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              borderWidth: 10,
              borderRadius: 4,
              padding: [0, -80],
              alignTo: "labelLine",
              formatter: "{c|{c} 人}  \n  {b|{b}}",
              rich: {
                b: {
                  fontSize: 12,
                  color: "#ffffff",
                  lineHeight: 23,
                },
                c: {
                  fontSize: 12,
                  color: "#ffffff",
                  lineHeight: 25,
                },
              },
            },
            labelLine: {
              length: 5,
              length2: 90,
              maxSurfaceAngle: 80,
            },
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: "rgba(18, 101, 203, 1)",
              },
              opacity: 0,
            },
            data: [],
          },
        ],
      };
    },
    initLabel() {
      this.chartAgeOptions.series[0].data = this.traffic.map((item) => {
        return item;
      });
    },
  },
  mounted() {
    this.initOptions();
    this.initLabel();
    let that = this;
  },
  watch: {
    traffic: {
      handler(val) {
        this.chartAgeOptions.series[0].data = val.map((item) => {
          return item;
        });
      },
      deep: true,
      immediate: false,
    },
  },
};
</script>

<style scope>
.card {
  width: 100%;
  height: 100%;
}
p.czrkjgP {
  color: #fff;
  font-size: 14px;
  text-align: center;
}
</style>