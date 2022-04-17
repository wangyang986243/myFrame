  <!-- 重点人员年龄分布 -->
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
import echarts from "@/components/map-chart/dataBoard/index";
import echartColor from "@/assets/js/ecahrtColor";


export default {
  props: ["careAgeCountList"],
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
        // backgroundColor: "#031245",
        grid: {
          containLabel: true,
          // left: 20,
          // right: 20,
          // bottom: 10,
          // top: 30,
          left: 20,
          right: 20,
          bottom: 15,
          top: 30,
        },
        xAxis: {
          axisTick: {
            show: false, // 是否显示坐标轴轴线
          },
          axisLabel: {
            color: echartColor[this.themeColor].axisLabelColor,
            fontSize: 11,
            interval: 0,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: echartColor[this.themeColor].xAxisColor,
              width: 1,
            },
            show: true,
          },
          data: ["20以下", "20~30", "30~40", "40~50", "50~60", "60以上"],
          type: "category",
        },
        yAxis: {
          axisTick: {
            show: false, // 是否显示坐标轴轴线
          },
          axisLine: {
            show: false,
          },

          axisLabel: {
            color:echartColor[this.themeColor].axisLabelColor,
            fontSize: 11,
            formatter: function (value) {
              // return value.toLocaleString() + "k";
              return value.toLocaleString();
            },
          },

          splitLine: {
            show: true,
            lineStyle: {
              color: echartColor[this.themeColor].yAxisSplitLineColor,
              type: "dashed",
              opacity: 0.15,
            },
          },

          name: "单位：人数",
          nameTextStyle: {
            color: echartColor[this.themeColor].yAxisNameTextStyleColor,
            fontSize: 11,
          },
        },
        series: [
          {
            data: [],
            type: "bar",
            barWidth: 17,
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: "linear",
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: "#25BAB5",
                  },
                  {
                    offset: 1,
                    color: "#25BAB5",
                  },
                ],
              },
              barBorderRadius: [3, 3, 0, 0],
            },
          },
        ],
        tooltip: {
          trigger: "item",
          // show: true,
          formatter(value) {
            return (
              "年龄: " + value.name + " </br> " + "人数：" + value.value + "人"
            );
          },
          textStyle: {
            color: "#DADADA",
            fontSize: 12,
          },
        },
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
    careAgeCountList: {
      handler(val) {
        this.chartAgeOptions.series[0].data = val;
      },
      deep: true,
      immediate: false,
    },
    themeColor: {
      handler(val) {
        this.chartAgeOptions.xAxis.axisLabel.color =
          echartColor[this.themeColor].axisLabelColor;
        this.chartAgeOptions.xAxis.axisLine.lineStyle.color =
          echartColor[this.themeColor].xAxisColor;
        this.chartAgeOptions.yAxis.axisLabel.color =
          echartColor[this.themeColor].axisLabelColor;
        this.chartAgeOptions.yAxis.splitLine.lineStyle.color =
          echartColor[this.themeColor].yAxisSplitLineColor;
        this.chartAgeOptions.yAxis.nameTextStyle.color =
          echartColor[this.themeColor].yAxisNameTextStyleColor;
       
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