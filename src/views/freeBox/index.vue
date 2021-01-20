<template>
    <div class="freeBox">
        <div class="freeBox_details">
            <img class="imgll" :src="img_freeBox_bg" style="width:100%;"/>
            <div class="freeBoxImg" v-show="!openBox">
                <div class="freeBox_details_title">
                    <div class="title_left">
                        <img :src="img_freeBox_side" />
                        <span class="title_spanOne">免费宝箱</span>
                        <img :src="img_freeBox_side" />
                        <span class="title_spanTwo">免费宝箱为本站提供的福利开箱活动，每24小时可以体验一次</span>
                    </div>
                    <div class="title_right">
                        <span>开箱玩法是本站提供的休闲娱乐活动，切勿沉迷！</span>
                    </div>
                </div>
                <div class="freeBox_details_list">
                    <div class="details_list_left">
                        <div></div>
                        <div>
                            <img :src="img_freeBox_box" style="width:450px;"/>
                        </div>
                    </div>
                    <div class="details_list_right">
                        <countDown :countdown_custom='true' @change="change($event)" :endTime="(isOpen === 1 ? new Date().getTime() : new Date().getTime() + nextOpen*1000)"></countDown>
                        <gp-btn class="btn" font-size="20px" :width="375" :height="52" bg="linear-gradient(to right, #bc74ff, #7e4eff)" @click="openBoxFun">立即开箱</gp-btn>
                    </div>
                </div>
            </div>
            <openAnimation v-show="openBox" :openNum="0" @closeOpenBox="()=>{this.openBox = false;this.getFreeBox()}"  ref="openAnimation"/>
        </div>
        <div class="freeBox_drop">
            <div class="freeBox_drop_title">
                <img :src="img_freeBox_side" />
                <span class="title_spanOne">物品展示</span>
                <img :src="img_freeBox_side" />
            </div>
            <div class="freeBox_drop_list">
                <div class="list-wrap">
                    <!--<div class="freeBox_drop_listOne" v-for="(item,index) in freeList" :key="index" :style="{backgroundImage:'url('+getBgImg(item.goodsPiture)+')'}" @mouseenter="mouseOver(index)" @mouseleave="show_freeBox = -1">
                        <img :src="item.goodsPiture ? item.goodsPiture : img_freeBox_zuanshi" style="width:100px;"/>
                        <span class="yue1">{{item.goodsPiture ? item.goodsName : '' }}</span>
                        <span class="yue">{{item.goodsPiture ? item.goodsPrice : item.money }}钻石</span>
                        <span class="pro">概率：{{Number(item.proprite.toFixed(2))}}</span>
                    </div>-->
                    <freeGoodsCard :data="item" v-for="(item,index) in freeList" :key="index"></freeGoodsCard>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import countDown from '../../components/countDown'
