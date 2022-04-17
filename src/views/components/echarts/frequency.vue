<template>
  <div class="card mt-card">
    <chart
      :options="chartAgeOptions"
      autoresize
      class="w-100 h-100"
      ref="chartAgeOptions"
      id="Mycharts"
    />
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
    opacity: 0.15,
  },
};
export default {
  props: ["traffic"],
  data() {
    return {
      highIndex: 1,
      chartAgeOptions: {},
      paramslist:[]
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
    initOptions() {
      this.chartAgeOptions = {
          color:["#fff"],
          tooltip:{
            backgroundColor: ['rgba(0, 208, 254, 0.2)'],
            formatter:function(obj){
              var value=obj.value
              return value[0]+'天内'+'<br/>有'+value[2]+'人<br/>到访过'+value[1]+'次'

            },
             borderColor:'rgba(0, 0, 0, 0.8)',
              borderWidth: 1
          },
          xAxis:{
              name:'天',
             nameLocation: "end",
            nameTextStyle: {
                align: "left",
                color: "#DADADA",
                fontSize: this.fontSize(0.12),
            },
             axisLabel: {
              color: "#DADADA",
              fontSize: this.fontSize(0.12),
            },
            splitLine:{
                show:false
            }
          },
          yAxis:{
            name: `单位\n(次)`,
            nameLocation: "end",
            nameTextStyle: {
              padding: [0, 0, 0, -12],
              align: "left",
              color: "#949494",
              fontSize: this.fontSize(0.12),
            },
            axisTick:false ,
             axisLine: axisLineStyle,
            axisLabel: {
              color: "#DADADA",
              fontSize: this.fontSize(0.12),
            },
            splitLine: axisSplitLine
          }, 
        series:[{
            name:'visit',
            data: [],
            symbolSize:function (data) {
              if(data[2]>=5000){
                var a =Math.floor(data[2]/33)
                return Math.floor(data[2]/a)
              }else{
                return Math.floor(data[2]/150)
              }
               
           },
            type:'scatter',
            itemStyle:{    
              color:"rgba(0, 208, 254, 0.2)",
              borderColor:'#00D0FE',
              borderWidth: 1,
              }   
        }],
        grid:{
            show:false,
            
        }
      };
    },
    // initLabel(){
    //   this.chartAgeOptions.series[0].data = this.traffic.map(item => {
    //      return item
    //     });
        //  this.chartAgeOptions.series[0].symbolSize=this.traffic.map(item => {

        //   return item[2]/100
        // });
    // }
  },
  mounted() {
    this.initOptions();
    // this.initLabel();


  },
  watch: {
    traffic: {
      handler(val) {
        this.chartAgeOptions.series[0].data = val.map(item => {
          return item
        });
      },
      deep: true,
      immediate: false,
    },
  },
};
</script>

<style scope>
.card {
  width: 100%;
  height: 100%;
}
p.czrkjgP{
    color:#fff;
    font-size:14px;
    text-align: center;
}
</style>