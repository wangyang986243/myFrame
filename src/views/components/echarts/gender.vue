<template>
    <div class="card mt-card">
        <chart :options="chartPeopleInCountry" autoresize ref="chartAgeOptions" />
        <img src="../../../assets/images/gender.png" alt />
        <div class="gender">
             <div style="display:flex;"><i class="dian undian"></i><p>男性 <span>{{genderStat&&genderStat.男?genderStat.男.value:0}}</span> <slot></slot></p></div>
             
             <div style="display:flex;"><i class="dian"></i><p>女性 <span>{{genderStat&&genderStat.女?genderStat.女.value:0}}</span> <slot></slot></p></div>
        </div>
    </div>
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";
//标题风格
let titleTextStyle = {
    color: "#FFFFFF",
    fontWeight: "normal",
    fontSize: 17,
    fontFamily: "monospace"
};

//坐标线
let axisLineStyle = {
    lineStyle: {
        color: "#ffffff",
        opacity: 0.14
    }
};

//分割线
let axisSplitLine = {
    lineStyle: {
        color: "#FFFFFF",
        type: "dashed",
        opacity: 0.28
    }
};

//字样式
let axisNameTextStyle = {
    color: "rgba(70,197,251,0.7)"
};

//图例样式
let axisLabelTextStyle = {
    color: "rgba(70,197,251,0.6)"
};

export default {
    props: {
        genderStat: {
            type: Object,
        },
    },
    watch: {
        genderStat: {
            handler(val) {
                if (val) {
                    this.chartPeopleInCountry.series.data[0].value = val.女.value
                    this.chartPeopleInCountry.series.data[1].value = val.男.value
                }

            },
            deep: true,
            immediate: false,
        }
    },
    data() {
        return {
            chartPeopleInCountry: {
                color: ["#21CBFF", "#002D5A"],
                series:
                {
                    itemStyle: {
                        normal: {
                            labelLine: {
                                show: false
                            }
                        }
                    },
                    name: "性别分布",
                    type: "pie",
                    radius: ["60%", "75%"],
                    center: ["30%", "50%"],
                    data: [{ value: 154 }, { value: 154 }],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                }

            }
        };
    }
};
</script>

<style>
.mt-card .gender {
    position: absolute;
    top: 35%;
    left: 53%;
    transform: translateY(-10%);
    color: #FFFFFF;
}
.mt-card .gender p {
    text-align: center;
    font-size: 1rem;
    color: #DADADA;
    margin: 0;
}
.mt-card .gender span {
    font-size: 1rem;
    color: #DADADA;
}

.dian {
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background: #21cbff;
  border-radius: 0.2rem;
  margin: .5rem /* 8/16 */ .3125rem /* 5/16 */ 0 0;
}
.undian {
  background: #002D5A;
  
}
</style>