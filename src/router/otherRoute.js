const otherRouters = [
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404'
    },
    component: () => import(/* webpackChunkName: "404" */ '../views/error/404.vue')
  },

  {
    path: '*',
    name: 'all',
    meta: {
      title: '404'
    },
    component: () => import(/* webpackChunkName: "404" */ '../views/error/404.vue')
  }
]
export default otherRouters