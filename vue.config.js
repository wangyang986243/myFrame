const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '.', dir);
}

const host_prod = 'http://121.5.102.127'//生产环境
const host_test = 'http://121.5.102.127'//测试环境
const host_local = 'http://121.5.102.127'//本地环境


module.exports = {
    outputDir: 'dist/zt', //中台
    publicPath: isProduction ? '/zt/' : '/', //中台
    configureWebpack: config => {
        if (!isProduction) { // 开发环境配置
            config.devtool = 'eval-source-map'
        }
        if (isProduction) {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css/, //匹配文件名
                        threshold: 10240, //对超过10k的数据压缩
                        deleteOriginalAssets: false //不删除源文件
                    }),
                ]
            }
        }
    },
    productionSourceMap: true, //关闭生产映射
    devServer: {
        proxy: {
            '/c-api': {
                //    target: 'http://122.225.126.183:28081',//生产
                //    target: 'http://122.225.126.179:28081',//测试
                //    target: 'https://jh-dev.meishutech.com:18089',//金华
                //    target: 'http://121.5.102.127',//中台
                target: host_prod,
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/c-api': '/c-api'
                }
            },
            '/c-api/c-api': {
                //    target: 'http://122.225.126.183:28081',//生产
                //    target: 'http://122.225.126.179:28081',//测试
                //    target: 'https://jh-dev.meishutech.com:18089',//金华
                //    target: 'http://121.5.102.127',//中台
                target: host_prod,
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/c-api/c-api': '/c-api'
                }
            },
        }
    },
    chainWebpack: config => {
        const svgRule = config.module.rule('svg');
        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear();
        // 添加要替换的 loader
        svgRule.use('svg-sprite-loader').loader('svg-sprite-loader').options({
            symbolId: 'icon-[name]'
        })
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            videojs: 'video.js'
        }]);
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],
    css: {
        loaderOptions: {
            css: {
                // options here will be passed to css-loader
            },
            postcss: {
                // options here will be passed to postcss-loader
                plugins: [require('postcss-px2rem')({
                    remUnit: 16 //1rem=75px，这里是设计稿的尺寸是750px
                })]
            }
        }
    },
};