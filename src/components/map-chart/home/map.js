export default {
  // backgroundColor: '#404a59',
  title: {
    text: '门禁设备分布图',
    // subtext: '截止2019年4月',
    left: 'center',
    top: 20,
    textStyle: {
      color: '#666'
    }
  },
  tooltip : {
    trigger: 'item',
    formatter: function(val){
        let data = val.data;
        return `${val.seriesName}:<br>${data.name}: ${data.value[2]}台`
    }
},
  // legend: {
  //   orient: 'vertical',
  //   y: 'bottom',
  //   x: 'right',
  //   data: ['device'],
  //   textStyle: {
  //     color: '#666'
  //   }
  // },
  geo: {
    map: 'china',
    label: {
      emphasis: {
        show: false
      }
    },
    itemStyle: {
      normal: {
        areaColor: 'rgba(100,100,100,.4)',
        borderColor: '#999'
      },
      emphasis: {
        areaColor: 'rgba(100,100,100,.5)'
      }
    },
    center: [99.00, 37.00]
  },
  series: 
    {
      // name: 'Top 5',
      name: '设备数量',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      // data: convertData(mapData.sort((a, b) => b.value - a.value).slice(0, 11)),
      data: [],
      // symbolSize: val => val[2] / 6,
      symbolSize:"",
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#f60',
          shadowBlur: 10,
          shadowColor: '#ff3'
        }
      },
      zlevel: 1
    }
}