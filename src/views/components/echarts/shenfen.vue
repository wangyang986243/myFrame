<template>
  <div class="card mt-card">
    <chart :options="chartPeopleInCountry" autoresize ref="chartAgeOptions" />
  </div>
</template>

<script>
import ECharts from "@/components/map-chart/dataBoard/index";
export default {
  props:["shenfen"],
  data() {
    return {      
      chartPeopleInCountry: {
        color: ["#00D0FE", "#1265CB", "#1288CB", "#1FF5CB", "#126FFB"],
        legend: {
          orient: "horizontal",
          top: "bottom",
          itemWidth: 16,
          itemHeight: 8,
          data: this.label,
          textStyle: {
            fontSize: 16,
            color: "#FFFFFF",
          }
        },
        series: [
          {
            label: {
              formatter: "{d}%",              
              fontSize: 16
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 16,
                    fontWeight: 'bold'
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
            center: ["50%", "40%"],
            radius: ["35%", "50%"],
            data: this.shenfen
          }
        ]
      }
    };
  },
  computed:{
    label(){
      let shenfenType = [];
      for (let index = 0; index < this.shenfen.length; index++) {
        shenfenType.push(this.shenfen[index].name);        
      }
      return shenfenType;
    }
  }
};
</script>