import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import importDirective from './directive'
import * as vueExpand from './libs/vue-expand'
import installPlugin from './plugin'
import './components/elementUi' // 按需加载element-ui组件
import './components/common' // 自定义组件
import 'element-ui/lib/theme-chalk/index.css';//样式文件一定要引入
import VueLazyload from 'vue-lazyload'
import animate from 'animate.css'

import './main.less'
Vue.use(animate);
Vue.use(VueLazyload, {
     loading: require('./assets/opacity.png'),//加载中图片，一定要有，不然会一直重复加载占位图
     error: require('./assets/opacity.png')  //加载失败图片
});
/*
*  注册全局指令
* */
importDirective(Vue)

/**
 * 注册自定义插件
 */
installPlugin(Vue)

/**
 * 生成常用方法
 */
Object.keys(vueExpand).forEach(key => {
  Vue.prototype[key] = vueExpand[key]
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
