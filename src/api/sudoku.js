import axios from '@/libs/api.request' 

/*
*
* 进行时列表
*  */
export const getSudokuDoing = (params) => {
    return axios.request({
        url: `/activity/nine/list`,
        method: 'get',
        params:params
    })
}

/*
*
* 活动详情页
*  */
export const getSudokuDetails = (params) => {
    return axios.request({
        url: `/activity/nine/${params.id}`,
        method: 'get',
        params:params
    })
}

/*
*
* 我参与列表
*  */
export const getSudokuJoin = (params) => {
    return axios.request({
        url: `/activity/nine/joinList`,
        method: 'get',
        params:params
    })
}

/*
*
* 活动已结束
*  */
export const getSudokuFinished = (params) => {
    return axios.request({
        url: `/activity/nine/endList`,
        method: 'get',
        params:params
    })
}

/*
*
* 购买格子
*  */
export const getSudokuCell = (data) => {
    return axios.request({
        url: `/activity/nine/buyCells`,
        method: 'post',
        data:data
    })
}

/*
*
* 往期详情
*  */
export const getSudokuPastDetails = (data) => {
    return axios.request({
        url: `/activity/nine/historyInfo`,
        method: 'post',
        data:data
    })
}
