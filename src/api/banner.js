import axios from '@/libs/api.request'

/*
*
* 页面数据
*  */
export const getBannerInfo = (params) => {
    return axios.request({
        url: `/index/statistics`,
        method: 'get',
        params:params
    })
}

/*
*
* 左侧掉落
*  */
export const getAside = (params) => {
    return axios.request({
        url: `/index/aside`,
        method: 'get',
        params:params
    })
}
