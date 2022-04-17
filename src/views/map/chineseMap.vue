<template>
  <div class="map">
    <div class="item">
      <ChineseMap
        class="chineseMap"
        :geoCoordMap="geoCoordMap"
        :geoCoordData="geoCoordData"
        :title="'中国地图'"
        autoresize
      ></ChineseMap>
    </div>
    <div class="item">
      <ChineseMapWithImage
        class="chineseMap"
        :geoCoordMap="geoCoordMap"
        :geoCoordData="geoCoordData"
        :title="'中国地图'"
        autoresize
      ></ChineseMapWithImage>
    </div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</template>

<script>
import ChineseMap from "../components/echarts/chineseMap.vue";
import ChineseMapWithImage from "../components/echarts/ChineseMapWithImage.vue";
export default {
  components: { ChineseMap, ChineseMapWithImage },
  data() {
    return {
      geoCoordMap: {}, //设备分布map 数据
      geoCoordData: [], //设备分布map 数据
    };
  },
  created() {
    setInterval(() => {
      this.geoCoordMap = {
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        上海: [121.4648, 31.2891],
      };
      this.geoCoordData = [
        { name: "上海", value: 24 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 },
      ];
    });
  },
};
</script>

<style lang="scss" scoped>
.map {
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  height: 100%;
  .item {
    width: 50%;
    height: 50%;
  }
}
</style>>
