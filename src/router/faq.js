export default [
    {
        name: '关于我们',
        path: '/faq',
        meta: {
          title: '关于我们'
        },
        component: () => import(/* webpackChunkName: "questions" */ '../views/faq/faq.vue')
    },
    {
        name: '条款与服务',
        path: '/faq1',
        meta: {
            title: '条款与服务'
        },
        component: () => import(/* webpackChunkName: "questions" */ '../views/faq/faq1.vue')
    },
    
]