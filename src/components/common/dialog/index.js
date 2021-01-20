import gpDialog from './gpDialog'
// 这里是重点
const dialog = {
  install: function(Vue){
    Vue.component('gp-dialog',gpDialog)
  }
}

// 导出组件
export default dialog