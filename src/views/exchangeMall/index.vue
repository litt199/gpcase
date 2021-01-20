<template>
    <div id="exchangeMall">
        <div class="exchangeMall_search">
            <gp-input v-model="searchItem"></gp-input>
            <gp-btn :width="60" :height="35" bg="linear-gradient(135deg, #58E4FD 0%, #3692FF 100%)"
                    style="margin:0 6px 0 6px;font-size: 16px;" @click="search(1,'')">
                搜索
            </gp-btn>
            <div class="price" @click="search(2,'')">
                价格
                <!--<gp-icon class="icon" type="icondown" :size="12" color="#fff"></gp-icon>
                <gp-icon class="icon" type="icontop" :size="12" color="#fff"></gp-icon>-->
                <div class="triangle">
                    <div :class="seachPrice===0?'up':(seachPrice===1?'up selectup':'up')"></div>
                    <div :class="seachPrice===1?'down':(seachPrice===0?'down selectdown':'down')"></div>
                </div>
            </div>
        </div>
        <div class="exchangeMall_screening">
            <gp-btn :width="150" :height="36"
                    :bg="chooseBtn == index ? 'linear-gradient(135deg, #fff 0%, #fff 100%)' : '' "
                    @click="search(item,index)" style="margin:0 6px 0 6px;" v-for="(item,index) in arrList"
                    :key="index">
                <span :style="{fontSize:'17px',color:chooseBtn == index ? '#000' : '#FFF'}">{{item}}</span>
            </gp-btn>
        </div>
        <div class="exchangeMall_cardList">
            <div class="cardListDiv" v-for="(item,index) in exchangeList" :key="index">
                <div class="cardListDivTwo" @click="exchangeTips(item)">
                    <DetailsCard
                        :durable="item.goodsTitle"
                        :level="item.level"
                        :name="item.goodsName"
                        :picture="item.goodsPicture"
                        :price="item.diamond"
                        :point="item.point"
                    ></DetailsCard>
                </div>
            </div>
        </div>
        <div class="details_pagination">
            <gp-pagination layout="prev, pager, next" :total="total" :page-size="exchangeQuery.pageSize" @current-change="flipExchange"></gp-pagination>
        </div>
        <gp-dialog :visible.sync="dialogVisible">
            <div class="exchangeMall_dialog">
                <span style="font-size:18px;color:#a85cda;margin-top:28px;">确定要兑换吗？</span>
                <img v-lazy="exchangeTipItem.goodsPicture" width="150px" height="120"/>
                <p class="goodsName">{{exchangeTipItem.goodsName+'('+exchangeTipItem.goodsTitle+')'}}</p>
                <div style="width:210px;font-size:12px;">
                    <div style="color:#000;margin-bottom:6px;">兑换方式：
                        <div class="select" @click="chooseWay(1)">
                            <div v-show="changeWay1"></div>
                        </div>
                        钻石
                        <div class="select"  @click="chooseWay(2)">
                            <div v-show="changeWay2"></div>
                        </div>
                        积分
                    </div>
                    <p style="color:#000;" v-show="changeWay1">商品价格：{{exchangeTipItem.diamond}}钻石</p>
                    <p style="color:#000;" v-show="changeWay2 ">商品价格：{{exchangeTipItem.point}}积分</p>
                </div>
                <!--<gp-btn :width="210" bg="linear-gradient(to bottom, #b056f2 0%, #7413e1 100%)" style="margin-bottom:2px;height:26px;" @click="exchange">确定兑换</gp-btn>
                <gp-btn :width="210" bg="linear-gradient(220,38,38,0)" style="margin-bottom:50px;border:1px solid #000;color:#000;height:26px;" @click="dialogVisible = false">取消兑换</gp-btn>-->
                <div class="btnConfirm" style="background:linear-gradient(to bottom, #b056f2 0%, #7413e1 100%);"
                     @click="exchange">确认兑换
                </div>
                <div class="btnConfirm" style="border:1px solid #000;color:#000;margin-bottom:20px;"
                     @click="dialogVisible = false">取消兑换
                </div>
            </div>
        </gp-dialog>
        <div class="dialogVisibleTS">
            <!--<gp-dialog :visible.sync="dialogVisibleTS">
                <div class="exchangeMall_dialog_scess">
                    <span style="margin-left:15px;margin-top:5px;font-size:12px;font-weight: bold;">提示</span>
                    <span style="margin-left:15px;margin-top:8px;font-size:12px;">{{confirmExchange}}</span>
                    <div class="exchangeMall_dialog_scessD">
                        <gp-btn :width="50" :height="16" bg="linear-gradient(135deg, #7413e1 0%, #7413e1 100%)" @click="dialogVisibleTS = false">确定</gp-btn>
                    </div>
                </div>
            </gp-dialog>-->
        </div>
    </div>
