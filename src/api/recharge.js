import axios from '@/libs/api.request'


/*
* 充值（支付宝）
* */
export const rechargeByAli = ({money, couponId, userCouponId,invitorCode}) => {
    return axios.request({
        url: `/pay/aliPay`,
        method: 'post',
        data: {
            money, couponId, userCouponId,invitorCode
        }
    })
}
/*
* 充值（支付宝）
* */
export const rechargeByWechat = ({money, couponId, userCouponId,invitorCode}) => {
    return axios.request({
        url: `/pay/wxPay`,
        method: 'post',
        data: {
            money, couponId, userCouponId,invitorCode
        }
    })
}
/*
* 充值是否成功
* */
export const rechargeSuccess = ({rechargeId}) => {
    return axios.request({
        url: `/pay/checkIsPaySuccess`,
        method: 'post',
        data: {
            rechargeId
        }
    })
}