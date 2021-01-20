import Vue from 'vue'
import VueRouter from 'vue-router'
import route from './route'
import otherRoute from './otherRoute'
import rollRoutes from './rollRoute'
import freeBoxRoutes from './freeBoxRoute'
import leftRoutes from './leftRoute'
import config from '../config'
import help from './help'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'// nprogress样式文件
import {getToken} from "../libs/util";
import store from '../store'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const routes = [
    ...route,
    ...help,
    ...otherRoute,
    ...rollRoutes,
    ...freeBoxRoutes,
    ...leftRoutes
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from,savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (getToken()) {
        next()
    } else {
        if (to.meta.showLogin) {
            store.commit('loginModalVisible', true)
        } else if(to.meta.needLogin){
            NProgress.done()
            if(from.name){
                store.commit('loginModalVisible', true)
                return
            } else {
                next('/')
            }
            
        }else {
            next()
        }
    }
    // 开启进度条
    
   
    next();
});
router.afterEach(to => {
    window.document.title = to.meta.title ? config.title + '-' + to.meta.title : config.title
    NProgress.done()
    //window.scrollTo(0,0)
})


export default router