</template>
<script>
    import DetailsCard from './detailsCard'
    import {mapState, mapMutations} from 'vuex'
    import {exchangeList, exchangeGoods} from '../../api/part'
    import {getToken} from "../../libs/util";
    
    export default {
        name: 'exchangeMall',
        components: {
            DetailsCard
        },
        data() {
            return {
                changeWay1: true,
                changeWay2: false,
                searchBtnItem: '',
                searchItem: "",//搜索框内容
                seachPrice: "",//价格
                total: 0,
                img_zuanshizi: require('../../assets/img/img_zuanshizi.png'),
                dialogVisible: false,
                dialogVisibleTS: false,
                arrList: ['全部', '匕首', '手枪', '步枪', '微型冲锋枪', '散弹枪', '机枪', '手套', '其他'],
                chooseBtn: 0,
                exchangeQuery: {//兑换商城查询
                    pageNum: 1,
                    pageSize: 18,
                    item: null,
                    isDesc: 2,
                    keyWord: null
                },
                exchangeList: [],
                exchangeTipItem: {},
                confirmExchange: "恭喜你，兑换成功。",
                buyType: 0
            }
        },
        mounted() {
            this.getExchangeList()
        },
        computed: {
            ...mapState({
                userInfo: state => state.userModules.userInfo
            }),
        },
        methods: {
            ...mapMutations(['loginModalVisible']),
            //选择兑换方式
            chooseWay(num) {
                if (num === 1) {
                    if (this.changeWay2 === true) {
                        this.changeWay2 = false;
                    }
                    this.changeWay1 = !this.changeWay2;
                } else {
                    if (this.exchangeTipItem.point) {
                        if (this.changeWay1 === true) {
                            this.changeWay1 = false;
                        }
                        this.changeWay2 = !this.changeWay2;
                    } else {
                        //this.confirmExchange="该商品不支持积分兑换！"
                        // this.dialogVisibleTS = true;
                        this.$msg({
                            content: '该商品不支持积分兑换'
                        })
                        
                    }
                }
            },
            exchangeTips(item) {
                if (!getToken()) {
                    this.loginModalVisible(true)
                    return
                }
                this.dialogVisible = true;
                this.exchangeTipItem = item;
                this.changeWay1 = true;
                this.changeWay2 = false;
            },
            //兑换弹窗
            exchange() {
                console.log(this.exchangeTipItem)
                if (this.changeWay1 === true) {
                    this.buyType = 0
                    if (this.userInfo.diamond >= this.exchangeTipItem.diamond) {
                        this.exchangeBuy()
                    } else {
                        this.dialogVisible = false;
                        // this.confirmExchange="余额不足，请去充值！"
                        // this.dialogVisibleTS = true;
                        this.$msg({
                            content: '余额不足，请去充值！'
                        })
                    }
                } else {
                    this.buyType = 1
                    if (this.userInfo.point >= this.exchangeTipItem.point) {
                        this.exchangeBuy()
                    } else {
                        this.dialogVisible = false;
                        // this.confirmExchange="积分不足，请去充值！"
                        // this.dialogVisibleTS = true;
                        this.$msg({
                            content: '积分不足，请去获取积分！'
                        })
                    }
                }
            },
            exchangeBuy() {
                exchangeGoods({
                    id: this.exchangeTipItem.id,
                    buyType: this.buyType
                }).then((res) => {
                    console.log(res)
                    this.dialogVisible = false;
                    /*this.confirmExchange=res.msg;
                    this.dialogVisibleTS = true;*/
                    this.$msg({
                        content: res.msg,
                    })
                })
            },
            //获取列表
            getExchangeList() {
                exchangeList(this.exchangeQuery).then((res) => {
                    this.total = res.total;
                    this.exchangeList = res.data;
                })
            },
            //翻页
            flipExchange(val, index) {
                this.exchangeQuery.pageNum = val;
                this.getExchangeList();
            },
            search(val, index) {
                if (val === 1) {
                    this.exchangeQuery.keyWord = this.searchItem;
                } else if (val === 2) {
                    if (this.seachPrice === 1) {
                        this.seachPrice = 0
                    } else {
                        this.seachPrice = 1
                    }
                    this.exchangeQuery.isDesc = this.seachPrice;
                } else {
                    this.searchItem = '';
                    this.exchangeQuery.keyWord = "";
                    if (val === "全部") {
                        this.exchangeQuery.item = null;
                    } else {
                        this.exchangeQuery.item = val;
                        this.exchangeQuery.pageNum = 1;
                    }
                    this.chooseBtn = index
                }
                
                this.getExchangeList();
            }
        }
    }
