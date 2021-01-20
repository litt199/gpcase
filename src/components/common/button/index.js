import gpButton from './gpBtn'
// 这里是重点
const gpBtn = {
  install: function(Vue){
    Vue.component('gp-btn',gpButton)
  }
}

// 导出组件
export default gpBtn