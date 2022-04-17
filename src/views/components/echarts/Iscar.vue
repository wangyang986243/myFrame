<template>
  <div class="card mt-card">
    <chart :options="chartPeopleInCountry" autoresize ref="chartAgeOptions" />
    <img src="../../../assets/images/car.png" alt />
    <div class="iscar">
      <p>
        有车
        <span>{{carStat&&carStat.有车?carStat.有车.value:0}}</span>
        <slot></slot>
      </p>
      <p>
        无车
        <span>{{carStat&&carStat.没车?carStat.没车.value:0}}</span>
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";

//坐标线
let axisLineStyle = {
  lineStyle: {
    color: "#FFFFFF",
    opacity: 0.14,
  },
};

//分割线
let axisSplitLine = {
  lineStyle: {
    color: "#FFFFFF",
    type: "dashed",
    opacity: 0.28,
  },
};

//字样式
let axisNameTextStyle = {
  color: "rgba(70,197,251,0.7)",
};

//图例样式
let axisLabelTextStyle = {
  color: "rgba(70,197,251,0.6)",
};

export default {
  props: ["carStat"],
  watch: {
    carStat: {
      handler(val) {
        this.chartPeopleInCountry.series.data[0].value = val.有车.value;
        this.chartPeopleInCountry.series.data[1].value = val.没车.value;
      },
      deep: true,
      immediate: false,
    },
  },
  data() {
    return {
      chartPeopleInCountry: {
        color: ["#21CBFF", "#002D5A"],
        series: {
          itemStyle: {
            normal: {
              labelLine: {
                show: false,
              },
            },
          },
          name: "性别分布",
          type: "pie",
          radius: ["35%", "40%"],
          center: ["20%", "50%"],
          data: [{ value: 154 }, { value: 154 }],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      },
    };
  },
};
</script>

<style>
.mt-card {
  position: relative;
  width: 100%;
}
.mt-card img {
  position: absolute;
  top: 38%;
  left: 30%;
  width: 13%;
  height: 26%;
  transform: translate(-50%);
}
.mt-card .iscar {
  position: absolute;
  top: 35%;
  color: #ffffff;
  left: 40%;
  transform: translateY(-10%);
}
.mt-card .iscar p {
  text-align: center;
  font-size: 1rem;
  margin: 0;
}
.mt-card .iscar span {
  font-size: 1rem;
  color: #ffffff;
}
</style>