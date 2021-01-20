import axios from '@/libs/api.request'

/* 推广中心接口*/

/*
* 推广福利一览
* */

export const spreadWelfare = () => {
    return axios.request({
        url: `/activity/extension/info`,
        method: 'get',
    })
}

/*
* 推广详情
* */

export const spreadDetail = () => {
    return axios.request({
        url: `/promotion/myInfo`,
        method: 'get',
    })
}