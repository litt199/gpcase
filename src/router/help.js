
/*
* 公共组件
*
* */
const route = [
  {
    path: '/help',
    component: () => import(/* webpackChunkName: "help" */ '../views/help/help.vue'),
  }
]
export default process.env.NODE_ENV === 'development' ? route : []