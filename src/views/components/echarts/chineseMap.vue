<!--中国地图  -->
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
import chinaMap from "@/components/map-chart/china.json"; //Map of China
echarts.registerMap("china", chinaMap);

export default {
  props: {
    geoCoordMap: {
      type: Object,
      default: () => {},
    },
    geoCoordData: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String, //主标题
      default: "中国地图",
    },
    tooltipIsShows: {
      type: Boolean, //提示框是否展示
      default: true,
    },
  },
  computed: {
    themeColor: {
      get() {
        return this.$store.getters.themeColor;
      },
      set(val) {},
    },
  },
  data() {
    return {
      highIndex: 1,
      chartAgeOptions: {},
      //   geoCoordMap: {
      //     广西: [108.479, 23.1152],
      //     海南: [110.3893, 19.8516],
      //     上海: [121.4648, 31.2891],
      //   },
      //   data: [
      //     { name: "上海", value: 24 },
      //     { name: "广西", value: 59 },
      //     { name: "海南", value: 14 },
      //   ],
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
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return res;
    },
    initOptions() {
      this.chartAgeOptions = {
        title: {
          text: this.title,
          left: "center",
          top: 20,
          textStyle: {
            // color: "#999999",
            color: echartColor[this.themeColor].titleColor,
          },
        },
        tooltip: {
          show: this.tooltipIsShows,
          trigger: "item",
          formatter: function (params) {
            if (typeof params.value[2] == "undefined") {
              if (params.value) {
                return params.name + " : " + params.value + "人";
              } else {
                return params.name + " : " + 0 + "人";
              }
            } else {
              return params.name + " : " + params.value[2] + "人";
            }
          },
        },

        geo: {
          map: "china",
          show: true,
          roam: false,
          label: {
            emphasis: {
              show: false,
            },
          },

          itemStyle: {
            normal: {
              areaColor: echartColor[this.themeColor].areaColor,
              borderColor: echartColor[this.themeColor].borderColor, //线
            },
            emphasis: {
              areaColor: echartColor[this.themeColor].emphasisAreaColor, //悬浮区背景
            },
          },
        },
        series: [
          {
            type: "effectScatter",
            coordinateSystem: "geo",
          },
          {
            type: "map",
            map: "china",
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            roam: true,
            animation: false,
            data: [],
          },
          {
            name: "",
            type: "effectScatter",
            coordinateSystem: "geo",

            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: "#f60",
                shadowBlur: 10,
                shadowColor: "#ff3",
              },
            },

            data: [],
            symbolSize: "5",
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            zlevel: 1,
          },
        ],
      };
    },
  },
  mounted() {
    this.initOptions();
  },
  watch: {
    // geoCoordMap: {
    //   handler(val) {
    //     this.chartAgeOptions.series.data[0].value = val[0].value;
    //   },
    //   deep: true,
    //   immediate: false,
    // },
    geoCoordData: {
      handler(val) {
        this.chartAgeOptions.series[1].data = val;
        this.chartAgeOptions.series[2].data = this.convertData(val);
      },
      deep: true,
      immediate: false,
    },
    themeColor: {
      handler(val) {
        this.chartAgeOptions.geo.itemStyle.normal.areaColor =
          echartColor[this.themeColor].areaColor;
        this.chartAgeOptions.geo.itemStyle.normal.borderColor =
          echartColor[this.themeColor].borderColor;
        this.chartAgeOptions.geo.itemStyle.emphasis.areaColor =
          echartColor[this.themeColor].emphasisAreaColor;
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