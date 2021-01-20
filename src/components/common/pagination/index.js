import gpPagination from './gpPagination'
// 这里是重点
const pagination = {
  install: function(Vue){
    Vue.component('gp-pagination',gpPagination)
  }
}

// 导出组件
export default pagination