import layout from '../components/layout/layout'
import backpack from './backpack' //
import sudoku from './sudoku'
import faq from './faq'
/*
*
* 主功能路由
*
* */
const routes = [
    {
        path: '/',
        component: layout,
        children: [
            {
                name: 'home',
                path: '/',
                meta:{
                    title:'首页'
                },
                component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue')
            },
            {
                path: '/index/:id',
                name: 'index',
                component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue'),
                meta:{
                    title:'首页'
                },
            },
            {
                name: 'opencase',
                meta: {
                    title: '开箱'
                },
                path: '/opencase',
                component: () => import(/* webpackChunkName: "opencase" */ '../views/openCase/openCase.vue')
            },
            {
                name: 'spread',
                path: '/spread',
                meta: {
                    title: '推广中心',
                    showLogin: true
                },
                component: () => import(/* webpackChunkName: "spread" */ '../views/spread/spread.vue')
            },
            {
                name: 'questions',
                path: '/questions',
                meta: {
                    title: '常见问题'
                },
                component: () => import(/* webpackChunkName: "questions" */ '../views/questions/index.vue')
            },
            ...sudoku,
            ...backpack,
            ...faq,
            
        ]
    }
]

export default routes