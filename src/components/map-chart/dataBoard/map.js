export default {
  title: {
    text: '居民户籍分布',
    left: 'center',
    top: 20,
    textStyle: {
      color: "#46c5fb",
      fontWeight: "normal",
      fontSize: 16
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: function (val) {
      let data = val.data;
      return `${val.seriesName}:<br>${data.name}: ${data.value[2]}`
    }
  },
  geo: {
    map: 'china',
    label: {
      emphasis: {
        show: false
      }
    },
    itemStyle: {
      normal: {
        areaColor: "rgba(0,20,60,.7)",
        borderColor: 'rgba(70,197,251,.6)'
      },
      emphasis: {
        areaColor: 'rgba(70,197,251,.4)'
      }
    },
    center: [96.00, 36.00]
  },
  series: {
    // name: 'Top 5',
    name: '户籍人数',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    // data: convertData(mapData.sort((a, b) => b.value - a.value).slice(0, 11)),
    data: [],
    // symbolSize: val => val[2] / 100,
    // symbolSize: val => (val[2] < 100) ? 5 : (val[2] / 200),
    symbolSize: 4,
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
        color: '#7bffff',
        shadowBlur: 10,
        shadowColor: '#fff'
      }
    },
    zlevel: 1
  }
}