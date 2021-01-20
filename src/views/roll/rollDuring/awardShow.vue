<template>
    <div id="rollDuring_detailsShow">
        <div class="detailsShow_title" style="margin-top: 40px;" v-if="!cardDetails.status">
            <div class="detailsShow_titleLeft">
                <img v-lazy="img_details_show" /><span>获奖名单</span><img v-lazy="img_details_show" />
            </div>
            <div class="detailsShow_titleRight">{{joinNumber}}人</div>
        </div>
        <div class="detailsShow_winners"  v-if="!cardDetails.status">
            <div v-for="(item,index) in winners" :key="index" class="detailsShow_winnersList">
                <div class="detailsShow_winnersUp">
                    <img v-lazy="item.avatar" />
                    <span style="color:#000;">{{item.nickName}}</span>
                </div>
                <div class="detailsShow_winnersDown">
                    <div class="img">
                        <img v-lazy="item.image" />
                    </div>
                    
                    <p class="name" :title="item.name">{{item.name}}</p>
                </div>
            </div>
        </div>
        <div class="detailsShow_title" style="margin-top: 50px;">
            <div class="detailsShow_titleLeft">
                <img v-lazy="img_details_show" /><span>奖品展示</span><img v-lazy="img_details_show" />
            </div>
            <div class="detailsShow_titleRight">{{cardNumber}}件</div>
        </div>
        <div class="detailsShowList">
            <div class="detailsShowList_left">
                <img :src="img_details_left" @click="rollGoodsClickLeft(-1)" />
            </div>
            <div class="detailsShowList_center">
                <div class="detailsShowList_centerList">
                    <div class="centerList" v-for="(item,index) in rollGoods" :key="index">
                        <DetailsCard :detailsCardList="item"></DetailsCard>
                    </div>
                </div>
            </div>
            <div class="detailsShowList_right">
                <img :src="img_details_right" @click="rollGoodsClickRight(1)" />
            </div>
        </div>
        <div class="detailsShow_title" >
            <div class="detailsShow_titleLeft" >
                <img v-lazy="img_details_show" /><span>参与用户</span><img v-lazy="img_details_show" />
            </div>
            <div class="detailsShow_titleRight">{{joinNumber}}人</div>
        </div>
        <div class="detailsUserList">
            <div class="nodata" v-if="!joinUser.length">暂无参与用户</div>
            <div class="" v-for="(item,index) in joinUser" :key="index">
                <div class="img">
                    <img v-lazy="item.avatar" />
                </div>
                
                <span>{{item.nickName}}</span>
            </div>
            
        </div>
        <div class="details_pagination">
            <div class="paging">
                <gp-pagination 
                    layout="prev, pager, next" 
                    :total="joinNumber"
                    :page-size="size"
                    @current-change="changePageNum"
                    @prev-click="prevClick"
                    @next-click="nextClick"	
                >
                </gp-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { getRollDetails,getRollPwd } from '../../../api/roll'
