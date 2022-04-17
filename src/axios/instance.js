import axios from 'axios';
import Config from '@/config';
import Utils from '@/utils';
import {
    Message,
    Loading
} from 'element-ui';
import store from '@/store';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// loading 标记
let needLoadingRequestCount = 0;

function showFullScreenLoading(message) { // 启用loading
    if (needLoadingRequestCount === 0) {
        startLoading(message);
    }
    needLoadingRequestCount++
}

function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

let loading;

function startLoading(message = '加载中...') {
    loading = Loading.service({
        lock: true,
        text: message,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.2)"
    });
}

function endLoading() {
    loading.close()
}
axios.defaults.withCredentials = true;
let instance = axios.create({
    baseURL: Config.axiosBaseUrl,
    timeout: Config.defaultTimeout,
    withCredentials: true
});

// request 请求拦截器
instance.interceptors.request.use(
    config => {
        config.cancelToken = source.token; // 全局添加cancelToken
        config.headers['Content-Type'] = 'application/json; charset=utf-8';
        config.headers['Cache-Control'] = 'no-cache'
        if (Config.header) {
            Config.header.map(item => {
                config.headers[item.key] = item.value
            })

        }
        // 请求前进行拦截, 验证是否已经登录等
        const token = Utils.getToken();
        if (token) {
            if (token && config.url.indexOf('/login') === -1) {
                config.headers.common['Authorization'] = token;
            }
        }
        if (config.contentType) {
            config.headers['Content-Type'] = config.contentType
        }
        if (config.method === 'get') { //get请求加时间戳，解决 ie11 下不刷新的bug
            let flag = config.url.indexOf('?') !== -1 ? '&' : '?';
            let url = `${config.url}${flag}timestamp=${new Date().getTime()}`;
            config.url = encodeURI(url);
        }
        if (config.showLoading) {
            showFullScreenLoading(config.loadingMessage)
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// response 响应拦截器
instance.interceptors.response.use(
    response => {
        // 对响应结果统一处理 // 静默 更新token
        if (response.headers['authorization']) {
            Utils.setToken(response.headers['authorization'], 1);
            store.commit('SET_TOKEN', response.headers['authorization']);
        }
        if (response.config.showLoading) {
            tryHideFullScreenLoading()
        }

        let res = {
            status: response.status,
            result: response.data,
        }
        response = null
        return res
    },
    error => {
        if (error.config.showLoading) {
            tryHideFullScreenLoading();
        }
        switch (error.response && error.response.status) {
            case 401:
                source.cancel(); // 取消其他正在进行的请求
                Message({
                    message: '登录已过期, 请重新登录',
                    type: 'error',
                    duration: 3 * 1000
                });
                // window.location.href = "https://jh-dev.meishutech.com:18089/jh/#/login";
                this.$router.replace({
                    path: "/login",
                });
                // store.dispatch('FedLogOut').then(() => {
                //     setTimeout(() => {
                //         location.reload() // 为了重新实例化vue-router对象 避免bug
                //     }, 500)
                // });
                break;
            case 502:
                source.cancel(); // 取消其他正在进行的请求
                Message({
                    message: error.response.data.msg || "服务器出错, 请联系管理员",
                    type: 'error',
                    duration: 3 * 1000
                });
                break;
            default:
                Message({
                    message: error.response.data.msg || "系统出错, 请稍后再试",
                    type: 'error',
                    duration: 3 * 1000
                });
        }
        if (axios.isCancel(error)) { // 取消请求的情况下，中断Promise调用链
            return new Promise(() => { });
        } else {
            return Promise.reject(error);
        }
    }
);

export default instance;
