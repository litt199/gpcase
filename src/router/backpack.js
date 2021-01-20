import backpack from "../views/asidePage/backpack/backpack";

const routes = [
    {
        
        path: 'backpack',
        component: backpack,
        children: [
            {
                name: 'pending',
                path: '/',
                meta: {
                    title: '背包',
                    needLogin: true
                },
                component: () => import(/* webpackChunkName: "pending" */ '../views/asidePage/backpack/pending.vue')
            },
            {
                name: 'getBack',
                path: 'getBack',
                meta: {
                    title: '饰品取回',
                    needLogin: true
                },
                component: () => import(/* webpackChunkName: "getBack" */ '../views/asidePage/backpack/getBack.vue')
            },
            {
                name: 'backRecords',
                path: 'backRecords',
                meta: {
                    title: '收回记录',
                    needLogin: true
                },
                component: () => import(/* webpackChunkName: "backRecords" */ '../views/asidePage/backpack/backRecords.vue')
            },
            {
                name: 'openRecords',
                path: 'openRecords',
                meta: {
                    title: '开箱记录',
                    needLogin: true
                },
                component: () => import(/* webpackChunkName: "openRecords" */ '../views/asidePage/backpack/openRecords.vue')
            },
        ]
    },
    
]
export default routes