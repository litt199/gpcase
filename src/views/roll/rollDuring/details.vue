<template>
    <div id="rollDuring_details">
        <div class="back">
            <gp-btn  :width="125" :height="19" bg="linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 100%)"  @click="btnClick()"><img class="details_img" v-lazy="img_fanhui"/>返回ROLL列表<span class="details_span"></span></gp-btn>
        </div>
        
        <div class="rollDuring_detailsImg">
            <img class="rollDuring_detailsImg_i" :src="cardDetailsList.bgImage" />
            <div class="rollDuring_detailsTitle">
                <div class="details_title">{{cardDetailsList.title}}</div>
                <div class="details_countdown">
                    <CountDown :countdown_text="`结束倒计时：`" :endTime="new Date(cardDetails.endTime).getTime()" :countdown_height="25" :countdown_width="15" :countdown_size="14"></CountDown>
                </div>
                <div class="details_number">
                    <img :src="img_details_jianshu"  />
                    <span style="margin-right:10px">{{cardDetails.count}}件</span>
                    <img :src="img_details_renshu"  />
                    <span>{{cardDetails.number}}人</span>
                </div>
                <div class="details_time">开奖时间：{{cardDetailsList.endTime}}</div>
                <div class="details_meo">说明：{{cardDetailsList.desc}}</div>
                <div v-if="cardDetailsList.status && !cardDetailsList.join">
                    <div class="pwdBtn"  v-if="cardDetailsList.joinWay === 2">
                        <gp-input v-model="passwd" :show-password="true" placeholder="密码参与"></gp-input>
                        <gp-btn :width="60" :height="20" bg="linear-gradient(135deg, #951bee 0%, #660fdb 100%)" color="#fff" @click="passwdInput()">确认</gp-btn>
                    </div>
                    <gp-btn style="margin-left: 30px;margin-top: 10px;" v-else :width="160" :height="30" bg="linear-gradient(135deg, #951bee 0%, #660fdb 100%)"  @click="passwdBtn()"><span style="color:white;margin-left:10px;">立即参与</span></gp-btn>
                </div>
                <div v-if="cardDetailsList.join && cardDetailsList.status" class="pwdBtn" >
                    <gp-btn  :width="160" :height="30"  color="#535353"  bg="linear-gradient(135deg, #959595 0%, #bdbdbd 100%)">已参与</gp-btn>
                    
                </div>
                <div v-if="!cardDetailsList.status " class="pwdBtn" >
                    <gp-btn  :width="160" :height="30" color="#535353"  bg="linear-gradient(135deg, #959595 0%, #bdbdbd 100%)">已结束</gp-btn>
                </div>
                
               <!-- <div v-else>
                    <gp-btn  :width="160" :height="30" disable>已结束</gp-btn>
                </div>-->
                
            </div>
        </div>
    </div>
</template>
<script>
import CountDown from '../../../components/countDown'
import { getRollDetails,getRollPwd,getRollJoin } from '../../../api/roll'
export default {
    name: 'rollDuring_details',
    components:{
        CountDown
    },
    data(){
        return{
            passwd:'',
            img_fanhui:require('../../../assets/roll/roll_fanhui.png'),
            img_details:require('../../../assets/roll/details_img.png'),
            img_roll_qiang:require('../../../assets/roll/roll_qiang.png'),
            img_details_jianshu:require('../../../assets/roll/details_jianshu.png'),
            img_details_renshu:require('../../../assets/roll/details_renshu.png'),
            cardDetailsList:[],
            cardDetails:{}
        }
    },
    methods:{
        btnClick() {
            this.$router.go(-1);
        },
        passwdInput() {
            if (this.passwd){
                let typeParams= {
                    id: JSON.parse(localStorage.getItem("cardDetails")).id,
                    pwd: this.passwd
                }
                getRollPwd(typeParams).then((res)=>{

                    if (res.code == 1) {
                        this.$message.warning(res.msg);
                    }
                    if (res.code == 0) {
                        this.$message.success('参与成功');
                        this.getDetailsList();
                    }
                })
            }else {
                this.$message.warning('请输入密码!');
            }
        },
        passwdBtn() {
            let typeParams= {
                id: JSON.parse(localStorage.getItem("cardDetails")).id
            }
            getRollJoin(typeParams).then((res)=>{
                if (res.code === 0) {
                    this.$message.success('参与成功');
                    this.getDetailsList();
                } else{
                    this.$message.warning(res.msg);
                }
            })           
        },
        getDetailsList(){
            let typeParams= {
                id: JSON.parse(localStorage.getItem("cardDetails")).id,
            }
            getRollDetails(typeParams).then((res)=>{
                if (res.data) {
                    this.cardDetailsList = res.data;
                }
            })            
        }
    },
    mounted(){
        this.cardDetails = JSON.parse(localStorage.getItem("cardDetails"));
        console.log(this.cardDetails,'this.cardDetails');
        this.getDetailsList();
    }
}
</script>
<style lang="less">
#rollDuring_details{
    width: 100%;
    display: flex;
    flex-direction: column;
    .back{
        .ob-btn{
            color: #000;
            display: flex;
            align-items: center;
            margin-top: 16px;
            .details_img{
                color: #000;
                width: 10px;
                height: 10px;
            }
            .details_span{
                color: #000;
            }
        }
    }
    
    .rollDuring_detailsImg{
        position: relative;
        min-height: 245px;
        width: 100%;
        border-radius: 12px;
        display: flex;
        margin-top: 16px;
        .rollDuring_detailsImg_i{
            width: 100%;
            height: 260px;
            border-radius: 12px;
        }
        .rollDuring_detailsTitle{
            position:absolute;
            top: 0;
            width: 35%;
            left: 0;
            bottom: 0;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            align-content: space-between;
            font-size: 20px;
            .details_title{
                margin: 12px 0 0 30px;
                color: white;
                font-size: 20px;
            }
            .details_countdown{
                margin-top: 16px;
                margin-left: 6px;
                height: 23px;
                width: 366px;
                line-height: 23px;
                text-align: center;
                color: white;
                /deep/ .kaiqi{
                    margin-right: 163px;
                    display: none;
                }
                /deep/.span_countdown{
                    margin-top: 10px;
                    font-size: 25px;
                }
                /deep/.span_q{
                    width: 26px!important;
                    height: 43px!important;
                    line-height: 43px!important;
                    margin-right: 10px!important;
                }
            }
            .details_card{
                display: flex;
                margin: 20px 0 0 30px;
                img{
                    padding: 10px;
                    background-color: white;
                    margin-right: 5px;
                    border-radius: 0 0 12px 12px;
                }
            }
            .details_number{
                display: flex;
                margin: 40px 0 0 30px;
                align-items: flex-end;
                img{
                    color: white;
                    width: 24px;
                    height: 24px;
                    margin-right: 5px;
                }
                span{
                    color: white;
                    font-size: 16px;
                }
            }
            .details_time{
                margin: 10px 0 0 30px;
                color: white;
                font-size: 14px;
            }
            .details_meo{
                margin: 10px 0 0 30px;
                color: white;
                font-size: 14px;
            }
            .ob-btn{
                //margin: 10px 0 0 10px;
                img{
                    width: 12px;
                }
            }
            .pwdBtn{
                display: flex;
                align-items: center;
                margin: 10px 0 0 30px;
                .el-input{
                    //margin: 20px 0 0 12px;
                    margin-right: 20px;
                    width: 150px;
                    .el-input__inner{
                        width: 150px;
                    }
                }
               
            }
        }
    }
}
</style>