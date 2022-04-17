<template>
  <chart
    :options="option"
    autoresize
    style="width: 100%; height: 100%"
    ref="chart"
  />
</template>

<script>
import echarts from "@/components/map-chart/home/index";
export default {
  components: {
    chart: echarts,
  },
  props: ["moveInfo", "moveLines"],
  data() {
    return {
      MoveLine: [],
      QianchuLine: [],
      option: {},
    };
  },

  watch: {
    moveLines: {
      handler(val) {
        this.option.series[1].data = val;
      },
      immediate: false,
      deep: true,
    },

    moveInfo: {
      handler(val) {
        this.covertCity();
      },
      immediate: false,
      deep: true,
    },
  },

  created() {
    this.getOptions();
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

    coverSymbolSize(score) {
      if (score > 10000) {
        return 22;
      } else if (score > 5000) {
        return 18;
      } else if (score > 2000) {
        return 15;
      } else if (score > 1000) {
        return 12;
      } else if (score > 500) {
        return 9;
      } else if (score > 300) {
        return 7;
      } else if (score > 200) {
        return 6;
      } else if (score > 100) {
        return 5;
      } else {
        return 4;
      }
    },

    covertCity() {
      let city = [];
      if (this.moveInfo && this.moveInfo.length > 0) {
        let _moveInfo = [].concat(this.moveInfo);
        _moveInfo.map((item) => {
          city.push({
            name: item.city + " " + item.score,
            value: [item.lon, item.lat],
            symbolSize: 1 + 1.3 * this.coverSymbolSize(item.score),
          });
        });
      }

      city.push({
        name: "湖州市",
        value: [120.08, 30.9],
        symbolSize: 1,
      });

      this.option.series[0].data = city;
    },

    getOptions() {
      this.option = {
        animationDuration: function (idx) {
          // 越往后的数据时长越大
          return 2000;
        },
        animationDurationUpdate: function (idx) {
          // 越往后的数据时长越大
          return 2000;
        },
        legend: {
          // 右下角图例
          show: false, // 是否显示
          orient: "vertical", // 图例排列方向
          top: "bottom", // 位置
          left: "right", // 位置
          data: ["地点", "线路"], // 数据
          textStyle: {
            // 文字设置
            color: "#fff",
          },
        },
        geo: {
          show: true, // 是否显示
          map: "china", // 地图类型。world世界地图，china中国地图
          //center: [96.964245, 35.525943], //当前视角的中心点，用经纬度表示
          center: [111.3, 31.6],
          zoom: 2.8,
          label: {
            normal: {
              //普通状态下的标签文本样式。(省份名称)
              show: false, //是否在普通状态下显示标签。
              textStyle: {
                // 文字设置
                color: "#fff",
              },
            },
            emphasis: {
              // 是否在高亮状态下显示标签。(省份名称)
              show: true,
              textStyle: {
                // 文字设置
                color: "#fff",
              },
            },
          },
          roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
          itemStyle: {
            // 地图板块区域的多边形 图形样式
            normal: {
              // 默认板块信息
              borderColor: "rgba(100,149,237,1)",
              borderWidth: 0.5,

              areaColor: "#001124",
              // borderColor: '#404a59'
            },
            emphasis: {
              // 高亮版板块信息
              areaColor: "#2a333d",
            },
          },
        },
        series: [
          {
            name: "地点",
            type: "effectScatter", // 特效散点图
            coordinateSystem: "geo", // 'cartesian2d'使用二维的直角坐标系。'geo'使用地理坐标系
            zlevel: 2, // 所有图形的 zlevel 值。
            rippleEffect: {
              //涟漪特效相关配置。
              brushType: "stroke", //波纹的绘制方式，可选 'stroke' 和 'fill'。
              period: 400, // 动画的时间。
              scale: 3, // 动画中波纹的最大缩放比例。
            },
            label: {
              normal: {
                show: false, //是否显示标签。
                position: "inside", //标签的位置。// 绝对的像素值[10, 10],// 相对的百分比['50%', '50%'].'top','left','right','bottom','inside','insideLeft','insideRight','insideTop','insideBottom','insideTopLeft','insideBottomLeft','insideTopRight','insideBottomRight'
                //offset: [30, 40],             //是否对文字进行偏移。默认不偏移。例如：[30, 40] 表示文字在横向上偏移 30，纵向上偏移 40。
                formatter: "{b}", //标签内容格式器。模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
              },
              emphasis: {
                show: true,
                position: "right",
                formatter: "{b}",
                textStyle: {
                  // 文字设置
                  color: "#fff",
                  fontSize: 15,
                },
              },
            },
            symbolSize: 1.4, // 标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
            showEffectOn: "render", // 配置何时显示特效。可选：'render' 绘制完成后显示特效。'emphasis' 高亮（hover）的时候显示特效。
            itemStyle: {
              // 图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              normal: {
                color: "#46bee9",
              },
            },
            data: [],
          },
          {
            name: "线路",
            type: "lines",
            coordinateSystem: "geo", // 'cartesian2d'使用二维的直角坐标系。'geo'使用地理坐标系
            zlevel: 2,
            large: true, // 是否开启大规模散点图的优化，在数据图形特别多的时候（>=5k）可以开启。开启后配合 largeThreshold 在数据量大于指定阈值的时候对绘制进行优化。缺点：优化后不能自定义设置单个数据项的样式。
            effect: {
              show: true,
              constantSpeed: 40, // 点移动的速度
              symbol: "pin", // 图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
              symbolSize: 4, // 标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
              trailLength: 0, // 线的宽度
            },
            lineStyle: {
              // 线的颜色、宽度，样式设置
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#0EFFFF",
                    },
                    {
                      offset: 1,
                      color: "#0091FF",
                    },
                  ],
                  false
                ),
                width: 1.5, // 线的宽度
                opacity: 0.3, // 线的透明度
                curveness: 0.2, // 线的完全程度
              },
            },
            data: [],
          },
        ],
      };
    },
  },
};
</script>

<style>
</style>
