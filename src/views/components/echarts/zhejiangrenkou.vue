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
var data = [];
export default {
  props: {
    xiaoquList: {
      type: Array,
    },
    hzsryList: {
      type: Array,
    },
    cxfsList: {
      type: Array,
    },
  },
  watch: {
    xiaoquList: {
      handler(val) {
        this.chartAgeOptions.series[0].data = val.map((item) => {
          return { name: item.countItemsName, value: item.countNum };
        });
        this.chartAgeOptions.legend.data = val.map((item) => {
          return item.countItemsName;
        });
      },
      immediate: false,
      deep: true,
    },
    hzsryList: {
      handler(val) {
        this.chartAgeOptions.series[0].data = val.map((item) => {
          return { name: item.countItemsName, value: item.countNum };
        });
        this.chartAgeOptions.legend.data = val.map((item) => {
          return item.countItemsName;
        });
      },
      deep: true,
      immediate: false,
    },
    cxfsList: {
      handler(val) {
        this.chartAgeOptions.series[0].data = val.map((item) => {
          return { name: item.countItemsName, value: item.countNum };
        });
      },
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
          "#474DAE",
          "#1265CB",
          "#00D0FE",
          "#7A48A8",
          "#43A963",
          "rgba(250,250,250,0.3)",
          "#1FF5CB",
        ],
        legend: {
          orient: "horizontal",
          top: "bottom",
          itemWidth: 16,
          itemHeight: 8,
          data: [],
          textStyle: {
            fontSize: 14,
            color: "#DADADA",
            fontSize: this.fontSize(0.14),
          },
        },

        series: [
          // 主要展示层的
          {
            radius: ["35%", "50%"],
            center: ["50%", "30%"],
            type: "pie",
            name: "人口来源",
            data: data,
            labelLine: {
              normal: {
                show: false,
              },
            },

            label: {
              fontSize: this.fontSize(0.16),
              position: "center",
              formatter: function (params) {
                // 默认显示第一个数据
                if (params.dataIndex === 0) {
                  return (
                    "{p|" + params.name + "}" + "\n{nm|" + params.percent + "%}"
                  );
                } else {
                  return "";
                }
              },
              emphasis: {
                formatter: function (params) {
                  if (params.dataIndex != 0) {
                    return (
                      "{p|" +
                      params.name +
                      "}" +
                      "\n{nm|" +
                      params.percent +
                      "%}"
                    );
                  }
                },
              },
              rich: {
                p: {
                  color: "#FFFFFF",

                  width: this.fontSize(0.5),
                  height: this.fontSize(0.25),
                  fontSize: this.fontSize(0.14),
                  borderRadius: this.fontSize(0.1),
                  backgroundColor: "#010916", // 覆盖index=0时的数据
                },
                nm: {
                  color: "#FFFFFF",
                  width: this.fontSize(0.5),
                  height: this.fontSize(0.25),
                  fontSize: this.fontSize(0.14),
                  borderRadius: this.fontSize(0.1),
                  backgroundColor: "#010916", // 覆盖index=0时的数据
                },
              },
            },
          },
          // 边框的设置
          {
            radius: ["53%", "54%"],
            center: ["50%", "30%"],
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
      legnth: "",
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