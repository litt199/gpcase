import {getUserInfo, logout} from "../api/user";
import {removeToken} from "../libs/util";

export default {
    state: {
        userInfo: {},
        loginModal: false,
        registerModal: false,
        forgotPwdDialog: false
    },
    mutations: {
        loginModalVisible(state, val) {
            state.loginModal = val
        },
        registerModalVisible(state, val) {
            state.registerModal = val
        },
        forgotPwdDialogVisible(state, val) {
            state.forgotPwdDialog = val
        },
        setUserInfo(state, obj) {
            state.userInfo = obj
        },
        
    },
    actions: {
        // 登录
        handleLogin({commit}, {userNo, password}) {
            return new Promise((resolve, reject) => {
                login({
                    userNo,
                    password
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 获取用户信息
        updateUserInfo({commit}) {
            return new Promise(((resolve, reject) => {
                getUserInfo().then(res => {
                    console.log(res)
                    if(res && res.code === 0) {
                        commit('setUserInfo',res.data)
                    }
                })
            }))
        },
        // 退出登录
        userLogout({commit}) {
            return new Promise(((resolve, reject) => {
                logout().then(res => {
                    console.log(res)
                    if(res && res.code === 0) {
                        commit('setUserInfo',{})
                        removeToken()
                        localStorage.removeItem('userCount')
                        resolve(res)
                    }
                })
            }))
        }
        
        
    }
}
