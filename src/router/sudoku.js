import sudoku from "../views/sudoku/index.vue";
const routes =[
  {    
    path: 'sudoku',
    meta: {
    title: '九宫格'
    },
    component: sudoku,
    children: [
        {
        name: 'sudoku',
        path: '',
        component: ()=> import(/* webpackChunkName: "pending" */ '../views/sudoku/ongoing.vue')
        },
        {
          name: 'finished',
          path: 'finished',
          component: ()=> import(/* webpackChunkName: "pending" */ '../views/sudoku/finished.vue')
        },
        {
          name: 'participate',
          path: 'participate',
          component: ()=> import(/* webpackChunkName: "pending" */ '../views/sudoku/participate.vue')
        }
    ]
  },
  {
      name: 'sudokuDetails',
      path: '/sudokuDetails',
      component: ()=>import(/* webpackChunkName: "questions" */ '../views/sudoku/sudokuDetails.vue')
  }
]
export default routes