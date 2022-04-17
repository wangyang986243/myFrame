<template>
  <div id="map" style="width: 100%; height: 100%"></div>
</template>

<script>
//import reliData from '@/assets/mockData/reliData'
export default {
  props: ["reliData", "reliCenter"],
  data() {
    return {
      map: null,
      heatmap: null,
      initradius: 80,
      mapData: [],
      center: "",
    };
  },
  mounted() {
    this.init();
  },

  watch: {
    reliData: {
      handler(val) {
        if (val) {
          this.mapData = JSON.parse(val);
          this.setData();
        }
      },
      immediate: false,
      deep: true,
    },
    reliCenter: {
      handler(val) {
        if (val) {
          this.center = val;
          this.init();
        }
      },
      immediate: false,
      deep: true,
    },
  },

  methods: {
    logMapBounds() {
      var bounds = this.map.getBounds();
    },

    setData() {
      let that = this;

      let bounds = that.map.getBounds().bounds;
      let maxLng = 0;
      let maxLat = 0;
      let minLng = 180;
      let minLat = 180;
      for (let i = 0; i < 4; i++) {
        if (bounds[i].lng > maxLng) {
          maxLng = bounds[i].lng;
        }
        if (bounds[i].lat > maxLat) {
          maxLat = bounds[i].lat;
        }

        if (bounds[i].lng < minLng) {
          minLng = bounds[i].lng;
        }

        if (bounds[i].lat < minLat) {
          minLat = bounds[i].lat;
        }
      }
      let offset = 19 - that.map.getZoom();
      let data = {};
      this.mapData.map((item) => {
        if (
          item.lat > maxLat ||
          item.lat < minLat ||
          item.lng > maxLng ||
          item.lng < minLng
        ) {
          return;
        }
        let lng = Math.round((item.lng / offset) * 10000);
        let lat = Math.round((item.lat / offset) * 10000);
        let key = lng + "|" + lat;
        if (data[key]) {
          data[key].weight += item.weight;
        } else {
          data[key] = {
            weight: item.weight,
            lng: (lng * offset) / 10000,
            lat: (lat * offset) / 10000,
          };
        }
      });

      let data2 = [];
      let keys = Object.keys(data);
      let max = 1;
      keys.map((key) => {
        data2.push(data[key]);
        if (data[key].weight > max) {
          max = data[key].weight;
        }
      });
      that.heatmap.setOptions({
        radius: 10 * Math.pow(that.map.getZoom() / 10.4, 2.8), // 给定半径 10* Math.pow(that.map.getZoom() / 10.4, 2.8)
        opacity: [0.5, 0.8],
        gradient: {
          0.2: "#00548F",
          0.35: "#01A8EC",
          0.5: "#029247",
          0.66: "#F9F706",
          0.84: "#FA9712",
          1.0: "#D32F12",
        },
      });

      that.heatmap.setDataSet(
        { data: data2, max: 3.5 * Math.pow(18 / that.map.getZoom(), 4) },
        {
          lnglat: function (data) {
            return [data.value.lng, data.value.lat];
          },
          value: "weight",
        }
      );
    },
    init() {
      this.map = new AMap.Map("map", {
        features: ["bg", "road", "point", "building"],
        mapStyle: "amap://styles/ebb5795ed9b635da4736f4af93a393c6",
        // center: [119.659648,29.049478],
        center: this.center,
        pitch: 30, //设置俯仰角
        rotation: -15, //设置地图旋转角度

        // zoom: 13.5,
        zoom: 16.8,
        zooms: [10, 18],
        viewMode: "3D",
      });
      let that = this;
      that.map.plugin(["AMap.Heatmap"], function () {
        // 初始化heatmap对象
        that.heatmap = new AMap.Heatmap(that.map, {
          radius: that.initradius, // 给定半径
          opacity: [0.4, 0.8],
          gradient: {
            0.2: "#00548F",
            0.35: "#01A8EC",
            0.5: "#029247",
            0.66: "#F9F706",
            0.84: "#FA9712",
            1.0: "#D32F12",
          },
        });
      });

      setTimeout(() => {
        this.logMapBounds();
      }, 5000);

      that.map.on("zoomchange", () => {
        that.setData();
      });

      that.map.on("moveend", () => {
        that.setData();
      });
    },
  },
};
</script>

<style>
</style>
