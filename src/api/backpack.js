import axios from '@/libs/api.request'
/*
* 我的背包接口
* */


/*
* 我的背包
* */
export const getBackpackInfo = ({size, page, goodsState,keyWord, sortByPrice}) => {
    return axios.request({
        url: `/userCenter/pack`,
        method: 'get',
        params: {
            size, page, goodsState,keyWord, sortByPrice
        }
    })
}
/*
*
* 取回
* */

export const postGetGood = (data) => {
    return axios.request({
        url: `/userCenter/batchTakeGoods`,
        method: 'post',
        data: data
    })
}
/*
* 出售
*
* */

export const postSellGood = (data) => {
    return axios.request({
        url: `/userCenter/batchSellGoods`,
        method: 'post',
        data: data
    })
}

/*
* 开箱记录
*
* */

export const openRecords = ({page,size}) => {
    return axios.request({
        url: `/userCenter/openBoxInfo`,
        method: 'get',
        params: {
            page,size
        }
    })
}
