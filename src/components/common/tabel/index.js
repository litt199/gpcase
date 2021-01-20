import gpTable from './gpTable'
// 这里是重点
const table = {
  install: function(Vue){
    Vue.component('gp-table',gpTable)
  }
}

// 导出组件
export default table