import layout from '../components/layout/layout'
/*
*
* 主功能路由
*
* */
const freeBoxRoutes = [
    {
        path: '/freeBox',
        component: layout,
        
        children: [
            {
                name: 'freeBox',
                path: '/',
                meta: {
                    showLogin: true
                },
                component: () => import(/* webpackChunkName: "about" */ '../views/freeBox/index.vue')
            },
            {
                name: 'exchangeMall',
                path: 'exchangeMall',
                component: () => import(/* webpackChunkName: "about" */ '../views/exchangeMall/index.vue')
            }
        ]
    },
]

export default freeBoxRoutes