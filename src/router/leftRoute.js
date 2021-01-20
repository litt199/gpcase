import layout from '../components/layout/layout'
/*
*
* *侧边栏路由
*
* */
const routes = [
    {
        path: '/',
        component: layout,
        children: [
            {
                name: 'welfare',
                path: '/welfare',
                meta: {
                    title: '福利任务',
                    needLogin: true
                },
                component: () => import(/* webpackChunkName: "welfare" */ '../views/welfare/index.vue')
            },
            {
                name: 'news',
                path: '/news',
                meta: {
                    title: '系统消息',
                    needLogin: true
                },
                component: () => import(/* webpackChunkName: "welfare" */ '../views/news/index.vue')
            },
            {
                name: 'coupon',
                path: '/coupon',
                meta: {
                    title: '优惠券',
                    needLogin: true
                },
                component: () => import(/* webpackChunkName: "welfare" */ '../views/coupon/index.vue')
            },
            {
                name: 'recharge',
                path: '/recharge',
                meta: {
                    title: '开箱记录',
                    needLogin: true
                },
                component: () => import(/* webpackChunkName: "questions" */ '../views/asidePage/recharge/index.vue')
            }
        ]
    },

]

export default routes