</script>
<style lang="less">
    #exchangeMall {
        //padding: 0px 17px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        min-height: 500px;
        .exchangeMall_search {
            height: 36px;
            margin-top: 15px;
            display: flex;
            align-items: center;
            
            .price {
                font-size: 22px;
                margin-left: 10px;
                position: relative;
                display: flex;
                
                .icon {
                    position: absolute;
                    cursor: pointer;
                    
                    &:first-child {
                        top: 10px;
                        right: -20px;
                    }
                    
                    &:last-child {
                        top: 0;
                        right: -20px;
                    }
                }
            }
            
            .el-input {
                margin: 6px;
                height: 36px;
                width: 150px;
                
                .el-input__inner {
                    height: 36px;
                    width: 150px;
                    border-radius: 16px;
                }
            }
        }
        
        .exchangeMall_screening {
            margin-top: 15px;
            display: flex;
            height: 23px;
            align-items: center;
            
            .ob-btn {
                border: 1PX solid white;
                flex-shrink: 0;
                width: auto;
            }
        }
        
        .exchangeMall_cardList {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            
            .cardListDiv {
                // width: 20%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 35px;
                
                .cardListDivTwo {
                    position: relative;
                    width: 240px;
                    height: 240px;
                    border-radius: 12px;
                    margin: 0 24px 0px 8px;
                    flex-shrink: 0;
                    cursor: pointer;
                }
            }
        }
        
        .details_pagination {
            margin-top: 120px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            
            .el-pagination .btn-next, .el-pagination .btn-prev {
                color: white;
                background-color: rgb(36, 36, 36) !important;
            }
        }
        
        .el-dialog {
            height: 370px;
            width: 300px;
            
            .el-dialog__body {
                height: 100%;
                width: 100%;
                
                .exchangeMall_dialog {
                    height: 100%;
                    width: 100%;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    background: url('../../../public/images/login_bg.png') 100% no-repeat;
                    
                    .btnConfirm {
                        width: 210px;
                        margin-bottom: 2px;
                        height: 26px;
                        border-radius: 18px;
                        text-align: center;
                        line-height: 26px;
                        color: #fff;
                        cursor: pointer;
                    }
                    
                    .goodsName {
                        color: rgb(0, 0, 0);
                        font-size: 12px;
                        background: #f5f5f5;
                        padding: 2px 12px;
                        border-radius: 16px;
                        box-shadow: 1px -1px 2px #888888;
                        margin: 0 20px;
                    }
                    
                    .select {
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        border: 2px solid #7212e0;
                        padding: 1px;
                        box-sizing: border-box;
                        display: inline-block;
                        margin-right: 4px;
                        cursor: pointer;
                        div {
                            
                            width: 4px;
                            height: 4px;
                            background: #7212e0;
                            border-radius: 50%;
                        }
                    }
                }
            }
            
        }
        
        .dialogVisibleTS {
            .el-dialog {
                top: 60px;
                height: 86px;
                width: 165px;
                
                .el-dialog__body {
                    height: 100%;
                    width: 100%;
                    
                    .exchangeMall_dialog_scess {
                        height: 100%;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        
                        .exchangeMall_dialog_scessD {
                            margin-top: 10px;
                            margin-right: 15px;
                            display: flex;
                            justify-content: flex-end;
                        }
                    }
                }
                
            }
        }
        
        .triangle {
            margin-left: 10px;
            margin-top: 6px;
            cursor: pointer;
        }
        
        .triangle .up {
            width: 0;
            height: 0;
            border-width: 0 4px 4px;
            border-style: solid;
            border-color: transparent transparent #AAA;
            margin: 4px auto;
            position: relative;
        }
        
        .triangle .down {
            width: 0;
            height: 0;
            border-width: 4px 4px 0;
            border-style: solid;
            border-color: #AAA transparent transparent;
            margin: 4px auto;
            position: relative;
        }
        
        .triangle .selectup {
            border-color: transparent transparent #E60064;
        }
        
        .triangle .selectdown {
            border-color: #E60064 transparent transparent;
        }
        
    }
</style>