<template>
  <div class="card mt-card">
    <chart :options="chartPeopleInCountry" autoresize ref="chartAgeOptions" />
  </div>
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";
export default {
  data() {
    return {
      chartPeopleInCountry: {
        color: ["#00D0FE", "#1265CB"],
        legend: {
          orient: "horizontal",
          top: "bottom",
          itemWidth: 16,
          itemHeight: 8,
          data: ["自住", "出租", "仓库", "工商业"],
          textStyle: {
            fontSize: this.fontSize(0.14),
            color: "#FFFFFF"
          }
        },
        series: [
          {
            label: {
              formatter: "{c}%",
              fontSize: this.fontSize(0.14)
            },
            emphasis: {
              label: {
                show: true,
                fontSize: this.fontSize(0.14),
                fontWeight: "bold"
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 3,
                borderColor: "#000308"
              }
            },
            labelLine: {
              show: false,
              length: 0,
              length2: 4
            },
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            radius: ["35%", "50%"],
            data: [
              { value: 60, name: "自住" },
              { value: 28, name: "出租" },
              { value: 6, name: "仓库" },
              { value: 6, name: "工商业" }
            ]
          }
        ]
      }
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
    }
  }
};
</script>