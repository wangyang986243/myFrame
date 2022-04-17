//此处动态路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Utils from '@/utils';
import routes from './routes'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'

Vue.use(VueRouter);
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
const router = new VueRouter({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
});

const whiteList = ['/login']; // 不重定向白名单

router.beforeEach((to, from, next) => {
    // 保存上次的路由
    store.dispatch('setLastView', from);
    NProgress.start();
    let href = window.location.href;

    //判断页面是否是从其他地方跳转过来,并存url上获取token
    if (href.indexOf("token") != -1) {
        let token = href.match(/(?:token\=)([^\=\&\#\/]+)/)[1]
        Utils.setToken(token, 1)
        console.log('跳转页面，获取token', Utils.getToken())
    }
    
    if (Utils.getToken()) {
        console.log('有token', Utils.getToken())

        if (to.path === '/login') {
            //如果token存在，跳转的路径是登录页面，就让回到首页
            console.log('有token/跳转的地址登录页')
            next({ path: '/' });
            NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
        } else {
            //如果存在token，跳转的地址不是登录页
            console.log('有token / 跳转的地址不是登录页');
            if (!store.getters.userInfo) {
                //如果存在token，跳转的地址不是登录页,身份信息不存在
                console.log('有token / 跳转的地址不是登录页 / 无身份信息 ')
                console.log('store.getters.userInfo', store.getters.userInfo);
                store.dispatch('GetUserInfo').then(result => { // 拉取用户信息
                    if (store.getters.menus.length > 0) {
                        console.log('store.getters.menus.length', store.getters.menus.length);
                        let routerData = Utils.copyData(store.getters.menus);
                        routerData.push({
                            path: '*',
                            redirect: '/404',
                            meta: {
                                hidden: true
                            }
                        });
                        console.log('路由表', routerData)
                        router.addRoutes(routerData) // 动态添加可访问路由表
                        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record 
                    } else {
                        store.dispatch('FedLogOut').then(() => {
                            Message.error('您暂无访问菜单, 请联系管理员')
                            setTimeout(() => {
                                window.location.reload(); // 为了重新实例化vue-router对象 避免bug
                            }, 1000)
                        })
                    }
                    next()
                }).catch((err) => {
                    store.dispatch('FedLogOut').then(() => {
                        Message.error(err || 'Verification failed, please login again');
                    })
                })
            } else {
                console.log('有token / 跳转的地址不是登录页 / 有身份信息 ')
                if (store.getters.menus.length > 0) {
                    console.log('store.getters.menus.length', store.getters.menus)
                    console.log('有token / 跳转的地址不是登录页 / 有身份信息 / 路由配置表存在  ======>>直接跳转');
                    next()
                } else {
                    console.log('有token / 跳转的地址不是登录页 / 有身份信息 / 路由配置表不存在  ======>>刷新当前页面')
                    store.dispatch('FedLogOut').then(() => {
                        Message.error('您暂无访问菜单, 请联系管理员')
                        setTimeout(() => {
                            window.location.reload(); // 为了重新实例化vue-router对象 避免bug
                        }, 1000)
                    })
                }
            }
        }
    } else {
        console.log('无token', Utils.getToken())
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            // window.location.href = "https://jh-dev.meishutech.com:18089/jh/#/login";
            next({ path: '/login' });
            NProgress.done()
        }
    }
});

router.afterEach(() => {
    NProgress.done() // 结束Progress
});

export default router;