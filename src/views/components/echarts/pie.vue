<template>
  <div class="card mt-card">
    <chart :options="chartPeopleInCountry" autoresize ref="chartAgeOptions" />
  </div>
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";
export default {
  props: {
    pieData: {
      // type: Array,
      // default:[]
    },
  },

  mounted() {
    this.initOptions();
  },
  watch: {
    pieData: {
      handler(val) {
        this.chartPeopleInCountry.legend.data = val.map((item, index) => {
          return item.name;
        });
        this.chartPeopleInCountry.series[0].data = val;
      },
      deep: true,
      immediate: false,
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
      this.chartPeopleInCountry = {
        color: ["#00D0FE", "#1265CB", "#1288CB", "#1FF5CB", "#126FFB"],
        legend: {
          orient: "horizontal",
          bottom: "-7",
          itemWidth: 16,
          itemHeight: 8,
          data: [],
          textStyle: {
            fontSize: this.fontSize(0.14),
            color: "#DADADA",
          },
        },
        series: [
          {
            type: "pie",
            radius: ["45%", "70%"],
            center: ["50%", "40%"],
            data: [],
            label: {
              fontSize: this.fontSize(0.16),
              // show:false,
              // formatter: "{b}\n{d}%",
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
                  borderRadius: this.fontSize(0.1),
                  fontSize: this.fontSize(0.14),
                  backgroundColor: "#02172D", // 覆盖index=0时的数据
                },
                nm: {
                  color: "#FFFFFF",
                  width: this.fontSize(0.5),
                  height: this.fontSize(0.25),
                  fontSize: this.fontSize(0.14),
                  borderRadius: this.fontSize(0.1),
                  backgroundColor: "#02172D", // 覆盖index=0时的数据
                },
              },
            },

            itemStyle: {
              normal: {
                borderWidth: 3,
                borderColor: "#000308",
              },
            },
            labelLine: {
              show: false,
              length: 0,
              length2: 4,
            },
          },
        ],
      };
    },
  },
  data() {
    return {
      chartPeopleInCountry: {},
    };
  },
};
</script>

