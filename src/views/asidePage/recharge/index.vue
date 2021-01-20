<template>
    <div id="recharge">
        <div class="recharge_title">
            <span class="tab active">
                <i></i>
                充值
                <i></i>
            </span>
        </div>
        <div class="recharge_account ">
            <span>充值账号：</span>
            <span>{{count}}</span>
        </div>
        <div class="recharge_project mt10">
            <span>充值项目：</span>
            <span>账户余额({{userInfo.diamond}}钻石)</span>
        </div>
        <div class="recharge_amount">
            <span>充值金额：</span>
            <gp-btn v-for="(item,index) in payNumber" :key="index" :width="100" :height="30"
                    :bg="btnIndex === index ? 'linear-gradient(135deg, #9fa2ff 0%, #7679ff 100%)' : '' "
                    @click="amountClick(index)" style="margin-right:5px;">
                <img :src="img_zuanshi" v-if="btnIndex === index"/>
                <img :src="img_zuanshizi" v-else/>
                <span :style="{fontSize:'10px',color:btnIndex === index ? '#fff' : '#9fa2ff'}">{{item}}</span>
            </gp-btn>
        </div>
        <div class="recharge_otherAmount">
            <gp-input @input="inputChange" placeholder="其他个数" v-model="money" @focus="btnIndex = ''"></gp-input>
        </div>
        <div class="recharge_promote">
            <span style="margin-right:14px;">推广码：</span>
            <gp-input placeholder="请输入            非必填" v-model="invitorCode"></gp-input>
            <gp-btn :width="100" :height="30" bg="linear-gradient(135deg, #9fa2ff 0%, #7679ff 100%)"
                    style="margin-left:5px;">使用
            </gp-btn>
        </div>
        <div class="recharge_pay">
            <span>支付方式：</span>
            <gp-btn v-for="(item,index) in payType" :key="index" :width="80" :height="35"
                    :bg="payIndex === index ? 'linear-gradient(135deg, #9fa2ff 0%, #7679ff 100%)' : '' "
                    @click="payClick(index)" style="margin-right:5px;">
                <img :src="item.img"/>
                <span :style="{fontSize:'10px',marginLeft:'2px',color:payIndex === index ? '#fff' : '#9fa2ff'}">{{item.name}}</span>
            </gp-btn>
        </div>
        <div class="recharge_payAmount mt10">
            <span>支付金额：</span>
            <img :src="img_zuanshizi"/>
            <span style="color:#9fa2ff; margin-left: 5px;">{{money ||payNumber[btnIndex] || 0}}</span>
        </div>
        <!--<div class="recharge_realPayAmount mt10">
            <span>实际到账金额：</span>
            <img :src="img_zuanshizi"/>
            <span style="color:#9fa2ff; margin-left: 5px;">
                {{money ||payNumber[btnIndex] || 0}}
            </span>
            <img :src="img_gouxuan" style="margin:0 3px 0 18px;cursor:pointer;" v-if="checkBtn"
                 @click="checkBtn = !checkBtn"/>
            <img
                style="margin:0 3px 0 18px;cursor:pointer;border-radius:50%;height:8px;width:8px;border: 1px solid #9fa2ff;"
                v-else @click="checkBtn = !checkBtn"/>
            <span style="font-size:10px">使用充值返利卷< 满100钻石送10钻石 ></span>
        </div>-->
        <gp-btn :width="170" @click="submit"  :height="30" bg="linear-gradient(135deg, #9fa2ff 0%, #7679ff 100%)" style="margin: 20px 0">
            前往支付
        </gp-btn>
        
        <gp-dialog width="360px" @close="closeQrcode" :append-to-body="true" :destroy-on-close="true" :visible.sync = "showQrcode">
            <div class="qrcode-wrap">
                <div class="title">扫描二维码充值</div>
                <div  id="qrcode" class="qrcode"></div>
            </div>
            
        </gp-dialog>
        
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
    import { rechargeByAli, rechargeSuccess, rechargeByWechat } from "../../../api/recharge";
    import QRCode from 'qrcodejs2'
    export default {
        name: 'recharge',
        data() {
            return {
                btnIndex: 0,
                payIndex: 0,
                checkBtn: false,
                payNumber: ['5', '10', '30', '50', '100', '200'],
                payType: [
                    {
                        name: '支付宝',
                        img: require('../../../assets/img/img_zfb.png')
                    },
                    {
                        name: '微信',
                        img: require('../../../assets/img/img_wx.png')
                    },
                ],
                img_zuanshi: require('../../../assets/img/img_zuanshi.png'),
                img_zuanshizi: require('../../../assets/img/img_zuanshizi.png'),
                img_gouxuan: require('../../../assets/img/img_gouxuan.png'),
                count: localStorage.getItem('userCount').toString(),
                money: '',  // 其他金额
                invitorCode: '', // 推广码
                showQrcode: false,
                rechargeId: '', // 充值订单id
                timer: null,
            }
        },
        computed: {
          ...mapState({
              userInfo: state => state.userModules.userInfo
          })
        },
        methods: {
            ...mapActions(['updateUserInfo']),
            amountClick(val) {
                this.btnIndex = val;
                this.money = ''
            },
            payClick(val) {
                this.payIndex = val;
            },
            // 输入金额
            inputChange() {
                this.money = this.money.replace(/[^\d]/g, '')
            },
            // 充值（支付宝）
            async rechargeByAli() {
                if(this.money){
                    if(this.money <= 3 || this.money > 100000){
                        this.$message.info('请输入大于3小于100000的整颗钻石')
                        await  new Promise(() => {
                            return false
                        })
                        
                    }
                }else {
                    if(!this.payNumber[this.btnIndex]){
                        this.$message.info('请输入大于3小于100000的整颗钻石')
                        await  new Promise(() => {
                            return false
                        })
                    }
                }
                let json = {
                    money: this.money ||this.payNumber[this.btnIndex] || 0,
                    couponId: '',
                    userCouponId: '',
                    invitorCode: this.invitorCode
                }
                
                return await rechargeByAli(json)
               
            },
            // 充值（支付宝）
            async rechargeByWechat() {
                if(this.money){
                    if(this.money <= 3 || this.money > 100000){
                        this.$message.info('请输入大于3小于100000的整颗钻石')
                        await  new Promise(() => {
                            return false
                        })
                
                    }
                }else {
                    if(!this.payNumber[this.btnIndex]){
                        this.$message.info('请输入大于3小于100000的整颗钻石')
                        await  new Promise(() => {
                            return false
                        })
                    }
                }
                let json = {
                    money: this.money ||this.payNumber[this.btnIndex] || 0,
                    couponId: '',
                    userCouponId: '',
                    invitorCode: this.invitorCode
                }
                return await rechargeByWechat(json)
        
            },
            // 提交支付
            async submit() {
                if(!this.payIndex){
                   let res = await this.rechargeByAli()
                    if(res && res.code === 0){
                        this.showQrcode = true
                        this.rechargeId = res.data.rechargeId
                        this.$nextTick(() => {
                            this.qrcode(res.data.payUrl)
                        })
                        this.timer = setInterval(() => {
                            this.rechargeSuccess()
                        }, 1000)
                        
                    }else{
                        this.$message.error(res.msg)
                    }
                }else {
                    let res = await this.rechargeByWechat()
                    if(res && res.code === 0){
                        this.showQrcode = true
                        this.rechargeId = res.data.rechargeId
                        this.$nextTick(() => {
                            this.qrcode(res.data.codeUrl)
                        })
                        this.timer = setInterval(() => {
                            this.rechargeSuccess()
                        }, 1000)
        
                    }else{
                        this.$message.error(res.msg)
                    }
                }
            },
            closeQrcode() {
              
                clearInterval(this.timer)
                this.timer = null;
            },
            // 检查是否充值成功
            async rechargeSuccess() {
                let res = await rechargeSuccess({rechargeId: this.rechargeId})
                if(res && res.code === 0){
                    this.showQrcode = false
                    this.$message.success('充值成功')
                    this.updateUserInfo()
                    clearInterval(this.timer)
                    this.timer = null;
                }
            },
            //获取二维码的实例
            qrcode(url) {
                let qrcode = new QRCode('qrcode', {
                    width: 132,
                    height: 132,
                    text: url, // 二维码地址
                    colorDark : "#000",
                    colorLight : "#fff",
                })
        
            },
        },
       
        beforeDestroy() {
            clearInterval(this.timer)
            this.timer = null
            
        }
    }
