/*
 * @Author: wangyang wangyang11171212@163.com
 * @Date: 2022-06-28 14:43:17
 * @LastEditors: wangyang wangyang11171212@163.com
 * @LastEditTime: 2022-06-28 15:54:55
 * @FilePath: \myFrame\src\main.js
 * @Description: 入口文件
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import "@/assets/css/base.css"
import "@/assets/css/listPage.css"
import "@/assets/css/element.css"
import "@/assets/css/font-family.css"
import '@/assets/scss/index.scss' // global css
import '@/icons'
import "@/charts"
import getNowTime from './assets/js/getNowTime'

import { _post, _get, _delete, _put, _patch } from '@/axios/func'
import Utils from "@/utils";
import Config from "@/config";

import App from '@/App'
import router from '@/router'
import store from '@/store'
import BaseVue from "@/views/common/base.vue"
import AMap from "vue-amap"
import './assets/js/flexible'

Vue.use(ElementUI, { size: 'small' });
Vue.use(AMap);
AMap.initAMapApiLoader({
    key: '602802b30789678bab276a6def3feffa',
    // 插件集合 （插件按需引入）
    plugin: [
        "AMap.Autocomplete", //输入提示插件
        "AMap.PlaceSearch", //POI搜索插件
        "AMap.Scale", //右下角缩率图插件 比例尺
        "AMap.OverView",//地图鹰眼插件
        "AMap.ToolBar",//地图工具条
        "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
        "AMap.PolyEditor", //圆形编辑器插件
        "AMap.Geolocation", //定位控件，用来获取和展示用户主机所在的经纬度位置
        "AMap.Heatmap" //热力图
    ],
    uiVersion: "1.0.11", // ui库版本，不配置不加载,
    v: "1.4.4"
});
Vue.config.productionTip = false;
Vue.prototype.$Axios = { _post, _get, _delete, _put, _patch };
Vue.prototype.$Utils = Utils;
Vue.prototype.$Config = Config;
Vue.prototype.$getNowTime = getNowTime
//按钮权限
Vue.prototype.$_has = function (value) {
    let isExist = false;
    let buttonpermsStr = sessionStorage.getItem("buttenpremissions");
    console.log('buttonpermsStr', buttonpermsStr);
    if (buttonpermsStr == undefined) {
        return false;
    }
    if (buttonpermsStr.indexOf(value) > -1) {
        isExist = true;
    }
    console.log('isExist', isExist);
    return isExist;
};

const ChildVue = Vue.extend(BaseVue);
new ChildVue({
    el: '#app',
    router,
    store,
    render: h => h(App),
}).$mount('#app');
