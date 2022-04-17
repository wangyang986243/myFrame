<template>
  <chart :options="chartPeopleInCountry" autoresize ref="chartAgeOptions" />
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";
export default {
  props: {
    echartData: {
      type: Array,
    },
  },
  watch: {
    echartData: {
      handler(val) {
        //y轴 日期去重
        let dates = val.map((item) => {
          return item.date;
        });
        this.chartPeopleInCountry.xAxis[0].data = Array.from(new Set(dates));
        let arr = [
          {
            name: "物业报修",
            type: "bar",
            emphasis: { focus: "series" },
            data: [],
          },
          {
            name: "意见建议",
            type: "bar",
            emphasis: { focus: "series" },
            data: [],
          },
          {
            name: "特惠家政",
            type: "bar",
            emphasis: { focus: "series" },
            data: [],
          },
        ];
        for (let i = 0; i < val.length; i++) {
          if (val[i].type === "wybx") {
            arr[0].data.push(val[i].value);
          } else if (val[i].type === "yjjy") {
            arr[1].data.push(val[i].value);
          } else if (val[i].type === "thjz") {
            arr[2].data.push(val[i].value);
          }
        }
        this.chartPeopleInCountry.series[0].data = arr[0].data;
        this.chartPeopleInCountry.series[1].data = arr[1].data;
        this.chartPeopleInCountry.series[2].data = arr[2].data;
      },
      deep: true,
      immediate: false,
    },
  },
  data() {
    return {
      chartPeopleInCountry: {},
    };
  },
  mounted() {
    this.initOptions();
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
        color: [
          new echarts.graphic.LinearGradient(1, 0.8, 0.4, 0, [
            { offset: 0, color: "#00273F" },
            { offset: 1, color: "#33D0FA" },
          ]),
          new echarts.graphic.LinearGradient(1, 0.8, 0.4, 0, [
            { offset: 0, color: "#00273F" }, //柱图渐变色
            //柱图渐变色
            { offset: 1, color: "#10AA9A" }, //柱图渐变色
          ]),
          new echarts.graphic.LinearGradient(1, 0.8, 0.4, 0, [
            { offset: 0, color: "#00273F" }, //柱图渐变色
            //柱图渐变色
            { offset: 1, color: "#FFA502" }, //柱图渐变色
          ]),
        ],

        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle: {
            color: "#DADADA",
            fontSize: this.fontSize(0.12),
          },
          formatter: function (obj) {
            let timeName = obj[0].name;
            let wybxName = obj[0].seriesName;
            let wybxValue = obj[0].value;
            let yjjybxName = obj[1].seriesName;
            let yjjyValue = obj[1].value;
            let thjzName = obj[2].seriesName;
            let thjzValue = obj[2].value;
            return (
              timeName +
              "</br>" +
              wybxName +
              ":" +
              wybxValue +
              "</br>" +
              yjjybxName +
              ":" +
              yjjyValue +
              "</br>" +
              thjzName +
              ":" +
              thjzValue
            );
          },
        },
        legend: {
          data: ["物业报修", "意见建议", "特惠家政"],
          itemWidth: 8,
          itemHeight: 8,
          right: "0%",
          textStyle: {
            color: "#DADADA",
            fontSize: this.fontSize(0.12),
          },
        },
        grid: {
          left: "5%",
          bottom: "5%",
          right: "10%",
          top: "15%",
          containLabel: true,
        },
        xAxis: [
          {
            data: [],
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#FFFFFF",
                opacity: 0.12,
              },
            },
            axisLabel: {
              color: "#DADADA",
              fontSize: this.fontSize(0.12),
            },
          },
        ],
        yAxis: [
          {
            name: "次",
            nameLocation: "end",
            nameTextStyle: {
              padding: [0, 0, 0, -22],
              align: "left",
              color: "#949494",
              fontSize: this.fontSize(0.12),
            },
            type: "value",
            splitLine: {
              lineStyle: {
                color: "#FFFFFF",
                type: "dashed",
                opacity: 0.15,
              },
            },
            axisLabel: {
              color: "#DADADA",
              fontSize: this.fontSize(0.12),
            },
            axisTick: false,
          },
        ],
        series: [
          {
            name: "物业报修",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              barBorderRadius: [2, 2, 0, 0],
            },
            data: [],
          },
          {
            name: "意见建议",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              barBorderRadius: [2, 2, 0, 0],
            },
            data: [],
          },
          {
            name: "特惠家政",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              barBorderRadius: [2, 2, 0, 0],
            },
            data: [],
          },
        ],
      };
    },
  },
};
</script>

<style lang="stylus"></style>