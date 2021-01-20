import gpCard from './gpCard'
// 这里是重点
const card = {
  install: function(Vue){
    Vue.component('gp-card',gpCard)
  }
}

// 导出组件
export default card