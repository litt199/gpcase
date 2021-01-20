<template>
    <div class="freeBox">
        <div class="freeBox_details">
            <img :src="img_freeBox_bg"  style="width:100%;min-height:420px;"/>
            <div class="freeBoxImg" v-show="!openBox">
                <div class="freeBox_details_title">
                    <div class="title_left">
                        {{box.name}}
                    </div>
                    <div class="title_right">
                        <span>开箱玩法是本站提供的休闲娱乐活动，切勿沉迷！</span>
                    </div>
                </div>
                <div class="freeBox_details_list">
                    <div class="details_list_left">
                        <!--<div class="topCost">
                            <img src="../../assets/home/box1.png" alt="">
                            <p>X{{clickNumber}}</p>
                        </div>-->
                        <div></div>
                        <div>
                            <img :src="box.image"  style="width:260px;"/>
                        </div>
                       
                        <!--<div class="cost">
                            <img src="../../assets/openBox/price.png" alt="">
                            <img src="../../assets/home/box5.png" alt="">
                            <p>{{box.price*(clickNumber)}}</p>
                        </div>-->
                    </div>
                    <div class="details_list_right">
                        <!--<div class="details_countdown">
                                <span v-for="(item,index) in boxNumber" :key="index" @click="btnClick(index)" :class="{hover:btnClickIndex == index}">{{item}}</span>
                        </div>-->
                        <gp-btn :width="270" :height="39" bg="linear-gradient(to right, #bc74ff, #7e4eff)" style="font-size:17px;" @click="openBoxFun(clickNumber)">
                            立即开箱
                            <img src="../../assets/home/box5.png" alt="" style="width:15px;margin-left:30px;">
                            <p style="margin-left:2px;">{{box.price*(clickNumber)}}</p>
                        </gp-btn>
                    </div>
                </div>
            </div>
            <openAnimation v-show="openBox" :openNum="clickNumber -1" @closeOpenBox="()=>{this.openBox = false}" ref="openAnimation"/>
        </div>
        
        <div class="freeBox_drop">
            <div class="freeBox_drop_title">
                <img :src="img_freeBox_side" />
                <span class="title_spanOne">高爆推荐</span>
                <img :src="img_freeBox_side" />
            </div>
            <div class="freeBox_drop_list">
             
                <div class="list-wrap">
                    <goods-card :data="item" v-for="(item,index) in goodsList" :key="index"></goods-card>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations,mapActions} from 'vuex'
import {openBox,openBoxList,boxDetail} from '../../api/part';