import {freeBoxDetail,boxDetail} from '../../api/part'
import openAnimation from '../openBoxAnimation/openBox'
import freeGoodsCard from "../../components/localComponents/goodsCard/freeGoodsCard";
export default {
    name: 'freeBox',
    components:{
        countDown,
        openAnimation,
        freeGoodsCard
    },
    data(){
        return{
            openBox:false,
            freeList:[],
            show_freeBox: -1,
            img_freeBox_side:require('../../assets/freeBox/freeBox_side.png'),
            img_freeBox_bg:require('../../assets/freeBox/freeBox_bg.png'),
            img_freeBox_box:require('../../assets/home/2.png'),
            img_freeBox_drop:require('../../assets/freeBox/freeBox_box.png'),
            img_freeBox_yellow:require('../../assets/freeBox/ym.png'),
            img_freeBox_zuanshi:require('../../assets/freeBox/freeBox_zuanshi.png'),
            nextOpen:'',
            isOpen: 0,
            canOpen:false,
        }
    },
    mounted(){
        this.getFreeBox()
    },
    methods:{
        getBgImg(val){
          return  val ? this.img_freeBox_yellow : ''
        },
        change(val){
            this.canOpen = val.value;
        },
        mouseOver (val) {
            this.show_freeBox = val;
        },
       
        async getFreeBox(){
          let res = await freeBoxDetail()
            if(res && !res.code){
                this.freeList = res.data;
                this.isOpen = res.isOpen;
                this.nextOpen = res.nextTime;
            }
            
        },
        //开箱
         openBoxFun(){
            console.log(this.isOpen)
            if (this.isOpen === 1) {
                this.openBox = true;
                this.$refs.openAnimation.getBoxFreeList();
                //this.getFreeBox();
            } else {
                this.$message.warning('今日已开启宝箱，请明日再来！');
            }
        }
    }
}
</script>
<style lang="less" scoped>
.freeBox{
    min-width: 800px;
    //padding:0px 17px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin-top: 28px;
    .freeBox_details{
        width: 100%;
        height: 416px;
        flex-shrink: 0;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: center;
        align-items: center;
        .imgll{
            width: 100%;
            height: 100%;
            flex-shrink: 0;
        }
        .freeBoxImg{
            position:absolute;
            top: 3px;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            .freeBox_details_title{
                flex: 1;
                height: 30px;
                display: flex;
                justify-content: space-between;
                .title_left{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img{
                        width: 25px;
                        height: 32px;
                    }
                    .title_spanOne{
                        margin-left: 10px;
                        color: rgb(197, 181, 255);
                        font-size: 18px;
                    }
                    .title_spanTwo{
                        margin-top: 5px;
                        margin-left: 5px;
                        color: white;
                        font-size: 10px;
                    }
                }
                .title_right{
                    span{
                        color: white;
                        font-size: 10px;
                    }
                }
            }
            .freeBox_details_list{
                flex: 1;
                height: 223px;
                display: flex;
                margin-top: 20px;
            .details_list_left{
                display: flex;
                align-items: center;
                flex: 50%;
                div{
                    flex: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            .details_list_right{
                flex: 40%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .btn{
                    margin-top: 18px;
                }
                .details_countdown{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    margin-left: 10px;
                    font-size: 32px;
                    
                    /deep/.span_q{
                        width: 44px!important;
                        line-height: 70px!important;
                        height: 70px!important;
                        font-size: 32px!important;
                        margin-right: 10px;
                    }
                }
                .details_countdown /deep/.span_countdown{
                    text-align: left;
                    margin-top: 18px;
                }
                .details_countdown /deep/.kaiqi{
                    font-size: 24px!important;
                    margin-left: -40px;
                }
            }
        }
        }
    }
    .freeBox_drop{
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 40px;
        .freeBox_drop_title{
            display: flex;
            align-items: center;
            .title_spanOne{
                color: white;
                margin-left: 10px;
            }
        }
        .freeBox_drop_list{
            margin-top: 25px;
            overflow-x: hidden;
            .list-wrap{
                display: flex;
                flex-wrap: wrap;
                flex-shrink: 0;
                margin-right: -55px;
            }
            .freeBox_drop_listOne{
                background-size:cover;  
                height: 288px;
                width: 288px;
                border-radius: 20px;
                margin: 10px 50px 50px 0;
                background-color: #303031;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
                cursor: pointer;
                img{
                    // width: 90px;
                    // height: 90px;
                }
                .yue{
                    font-size: 12px;
                    }
                .yue1{
                    margin-top: 10px;
                    font-size: 14px;
                    white-space: nowrap;  /*强制span不换行*/
                    display: inline-block;  /*将span当做块级元素对待*/
                    width: 90%;  /*限制宽度 可设px*/
                    overflow: hidden;  /*超出宽度部分隐藏*/
                    text-overflow: ellipsis;  /*超出部分以点号代替*/
                }
                .pro{
                    font-size: 12px;
                }
                .hover{
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-radius: 12px;
                    justify-content: center;
                    background:rgba(0,0,0,.5);
                    font-size: 14px;
                    .hover_div{
                        display: flex;
                        flex-direction: row;
                        margin-bottom: 5px;
                    }
                }
            }
        }
    }   
}
</style>