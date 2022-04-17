import Layout from '@/components/layout/Layout.vue';
const Login = resolve => require(['@/views/login/index'], resolve); //登入页
const Index = resolve => require(['@/views/dashboard/index/index'], resolve); //首页 
export default [
	{
		path: '/login',
		name: 'login',
		component: Login,
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
	{
		path: '/index',
		component: Layout,
		name: 'Audit',
		children: [{
			path: '/index/index',
			name: 'index',
			component: Index,
			meta: {
				title: '首页',
				icon: 'dashboard',
				keepAlive: false
			},
		}],
	},
	{
		path: '/404',
		component: () =>
			import('@/views/common/404.vue'),
		hidden: true
	},
	{
		path: '*',
		redirect: '/404',
		hidden: true
	},
]