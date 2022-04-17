<template>
  <div class="card mt-card">
    <chart
      :options="sexOptions"
      autoresize
      class="w-100 h-100"
      ref="sexOptions"
    />
  </div>
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";

export default {
  props: ["ageName", "mage", "fage"],
  watch: {
    ageName: {
      handler(val) {
        this.sexOptions.yAxis[0].data = val;
      },
      immediate: false,
      deep: true,
    },
    mage: {
      handler(val) {
        this.sexOptions.series[0].data = val;
      },
      immediate: false,
      deep: true,
    },
    fage: {
      handler(val) {
        this.sexOptions.series[1].data = val;
      },
      immediate: false,
      deep: true,
    },
  },
  data() {
    return {
      sexOptions: {
        legend: {
          data: ["女", "男"],
          top: 10,
          itemWidth: 15,
          itemHeight: 10,
          left: "10%",
          textStyle: {
            color: "#FFFFFF",
            fontSize: this.fontSize(0.14),
          },
        },
        tooltip: {
          trigger: "axis",
          formatter: function (obj) {
            if (obj.length === 2) {
              let ageName = obj[0].name;
              let maleName = obj[0].seriesName;
              let maleValue = obj[0].value;
              let fmaleName = obj[1].seriesName;
              let fmaleValue = -obj[1].value;
              return (
                ageName +
                "</br>" +
                maleName +
                ":" +
                maleValue +
                "</br>" +
                fmaleName +
                ":" +
                fmaleValue
              );
            } else {
              let ageName = obj[0].name;
              let maleName = obj[0].seriesName;
              let maleValue = Math.abs(obj[0].value);
              return (
                ageName + "</br>" + maleName + ":" + maleValue
              );
            }
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: 25,
          bottom: 10,
          containLabel: true,
        },
        xAxis: {
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            show: true,
            position: "right",
            data: [],
            type: "category",
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#DADADA",
                fontSize: this.fontSize(0.14),
              },
            },
            axisLine: {
              show: true,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "男",
            type: "bar",
            stack: "年龄",
            barWidth: 6,
            label: {
              normal: {
                show: false,
                position: "right",
              },
            },
            data: [],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#00273F",
                  }, //柱图渐变色
                  //柱图渐变色
                  {
                    offset: 1,
                    color: "#108AAA",
                  }, //柱图渐变色
                ]),
              },
            },
          },
          {
            name: "女",
            stack: "年龄",
            type: "bar",
            label: {
              normal: {
                show: false,
                position: "left",
              },
            },
            data: [],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#E24846",
                  }, //柱图渐变色
                  //柱图渐变色
                  {
                    offset: 1,
                    color: "#331300",
                  }, //柱图渐变色
                ]),
              },
            },
          },
        ],
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
};
</script>

<style>
.mt-card .gender {
  position: absolute;
  color: #949494;
}

.mt-card .gender p {
  text-align: center;
  margin: 0;
}

.card {
  width: 100%;
  height: 100%;
}
</style>
