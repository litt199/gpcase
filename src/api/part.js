import axios from '@/libs/api.request'


/*
*
* 获取消息列表
*  */
export const getNewsList = (params) => {
    return axios.request({
        url: `/msg/list`,
        method: 'get',
        params:params
    })
}
/*
*
* 设置消息为已读
*  */
export const setAlreadyRead = (id) => {
    return axios.request({
        url: `/msg/read/`+id,
        method: 'post',
    })
}
/*
*
* 设置消息为全部已读
*  */
export const setNewsAllRead = (id) => {
    return axios.request({
        url: `/msg/readAll/`+id,
        method: 'post',
    })
}
/*
*
* 新人福利
*  */
export const newPeopleWelfare = () => {
    return axios.request({
        url: `/activity/welfare/list/new`,
        method: 'get',
    })
}
/*
*
* 充值福利
*  */
export const investWelfare = () => {
    return axios.request({
        url: `/activity/welfare/list/recharge`,
        method: 'get',
    })
}
/*
*
* 开箱福利
*  */
export const openBoxWelfare = () => {
    return axios.request({
        url: `/activity/welfare/list/box`,
        method: 'get',
    })
}
/*
*
* 领取福利
*  */
export const getWelfare = (taskId) => {
    return axios.request({
        url: `/activity/welfare/receive/`+ taskId,
        method: 'post',
    })
}

/*
*
* 优惠券
*  */
export const getCoupon = (params) => {
    return axios.request({
        url: `/userCenter/coupons`,
        method: 'get',
        params:params
    })
}

/*
*
* 兑换商城
*  */
export const exchangeList = (params) => {
    return axios.request({
        url: `/exchange/search`,
        method: 'get',
        params:params
    })
}
/*
*
* 兑换商品
*  */
export const exchangeGoods = (params) => {
    return axios.request({
        url: `/exchange/buyGoods`,
        method: 'post',
        data:params
    })
}

/*
*
* 首页热门宝箱
*  */
export const getTreasureBox = () => {
    return axios.request({
        url: `/index/hotBox`,
        method: 'get',
    })
}

/*
*
* 开箱详情
*  */
export const openBoxList = () => {
    return axios.request({
        url: `/csgo/boxes`,
        method: 'get',
    })
}

/*
*
* 箱子详情页
*  */
export const boxDetail = (id) => {
    return axios.request({
        url: `/csgo/`+id,
        method: 'get',
    })
}

/*
*
*  开箱
*  */
export const openBox = (params) => {
    return axios.request({
        url: `/openBox/luckDraw`,
        method: 'post',
        data:params
    })
}

/*
*
* 免费商品
*  */
export const freeBoxDetail = () => {
    return axios.request({
        url: `/everyDayPrize/list`,
        method: 'get',
    })
}

/*
*
* 免费商品抽奖
*  */
export const openDayPrize = () => {
    return axios.request({
        url: `/everyDayPrize/open`,
        method: 'post',
    })
}