</script>
<style lang="less">
    .qrcode-wrap{
        
        .title{
            font-size: 18px;
            color: #000;
            font-weight: bold;
            text-align: center;
            padding: 10px 0;
        }
        .qrcode{
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px 0;
            img{
                width: 260px;
                height: 260px;
            }
        }
    }
    
    .mt10{
        margin-top: 10px;
    }
    #recharge {
        //margin: 16px 17px;
        margin-top: 15px;
        color: #fff;
        padding: 5px 25px;
        background-color: #2b2b2b;
        display: flex;
        flex-direction: column;
        border-radius: 12px;
        .recharge_title {
            border-bottom: 1px solid #383838;
            
            .tab {
                display: inline-block;
                margin-right: 40px;
                position: relative;
                cursor: pointer;
                padding: 5px 15px;
                color: #fff;
                
                &:after {
                    position: absolute;
                    content: '';
                    display: block;
                    opacity: 0;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: #876edf;
                    transition: all .2s;
                }
                
                &.active {
                    color: #c5b5ff;
                    
                    &:after {
                        opacity: 1;
                    }
                    
                    i {
                        opacity: 1;
                    }
                }
                
                i {
                    position: absolute;
                    display: inline-block;
                    opacity: 0;
                    width: 30px;
                    height: 30px;
                    transition: all .2s;
                    background: url('../../../assets/img/tab_bg.png') no-repeat;
                    
                    &:first-child {
                        top: 0;
                        left: -15px;
                    }
                    
                    &:last-child {
                        top: 0;
                        right: -5px;
                    }
                }
            }
        }
        
        .recharge_account {
            margin-top: 20px;
            span {
                font-size: 14px;
            }
            
        }
        
        .recharge_project {
            span {
                font-size: 14px;
            }
        }
        
        .recharge_amount {
            display: flex;
            align-items: center;
            margin-top: 20px;
            span {
                font-size: 14px;
                line-height: 12px;
                text-align: center;
            }
            
            .ob-btn {
                border: 1PX solid #9fa2ff;
                flex-shrink: 0;
                width: auto;
            }
        }
        
        .recharge_otherAmount {
            margin-left: 70px;
            margin-top: 10px;
            
            .ob-btn {
                border: 1PX solid #9fa2ff;
                flex-shrink: 0;
                width: auto;
            }
            
            span {
                font-size: 14px;
            }
            
            .el-input {
                flex-shrink: 0;
                
                .el-input__inner {
                    height: 30px;
                    width: 100px;
                    font-size: 14px;
                    color: #9fa2ff;
                    border-radius: 15px;
                    border: 1PX solid #9fa2ff;
                }
            }
        }
        
        .recharge_promote {
            display: flex;
            align-items: center;
            margin-top: 20px;
            
            .el-input {
                flex-shrink: 0;
                width: 143px;
                
                .el-input__inner {
                    height: 30px;
                    border-radius: 30px;
                    width: 143px;
                    font-size: 8px;
                }
            }
            
            span {
                font-size: 14px;
                text-align: center;
            }
            
            .ob-btn {
                flex-shrink: 0;
                height: 100%;
            }
        }
        
        .recharge_pay {
            display: flex;
            align-items: center;
            margin-top: 20px;
            
            .ob-btn {
                border-radius: 12px;
                border: 1PX solid #9fa2ff;
                flex-shrink: 0;
                width: auto;
            }
            
            span {
                font-size: 14px;
            }
        }
        
        .recharge_payAmount {
            span {
                font-size: 14px;
            }
            
            img {
                width: 10px;
            }
        }
        
        .recharge_realPayAmount {
            display: flex;
            align-items: center;
            
            span {
                font-size: 14px;
            }
            
            img {
                width: 10px;
            }
        }
        
        .ob-btn {
            border: 1PX solid #9fa2ff;
            flex-shrink: 0;
            width: auto;
        }
    }
</style>