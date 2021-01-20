<template>
    <div class="ROLLCard" @click="btnClick">
        <div class="img_bg" :style="{backgroundImage:'url('+cardDetails.image+')'}" >
            <div class="ROLLCard_title">{{this.cardDetails.title}}</div>
            <div class="ROLLCard_countdown">
                <CountDown :key="cardDetails.id" :endTime="new Date(cardDetails.endTime).getTime()" :countdown_text="`结束倒计时：`" :countdown_height="25" :countdown_width="15" :countdown_size="14" @change="change($event)"></CountDown>
            </div>
        </div>
        <div class="ROLLCard_value">
            <span class="ROLLCard_valueOne">物品总价值:</span>
            <img v-lazy="img_zuanshi" />
            <span >{{cardDetails.totalPrice}}</span>
        </div>
        <div class="ROLLCard_roomType">
            <gp-btn  :width="110" :height="24" :bg="getRoomType(this.cardDetails.joinWay)" style="margin-right:10px;">{{roomName}}</gp-btn>
            <img v-lazy="img_jianshu" />
            <span style="margin-right:10px;">{{this.cardDetails.count}}件</span>
            <img v-lazy="img_renshu" />
            <span>{{this.cardDetails.number}}人</span>
        </div>
        <div class="ROLLCard_btn">
            <gp-btn  :width="160" :height="30"  bg="linear-gradient(135deg, #951bee 0%, #660fdb 100%)" v-if="cardDetails.status && !cardDetails.join" >立即参与</gp-btn>
            <gp-btn  :width="160" :height="30"  color="#535353"  bg="linear-gradient(135deg, #959595 0%, #bdbdbd 100%)" v-if="!cardDetails.status ">已结束</gp-btn>
            <gp-btn  :width="160" :height="30"  color="#535353"  bg="linear-gradient(135deg, #959595 0%, #bdbdbd 100%)" v-if="cardDetails.join && cardDetails.status">已参与</gp-btn>
        </div>
    </div>
</template>
<script>
import CountDown from '../../../components/countDown'
export default {
    name: 'ROLLCard',
    props:{
        cardDetails:{
            type: Object,
            default: () => {
                bgImage: null;
                count: 0;
                desc: null;
                endTime: "";
                id: "";
                image: "";
                join: true;
                joinUser: null;
                joinWay: 2;
                millis: '';
                name: null;
                number: 1;
                rollGoods: null;
                status: true;
                title: "";
                type: null
            } 
        },
        cardKey: ''
    },
    components:{
        CountDown
    },
    data(){
        return{
            hours: 1,
            minutes: 10,
            seconds: 0,
            img_qiang:require('../../../assets/roll/roll_qiang.png'),
            img_zuanshi:require('../../../assets/roll/roll_zuanshi.png'),
            img_jianshu:require('../../../assets/roll/roll_jianshu.png'),
            img_renshu:require('../../../assets/roll/roll_renshu.png'),
            img_roll_qiang_bg:require('../../../assets/roll/roll_qiang_bg.png'),
            roomType: [
                {   
                    name:1,
                    type:'无门槛ROLL房',
                    bg_color:'linear-gradient(135deg, #32fd94 0%, #439cff 100%)'
                },
                {
                    name:2,
                    type:'密码房',
                    bg_color:'linear-gradient(135deg, #ffc544 0%, #ff4e4c 100%)'
                },
                {
                    name:3,
                    type:'充值福利房',
                    bg_color:'linear-gradient(135deg, #32c4ff 0%, #505bff 100%)'
                },
                {
                    name:4,
                    type:'推广活动ROLL房',
                    bg_color:'linear-gradient(135deg, #ff6a6a 0%, #ff4444 100%)'
                }
            ],
            roomName:'',
            open: false,
        }
    },
    methods: {
        change(val){
           this.open = val.value;
        },
        getRoomType(val) {
            for (const iterator of this.roomType) {
                if(iterator.name === val) {
                    this.roomName = iterator.type;
                    return iterator.bg_color;
                }
            }
            return ''
        },
        btnClick() {
            this.$router.push('roll/rollDuring');
            let obj = JSON.stringify(this.cardDetails);
            localStorage.setItem("cardDetails", obj);
        }
    },

}
</script>
<style lang="less" scoped>
.ROLLCard{
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 1px solid #363636;
    cursor: pointer;
    .img_bg{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: 100%;
        border-radius: 10px;
        .ROLLCard_title{
            position: absolute;
            top: 14px;
            left: 19px;
            height: 16px;
            right: 0;
            color: white;
            font-size: 20px;
            font-weight: bold;
        }
        .ROLLCard_countdown{
            position: absolute;
            top: 80px;
            left: 19px;
            height: 43px;
            right: 0;
            display: flex;      
        }
        .ROLLCard_imgList{
            position: absolute;
            top: 120px;
            left: 7px;
            right: 7px;
            height: 60px;
            display: flex;
            align-items:flex-end;
            img{
                height: 100%;
                flex: 1;
                border-bottom-right-radius: 8px;
                border-bottom-left-radius: 8px;
                padding: 10px 5px;
                background-size: cover;
            }
        }     
    }
    .ROLLCard_value{
        position: absolute;
        bottom: 92px;
        left: 18px;
        height: 15px;
        right: 0;
        display: flex;
        align-items: center;
        .ROLLCard_valueOne{
            line-height: 15px;
            height: 15px;
            font-size: 15px;
            color: white;
        }
        img{
            width: 20px;
            height: 20px;
        }
        span{
            font-size: 12px;
            line-height: 15px;
            height: 15px;
            text-align: center;
            color: white;
        }
    }
    .ROLLCard_roomType{
        position: absolute;
        bottom: 60px;
        left: 18px;
        height: 20px;
        right: 0;
        display: flex;
        align-items: center;
        img{
            width: 16px;
            height: 16px;
            margin-right: 5px;
            color: white;
        }  
        .el-button{
            border: 1px solid #46456E;
            background: transparent;
            &:hover{
            box-shadow: 0 0 4px -1px #58E4FD;
            color: #fff!important;
            }
            &.el-button--default{
            height: 20px;
            font-size: 12px;
            background: transparent;
            }
            &.large{
                width: 88px;
                text-align: center;
                border-radius: 40px;
            }
        }
        span{
            color: white!important;
            font-size: 12px;
        }      
    }
    .ROLLCard_btn{
        position: absolute;
        bottom: 20px;
        height: 26px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-button{
            border: 1px solid #46456E;
            background: transparent;
            height: 26px;
            font-size: 16px;
            line-height: 26px;
            &:hover{
            box-shadow: 0 0 4px -1px #58E4FD;
            color: #fff!important;
            }
            &.el-button--default{
            height: 26px;
            font-size: 16px;
            line-height: 26px;
            background: transparent;
            }
            &.large{
                width: 173px;
                text-align: center;
                border-radius: 40px;
            }
            span{
             height: 26px;
             font-size: 16px;
             line-height: 26px;
             margin-bottom: 30px;               
            }
        }
    }
}
</style>