import goodsCard from "../../components/localComponents/goodsCard/goodsCard_open";
import openAnimation from '../openBoxAnimation/openBox'
import {getToken} from "../../libs/util";
export default {
    name: 'openCase',
    components:{
        openAnimation,
        goodsCard
    },
    data(){
        return{
            boxNumber:[1,2,3,4,5,10],
            clickNumber: 1,
            openBox:false,
            //箱子分组id
            id:this.$route.query.id,
            box:[],
            goodsList:[],
            btnClickIndex: 0,
            show_freeBox: 0,
            img_freeBox_side:require('../../assets/freeBox/freeBox_side.png'),
            img_freeBox_bg:require('../../assets/openBox/open_bg.png'),
            img_freeBox_box:require('../../assets/freeBox/freeBox_box.png'),
            img_freeBox_drop:require('../../assets/freeBox/freeBox_box.png'),
            img_freeBox_yellow:require('../../assets/freeBox/ym.png'),
            img_freeBox_zuanshi:require('../../assets/freeBox/freeBox_zuanshi.png'),
        }
    },
    mounted(){
        this.getBoxDetail()
    },
    computed:{
        ...mapState({
                userInfo: state => state.userModules.userInfo
            }),
        },
    methods:{
        ...mapActions(['updateUserInfo']),

        mouseOver (val) {
            this.show_freeBox = val;
        },
        btnClick(val) {
          this.btnClickIndex = val;
          this.clickNumber = this.boxNumber[val];
        },
        getBoxDetail(){
            boxDetail(this.id).then((res)=>{
                this.box = res.data[0].box
                this.goodsList = res.data[0].goodsList
            })
        },
        openBoxFun(){
            if(!getToken()){
                this.$message.warning('请先去登录！');
                return
            }
            if(this.userInfo.diamond>=this.box.price*(this.clickNumber)){
                this.openBox = true;
                this.$refs.openAnimation.getBoxList();
                
            }else{
                this.$message.warning('钻石不足请充值！');
            }
            
        }
        
    }
}
</script>
<style lang="less" scoped>
.freeBox{
    min-width: 600px;
    //padding:0px 17px;
    box-sizing: border-box;
   // background-color: rgb(36,36,36);
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    .freeBox_details{
        width: 100%;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: center;
        align-items: center;
        min-height: 420px;
        .img{
            width: 100%;
        }
        .freeBoxImg{
            position:absolute;
            top: 3px;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            
            .topCost{
                cursor: pointer;
                position: absolute;
                top: 30px;
                right: 0;
                img:nth-child(1){
                    width: 44px;
                    height: 36px;
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    z-index: 2
                }
                p{
                    width: 35px;
                    height: 26px;
                    line-height: 36px;
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    z-index: 3;
                    transform: rotate(29deg);
                    text-align: center;
                }
            }
            .cost{
                cursor: pointer;
                position: absolute;
                bottom: 50px;
                right: 0;
                width: 66px;
                height: 28px;
                img:nth-child(1){
                    width: 100%;
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    z-index: 2
                }
                img:nth-child(2){
                    width: 16px;
                    z-index: 2;
                }
                p{
                    z-index: 3;
                    margin-left: 2px;
                }
            }
            .freeBox_details_title{
                flex: 1;
                height: 30px;
                display: flex;
                justify-content: space-between;
                .title_left{
                    margin-left: 20px;
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
                height: 300px;
                display: flex;
                flex-direction: column;
            .details_list_left{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .details_list_right{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 20px;
                .details_countdown{
                    margin-top: 12px;
                    height: 30px;
                    width: 210px;
                    line-height: 30px;
                    text-align: center;
                    margin-bottom: 12px; 
                    display: flex;  
                    justify-content: space-between;
                    align-items: center;
                    span{
                        border-radius: 50%;
                        border: 1px solid #bc74ff;
                        height: 30px;
                        width: 30px; 
                        flex-shrink: 0; 
                        background: linear-gradient(45deg, #bc74ff, #7e4eff);
                        background-clip: text;
                        color: transparent;
                        font-weight:900; 
                        cursor: pointer; 
                    }
                    .hover{
                        background-clip:unset;
                        color: white;
                    }                
                }
            }
        }
        }
    }
    .freeBox_drop{
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 30px;
        .freeBox_drop_title{
            display: flex;
            align-items: center;
            .title_spanOne{
                color: white;
                margin-left: 10px;
            }
        }
        .freeBox_drop_list{
            margin-top: 30px;
            overflow-x: hidden;
            .list-wrap{
                display: flex;
                flex-wrap: wrap;
                flex-shrink: 0;
                margin-right: -55px;
            }
            /*.freeBox_drop_listOne{
                background-size:cover;  
                height: 160px;
                width: 160px;
                border-radius: 12px;
                margin: 10px 30px 30px 0;
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
                    margin-top: 10px;
                    font-size: 14px;
                    white-space: nowrap;  !*强制span不换行*!
                    display: inline-block;  !*将span当做块级元素对待*!
                    width: 90%;  !*限制宽度 可设px*!
                    overflow: hidden;  !*超出宽度部分隐藏*!
                    text-overflow: ellipsis;  !*超出部分以点号代替*!
                    text-align: center;
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
            }*/
        }
    }   
}
</style>