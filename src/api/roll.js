import axios from '@/libs/api.request'

/*
*
* 页面数据
*  */
export const getRollList = (params) => {
    return axios.request({
        url: `/rolls/list`,
        method: 'get',
        params:params
    })
}

/*
*
* roll详情页
*  */
export const getRollDetails = (params) => {
    return axios.request({
        url: `/rolls/info/${params.id}`,
        method: 'get',
        params:params
    })
}

/*
*
* 参与roll房
*  */
export const getRollJoin = (data) => {
    return axios.request({
        url: `/rolls/join`,
        method: 'post',
        data:data
    })
}

/*
*
* 密码参与
*  */
export const getRollPwd = (data) => {
    return axios.request({
        url: `/rolls/checkRollPwd`,
        method: 'post',
        data:data
    })
}

/*
*
* 我参与的
*  */
export const getRollMyJoin = (params) => {
    return axios.request({
        url: `/rolls/joinList`,
        method: 'get',
        params:params
    })
}