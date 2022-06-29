//此处是静态路由
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/components/layout/Layout.vue';


export const constantRoutes = [
    //登入页
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        meta: {
            requireAuth: true,
            hidden: true,
            title: '登录',
        }
    },
    {
        path: '/',
        redirect: '/index/index',
        meta: {
            requireAuth: true,
            hidden: true
        }
    },
    //首页
    {
        path: '/index',
        component: Layout,
        name: 'Audit',
        children: [{
            path: '/index/index',
            name: 'index',
            component: () => import('@/views/index/index'),
            meta: {
                title: '首页',
                icon: 'index',
                keepAlive: false
            },
        }],
    },
    //404
    {
        path: '/404',
        component: () => import('@/views/common/404.vue'),
        hidden: true
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    },
    //地图
    {
        alwaysShow: true,//一直显示根路由
        component: Layout,
        hidden: false,// 不在侧边栏显示
        path: '/map',
        meta: {
            name: 'map',
            title: '地图',
            icon: 'map',
        },

        children: [
            {
                path: 'chineseMap',
                name: 'chineseMap',
                component: () => import('@/views/map/chineseMap'),
                meta: { title: '中国地图' }
            },
        ]
    },
    //Table
    {
        alwaysShow: true,
        component: Layout,
        hidden: false,
        path: '/table',
        meta: {
            name: 'table',
            title: '特殊表格',
            icon: 'table',
        },

        children: [
            {
                path: 'columnTable',
                name: 'columnTable',
                component: () => import('@/views/table/columnTable'),
                meta: { title: '纵向垂直表头' }
            },
            {
                path: 'cityIndex',
                name: 'cityIndex',
                component: () => import('@/views/table/cityIndex'),
                meta: { title: '城市索引' },
            },

        ]
    },
    //时间
    {
        alwaysShow: true,
        component: Layout,
        hidden: false,
        path: '/time',
        meta: {
            name: 'time',
            title: '时间',
            icon: 'time',
        },

        children: [
            {
                path: 'specialTime',
                name: 'specialTime',
                component: () => import('@/views/time/specialTime'),
                meta: { title: '特殊时间' }
            },


        ]
    },
    //图片
    {
        alwaysShow: true,
        component: Layout,
        hidden: false,
        path: '/pic',
        meta: {
            name: 'pic',
            title: '图片相关',
            icon: 'pic',
        },

        children: [
            {
                path: 'editPic',
                name: 'editPic',
                component: () => import('@/views/pic/editPic'),
                meta: { title: '编辑图片1' }
            },
            {
                path: 'tailoring',
                name: 'tailoring',
                component: () => import('@/views/pic/tailoring'),
                meta: { title: '编辑图片2' }
            },


        ]
    }
]

const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
