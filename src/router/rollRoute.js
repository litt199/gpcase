import  layout from '../components/layout/layout'
/*
*
* 主功能路由
*
* */
const rollRoutes = [
  {
    path: '/roll',
    component:layout,
    children: [
      {
        name: 'ROLLHome',
        path: '/',
        component: () => import(/* webpackChunkName: "about" */ '../views/roll/rollHome/index.vue')
      },
      {
        name: 'rollDuring',
        path: 'rollDuring',
        component: () => import(/* webpackChunkName: "about" */ '../views/roll/rollDuring/index.vue')
      }

    ]
  },
]

export default rollRoutes