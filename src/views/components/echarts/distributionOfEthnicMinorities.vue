  <!-- 少数民族分布 -->
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
import echartColor from "@/assets/js/ecahrtColor";

export default {
  props: ["resiNationCountName", "resiNationCountNum"],
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
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "0%",
          containLabel: true,
        },
        xAxis: {
          show: false,
          type: "value",
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 12,
                color: echartColor[this.themeColor].horizontal_axisLabel,
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            // data: ["壮族", "维吾尔族", "苗族", "藏族", "东乡族"],
            data: [],
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: echartColor[this.themeColor].horizontal_axisLabel,
              },
              formatter: function (value) {
                return value.toLocaleString() + "人";
              },
            },
            // data: [111, 222, 333, 444, 1],
            data: [],
          },
        ],
        series: [
          {
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 4,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgb(57,89,255,1)",
                  },
                  {
                    offset: 1,
                    color: "rgb(46,200,207,1)",
                  },
                ]),
              },
            },
            barWidth: 8,
            // data: [111, 222, 333, 444, 1],
            data: [],
          },
        ],
      };
    },
  },
  mounted() {
    this.initOptions();
  },
  computed: {
    themeColor: {
      get() {
        return this.$store.getters.themeColor;
      },
      set(val) {},
    },
  },
  watch: {
    resiNationCountName: {
      handler(val) {
        this.chartAgeOptions.yAxis[0].data = val;
      },
      deep: true,
      immediate: false,
    },
    resiNationCountNum: {
      handler(val) {
        this.chartAgeOptions.yAxis[1].data = val;
        this.chartAgeOptions.series[0].data = val;
      },
      deep: true,
      immediate: false,
    },
    themeColor: {
      handler(val) {
        this.chartAgeOptions.yAxis[0].axisLabel.textStyle.color =
          echartColor[this.themeColor].horizontal_axisLabel;
        this.chartAgeOptions.yAxis[1].axisLabel.textStyle.color =
          echartColor[this.themeColor].horizontal_axisLabel;
      },
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