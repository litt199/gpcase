import axios from '@/libs/api.request'

/*
* 注册
* */
export const register = (data) => {
  return axios.request({
    url: `/register/submit`,
    method: 'post',
    data: data
  })
}
/*
*
* 获取验证码
*  */
export const getPhoneCode = ({ mobile, isRegist }) => {
  return axios.request({
    url: `/register/sendVCode`,
    method: 'post',
    data: {
      mobile, isRegist
    }
  })
}
/*
*
* 验证验证码
*  */
export const verifyCode = (data) => {
  return axios.request({
    url: `register/verifyCode`,
    method: 'post',
    data: data
  })
}
/*
*
* 修改密码
*  */
export const resetPassward = ({ mobile, code, passWord }) => {
  return axios.request({
    url: `register/resetPassword`,
    method: 'post',
    data: {
        mobile, code, passWord
    }
  })
}

/*
* 账号密码登录
* */
export const userLogin = ({ username, password }) => {
  return axios.request({
    url: `/auth/login`,
    method: 'post',
    data: {
      username, password
    }
  })
}
/*
* 验证码登录
* */
export const userLoginByCode = ({ username, code }) => {
    return axios.request({
        url: `/auth/loginByCode`,
        method: 'post',
        data: {
            username, code
        }
    })
}
/*
* 验证码登录,获取登录验证码
* */
export const getLoginCode = ({ username }) => {
    return axios.request({
        url: `/auth/sendLoginCode`,
        method: 'post',
        data: {
            username
        }
    })
}

/*
* 获取用户信息
* */
export const getUserInfo = () => {
    return axios.request({
        url: `/userCenter/info`,
        method: 'get',
    })
}
/*
* 退出登录
* */

export const logout = () => {
    return axios.request({
        url: `/auth/logout`,
        method: 'delete',
    })
}

/*
* 更换交易链接
* */

export const changeSteamLink = ({transactionUrl}) => {
    return axios.request({
        url: `/userCenter/saveTransactionUrl`,
        method: 'post',
        data: {
            transactionUrl
        }
    })
}