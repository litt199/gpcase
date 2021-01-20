import Vue from 'vue'
import Vuex from 'vuex'
import userModules from "./userModules"
//import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    /*state: {
    },
    mutations: {
    },
    actions: {
    },*/
    modules: {
        userModules
    }
})
