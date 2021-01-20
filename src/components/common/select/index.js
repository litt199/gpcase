import gpSelect from './gpSelect'
// 这里是重点
const select = {
  install: function(Vue){
    Vue.component('gp-select',gpSelect)
  }
}

// 导出组件
export default select;