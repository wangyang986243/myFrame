<template>
  <div class="card mt-card">
    <chart :options="chartPeopleInCountry" autoresize ref="chartAgeOptions" />
    <slot></slot>
    <div class="gexinghua">
      <p>
        <i class="dian"></i> <slot name="header"></slot>
        <span>{{ firstnum }}%</span>
      </p>
      <p>
        <i class="dian undian"></i> <slot name="footer"></slot>
        <span>{{ secondnum }}%</span>
      </p>
    </div>
  </div>
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";

//坐标线
let axisLineStyle = {
  lineStyle: {
    color: "#ffffff",
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
  props: ["img2", "img3", "DataList", "carList", "FinanceList", "FitnessList"],
  watch: {
    DataList: {
      handler(val) {
        this.chartPeopleInCountry.series.data[0].value = val[0].percent;
        this.chartPeopleInCountry.series.data[1].value = val[1].percent;
      },
      deep: true,
      immediate: false,
    },

    carList: {
      handler(val) {
        this.chartPeopleInCountry.series.data[0].value = val.有车;
        this.firstnum = val.有车;
        this.chartPeopleInCountry.series.data[1].value = val.没车;
        this.secondnum = val.没车;
      },
      deep: true,
      immediate: false,
    },

    FinanceList: {
      handler(val) {
        this.chartPeopleInCountry.series.data[0].value = val.理财;
        this.firstnum = val.理财;
        this.chartPeopleInCountry.series.data[1].value = val.不理财;
        this.secondnum = val.不理财;
      },
      deep: true,
      immediate: false,
    },

    FitnessList: {
      handler(val) {
        this.chartPeopleInCountry.series.data[0].value = val.健身;
        this.firstnum = val.健身;
        this.chartPeopleInCountry.series.data[1].value = val.不健身;
        this.secondnum = val.不健身;
      },
      deep: true,
      immediate: false,
    },
  },
  data() {
    return {
      firstnum: "",
      secondnum: "",
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
          name: "",
          type: "pie",
          radius: ["55%", "63%"],
          center: ["50%", "40%"],
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
.dian {
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background: #21cbff;
  border-radius: 0.2rem;
}
.undian {
  background: #002d5a;
}
.mt-card {
  position: relative;
  width: 100%;
}
.mt-card .gexinghuaimg {
  position: absolute;
  top: 34%;
  left: 50%;
  width: 29%;
  height: 12%;
  transform: translate(-50%);
}
.mt-card .gexinghua {
  width: 100%;
  position: absolute;
  top: 72%;
  transform: translateY(-10%);
  color: #ffffff;
}
.mt-card .gexinghua p {
  text-align: center;
  font-size: 1rem;
  color: #dadada;
  margin: 0;
}
.mt-card .gexinghua span {
  font-size: 1rem;
  color: #dadada;
}
</style>