import DetailsCard from '../detailsCard'
export default {
    name: 'awardShow',
    components:{
        DetailsCard
    },
    computed:{  
    },
    data(){
        return{
            img_details_show:require('../../../assets/roll/details_show.png'),
            img_details_left:require('../../../assets/roll/details_left.png'),
            img_details_right:require('../../../assets/roll/details_right.png'),
            img_roll_qiang:require('../../../assets/roll/roll_qiang.png'),
            cardDetailsList: [],
            cardDetails:{},
            joinNumber: 0,
            cardNumber: 0,
            rollGoods:[],
            joinUser:[],
            rollPage:1,
            size:28,
            winners:[]
        }
    },
    methods:{
        //分页
        changePageNum(val){
            this.joinUser = [];
            this.joinUser = this.cardDetailsList.joinUser.slice(val*28,(val+1)*28);
        },
        prevClick(val) {
            this.joinUser = this.cardDetailsList.joinUser.slice((val-1)*28,val*28);
        },
        nextClick(val) {
            this.joinUser = this.cardDetailsList.joinUser.slice(va*28,(val+1)*28);
        },
        // 奖品分页
        rollGoodsClickLeft(val) {
            this.rollPage += -1;
            let conut = this.rollPage * 10;
            if (this.rollPage > 0) {
                this.rollGoods = []
                this.rollGoods = this.cardDetailsList.rollGoods.slice(conut-10,conut)              
            } else {
                this.rollPage += 1;
            }
        },
        // 奖品分页
        rollGoodsClickRight(val) {
            this.rollPage += 1;
            let conut = this.rollPage * 10;
            if (this.cardNumber > conut) {
                this.rollGoods = []
                this.rollGoods = this.cardDetailsList.rollGoods.slice(conut,conut+10)
            } else {
                this.rollPage += -1;
            }
        },
        // 请求
        getDetailsList(){
            let typeParams= {
                id: JSON.parse(localStorage.getItem("cardDetails")).id,
            }
            getRollDetails(typeParams).then((res)=>{
                if (res.data) {
                    this.cardDetailsList = res.data;
                    this.joinNumber = this.cardDetailsList.joinUser.length;
                    this.cardNumber = this.cardDetailsList.rollGoods.length;
                    this.rollGoods = this.cardDetailsList.rollGoods.slice(0,10);
                    console.log(this.rollGoods,'this.rollGoods');
                    this.joinUser = this.cardDetailsList.joinUser.slice(0,28);
                    for (const iterator of this.cardDetailsList.rollGoods) {
                      if (iterator.avatar !== null || iterator.nickName !== null) {
                          console.log(iterator,'iterator');
                          this.winners.push(iterator);
                      }  
                    }
                    console.log(this.cardDetailsList,'this.cardDetailsList');
                }
            })            
        }
    },
    mounted(){
        this.cardDetails = JSON.parse(localStorage.getItem("cardDetails"));
        this.getDetailsList();
        
    }
}
</script>
<style lang="less">
#rollDuring_detailsShow{
    width: 100%;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    .detailsShow_title{
        margin-top: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .detailsShow_titleLeft{
            display: flex;
            img{
                width: 20px;
                height: 25px;
                margin-right: 10px;
            }
            span{
                color: white;
                font-size: 16px;
            }
        }
        .detailsShow_titleRight{
            color: white;
        }
    }
    .detailsShow_winners{
        margin-top: 16px;
        width: 100%;
        height: 250px;
        border-radius: 12px;
        display: flex;
        align-items: center; 
        overflow: hidden;
        .detailsShow_winnersList{
            height: 243px;
            width: 197px;
            flex-shrink:0;
            margin-right: 12px;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            background: url('../../../assets/roll/details_winner.png') no-repeat;
            background-size:100% 100%;
            .detailsShow_winnersUp{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img{
                    width: 90px;
                    height: 90px;
                    border-radius: 50%;
                }
                span{
                    font-size: 12px;
                }
            }
            .detailsShow_winnersDown{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                position: relative;
                .img{
                    width: 120px;
                    img{
                        width: 100%;
                    }
                }
                span{
                    font-size: 12px;
                }
                .name{
                    position: absolute;
                    left: 0;
                    bottom: 10px;
                    width: 100%;
                    color: #000;
                    box-sizing: border-box;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    padding: 0 10px;
                }
            }
        }      
    }
    .detailsShowList{
        margin-top: 16px;
        width: 100%;
        //height: 305px;
        padding: 20px 0;
        border-radius: 12px;
        display: flex;
        align-items: center;
        .detailsShowList_left{
            width: 122px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img{
                width: 73px;
                cursor: pointer;
            }
        }
        .detailsShowList_center{
            flex: 1;
            display: flex;
            justify-content: flex-start;
            .detailsShowList_centerList{
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                margin-right: -50px;
            .centerList{
                width: 260px;
                height: 260px;
                margin-right: 26px;
                margin-bottom: 30px;
                border-radius: 12px;
            }
            }
        }
        .detailsShowList_right{
            width: 122px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            img{
                width: 73px;
                cursor: pointer;
            }
        }        
    }
    .detailsUserList{
        margin-top: 16px;
        border-radius: 12px;
        display: flex;
        flex-wrap: wrap;
        background-color: rgb(27,27,27);
        padding: 0 30px;
        padding-top: 16px;
        min-height: 100px;
        >div{
            width: 225px;
            display: flex;
            height: 80px;
            margin-bottom: 16px;
            align-items: center;
            .img{
                width: 80px;
                height: 80px;
                overflow: hidden;
                border-radius: 50%; 
                margin-right: 5px;
                img{
                    width: 100%;
                }
            }
            span{
                width: 130px;
                font-size: 20px;
                color: white;
                margin-left: 5px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }      
    }
    .details_pagination{
        margin-top: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-pagination .btn-next, .el-pagination .btn-prev{
            color: white;
            background-color: rgb(36, 36, 36)!important;
        }
    }
}
</style>