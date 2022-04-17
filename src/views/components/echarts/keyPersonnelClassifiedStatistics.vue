<!--重点人员分类统计  -->
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
  props: ["careCountList"],
  data() {
    return {
      highIndex: 1,
      chartAgeOptions: {},
    };
  },

  computed: {
    themeColor: {
      get() {
        return this.$store.getters.themeColor;
      },
      set(val) {},
    },
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
        color: ["#1265CB", "#00D0FE", "#474DAE", "#983EEA"],
        tooltip: {
          trigger: "item",
          formatter(params) {
            return params.name + " :" + " " + params.value + "人";
          },
        },
        series: [
          {
            type: "pie",
            radius: ["45%", "60%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            itemStyle: {
              borderWidth: 3,
              borderColor: echartColor[this.themeColor].circularBorder
            },
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },

            data: [
              {
                value: 0,
                name: "低保人员",
              },
              {
                value: 0,
                name: "矫正人员",
              },
              {
                value: 0,
                name: "残疾人",
              },
              {
                value: 0,
                name: "精神障碍",
              },
            ],
          },
          {
            type: "pie",
            radius: ["68%", "69%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: true,
            hoverAnimation: false,

            label: {
              show: true,
              fontSize: 11,
              formatter(params) {
                return params.name
                  ? params.name + " " + params.value + "人"
                  : "";
              },
            },
            labelLine: {
              show: true,
              formatter: "{b}\n{d}%",
            },

            data: [
              {
                value: 0,
                name: "低保人员",
              },
              {
                value: 0,
                name: "矫正人员",
              },
              {
                value: 0,
                name: "残疾人",
              },
              {
                value: 0,
                name: "精神障碍",
              },
            ],
          },
        ],
      };
    },
  },
  mounted() {
    this.initOptions();
  },
  watch: {
    careCountList: {
      handler(val) {
        this.chartAgeOptions.series[0].data[0].value = val[0].value;
        this.chartAgeOptions.series[0].data[1].value = val[1].value;
        this.chartAgeOptions.series[0].data[2].value = val[2].value;
        this.chartAgeOptions.series[0].data[3].value = val[3].value;
        this.chartAgeOptions.series[1].data[0].value = val[0].value;
        this.chartAgeOptions.series[1].data[1].value = val[1].value;
        this.chartAgeOptions.series[1].data[2].value = val[2].value;
        this.chartAgeOptions.series[1].data[3].value = val[3].value;
      },
      deep: true,
      immediate: false,
    },

    themeColor: {
      handler(val) {
        this.chartAgeOptions.series[0].itemStyle.borderColor = echartColor[this.themeColor].circularBorder
      },
    }




 
  },
};
</script>

<style >
.card {
  width: 100%;
  height: 100%;
}
</style>