<template>
  <div class="card mt-card">
    <chart :options="chartPeopleInCountry" autoresize ref="chartAgeOptions" />
     <p v-if="typeOption==='zz'" class="czrkjgP">职住同区 {{jiegoutotal}}人</p>
  </div>
</template>

<script>
import echarts from "@/components/map-chart/dataBoard/index";
export default {
  props:{
    pieData:{
      // type: Array,
      // default:[]
    },
    typeOption:"",
    jiegoutotal:{
        type:Number
    }
  },

  mounted() {
    this.initOptions();
    this.initLabel();
  },
  watch:{
    pieData:{
      handler(val){
        this.chartPeopleInCountry.legend.data = val.map((item,index)=>{
          return item.name
        })
        this.chartPeopleInCountry.series[0].data = val;
      },
      deep:true,
      immediate: false
    }
  },
  methods:{
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
        this.chartPeopleInCountry= {
        color: ["#00D0FE", "#1265CB", "#1288CB", "#1FF5CB", "#126FFB"],
        legend: {
          orient: "vertical",
        //   bottom: "-7",
            right:"0",
            top:"0",
            align:"left",
          itemWidth: 16,
          itemHeight: 8,
          data: [],
          textStyle: {
            fontSize: this.fontSize(.12),
            color: "#DADADA",
          }

        },
        series: [
          {
            label: {
              show:false,
              position: 'center',
            //   formatter: "{b}\n{d}%", 
            formatter:"{b}\n{c}人",             
              fontSize: this.fontSize(.12)
            },
            emphasis: {
              label: {
              show: true,
                   color: "#FFFFFF",
                    fontSize: this.fontSize(.12),
                    fontWeight: "normal",
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
            center: ["30%", "50%"],
            radius: ["45%", "70%"],
            data: []
          },
          {
            name:'外边框',
            type:'pie',
           silent:false,        
          legendHoverLink:false,       //是否启用图例 hover 时的联动高亮。
    hoverAnimation:false,
            clockWise:false,
            radius:['80%','80%'],
            center:['30%','50%'],
            labelLine:{
              show:false
            },
            label:{
              show:false
              
            },
            itemStyle:{
                normal:{
                        borderWidth:1,
                        borderColor:'rgba(18, 101, 203, 1)'
                    },
                    opacity:0
            },
            data:[]
          }
        ]
      }
    },
       initLabel(){
           this.chartPeopleInCountry.series[0].data = this.pieData;
           this.chartPeopleInCountry.series[1].data = this.pieData;
      this.chartPeopleInCountry.legend.data = this.pieData.map(item => {
          return item.name
        });
    }
  },
  data() {
    return {    
      chartPeopleInCountry:{},
    };
  }
};
</script>