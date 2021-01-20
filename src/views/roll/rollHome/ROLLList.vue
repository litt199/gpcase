<template>
    <div id="ROLLList">
        <div class="ROLLList_details">
            <img v-lazy="img_details"/>
        </div>
        <div class="ROLLList_search">
            <div class="ROLLList_searchList">
                <div class="ROLLList_searchOne">
                    <span>ROLL房类型</span>
                    <el-select v-model="value" placeholder="请选择" @change="changeSelect()">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="ROLLList_searchTwo">
                    <span>ROLL房名称</span>
                    <gp-input v-model="rollName" @blur="nameInput()"></gp-input>
                </div>
                <div class="ROLLList_searchBtn">
                    <gp-btn :width="170" :height="36" bg="linear-gradient(135deg, #32fe94 0%, #439dfe 100%)"
                            @click="btnClick(1)">进行中
                    </gp-btn>
                    <gp-btn :width="170" :height="36" bg="linear-gradient(135deg, #449aff 0%, #884aff 100%)"
                            @click="btnClickMy(-1)">我参与的
                    </gp-btn>
                    <gp-btn :width="170" :height="36" bg="linear-gradient(135deg, #884aff 0%, #d043ff 100%)"
                            @click="btnClick(0)">已结束
                    </gp-btn>
                </div>
            </div>
            <div class="ROLLList_searchInfo">
                <div class="tip-handler" @mouseenter="showTip = true" @mouseleave="showTip = false">
                    <img v-lazy="img_roll_shuoming"/>
                    <div class="tip">
                        玩法说明
                    </div>
                </div>
                
                
                <div class="tip-child" v-show="showTip">
                    <div class="wrap">
                        <p>
                            1、本站ROLL房分为无门槛ROLL房、密码房、充值福利房以及推广活动房；
                        </p>
                        <p>
                            2、无门槛ROLL房：站内所有玩家均可免费参与，是本站给予所有玩家的福利
                        </p>
                        <p>
                            3、密码房：需要输入密码才能参与的ROLL房；
                        </p>
                        <p>
                            4、充值福利房：充值达到房间要求的都可参与；
                        </p>
                        <p>
                            5、推广活动房：推广活动专属房间，请在推广活动查看解锁规则；
                        </p>
                        <p>
                            6、若中奖，平台自动将奖品发放至您的背包中，请及时查验；
                        </p>
                        <p>
                            7、在活动中若发现恶意行为，平台将取消该玩家的中奖资格；
                        </p>
                    </div>
                </div>
            
            </div>
        </div>
        <div class="ROLLList_cardList">
            <div class="ROLLList_cardListD">
                <div class="ROLLList_listCol" v-for="(item,index) in cardList" :key="index">
                    <ROLLCard :cardDetails="item" :key="`${componentKey}-${index}`"></ROLLCard>
                </div>
            </div>
        </div>
        <div class="details_pagination">
            <gp-pagination
                layout="prev, pager, next"
                :total="total"
                @current-change="changePageNum"
                @prev-click="prevClick"
                @next-click="nextClick"
            >
            </gp-pagination>
        </div>
    </div>
</template>
<script>
    import GpDropMenu from '@/components/dropDownMenu/GpDropMenu'
    import ROLLCard from './ROLLCard'
    import {getRollList, getRollMyJoin} from '../../../api/roll'
    
    export default {
        name: 'ROLLList',
        components: {
            GpDropMenu,
            ROLLCard,
        },
        data() {
            return {
                options: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: 1,
                        label: '免费'
                    }, {
                        value: 2,
                        label: '密码'
                    }, {
                        value: 3,
                        label: '充值'
                    }
                
                ],
                componentKey: 0,
                page: 1,
                size: 8,
                total: 0,
                value: '',
                search: '',
                img_details: require('../../../assets/roll/roll_details.png'),
                img_roll_shuoming: require('../../../assets/roll/roll_shuoming.png'),
                rollName: '',
                cardList: [],
                status: -1,
                showTip: false
            }
        },
        methods: {
            // 房名查找
            nameInput() {
                this.value = '';
                this.status = -1;
                this.getList();
            },
            // 类型查找
            changeSelect() {
                this.rollName = '';
                this.status = -1;
                this.getList();
            },
            // 状态查找
            btnClick(val) {
                this.status = val;
                this.getList();
            },
            btnClickMy(val) {
                let typeParams = {
                    pageNum: this.page,
                    pageSize: this.size,
                    status: -1
                }
                getRollMyJoin(typeParams).then((res) => {
                    console.log(res)
                    if (res.data) {
                        this.cardList = [];
                        this.cardList = res.data;
                        this.componentKey += 1;
                    }
                })
            },
            //分页
            changePageNum(val) {
                this.page = val;
                this.getList();
            },
            prevClick(val) {
                this.page = val;
                this.getList();
            },
            nextClick(val) {
                this.page = val;
                this.getList();
            },
            // 请求数据
            getList() {
                let typeParams = {
                    pageNum: this.page,
                    pageSize: this.size,
                    status: this.status,
                    rollTitle: this.rollName,
                    joinWay: this.value,
                    timeOrder: 0
                }
                getRollList(typeParams).then((res) => {
                    console.log(res)
                    if (res.data) {
                        this.cardList = [];
                        this.cardList = res.data;
                        this.componentKey += 1;
                    }
                })
            },
            getMyList() {
                let typeParams = {
                    pageNum: this.page,
                    pageSize: this.size,
                    status: this.status,
                    rollTitle: this.rollName,
                    joinWay: this.value,
                    timeOrder: 0
                }
                getRollMyJoin(typeParams).then((res) => {
                    if (res.data) {
                        this.cardList = [];
                        this.cardList = res.data;
                        this.componentKey += 1;
                    }
                })
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>
<style lang="less">
    #ROLLList {
        width: 100%;
        display: flex;
        flex-direction: column;
        
        .ROLLList_details {
            margin-top: 16px;
            min-height: 108px;
            width: 100%;
            border-radius: 18px;
            
            img {
                width: 100%;
                height: 100%;
            }
        }
        
        .ROLLList_search {
            margin-top: 25px;
            //height: 30px;
            border-radius: 18px;
            display: flex;
            flex-wrap: wrap;
            position: relative;
            
            .ROLLList_searchList {
                //position: absolute;
                left: 18px;
                font-size: 16px;
                // height: 30px;
                //width: 900px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                z-index: 2;
                
                .ROLLList_searchOne {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 20px;
                    
                    span {
                        color: white;
                        font-size: 16px;
                        flex-shrink: 0;
                        margin-right: 10px;
                    }
                    
                    .el-input {
                        .el-input__inner {
                            background-color: #363636;
                            border-radius: 18px;
                            height: 36px;
                            line-height: 36px;
                            
                            width: 180px;
                            color: white;
                        }
                        
                        .el-input__suffix {
                            height: 36px;
                            text-align: center;
                            line-height: 36px;
                            
                            .el-input__icon {
                                line-height: 36px;
                            }
                        }
                    }
                }
                
                .ROLLList_searchTwo {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 20px;
                    
                    span {
                        color: white;
                        font-size: 16px;
                        flex-shrink: 0;
                        margin-right: 10px;
                    }
                    
                    .el-input {
                        // height: 23px;
                        // width: 120px;
                        .el-input__inner {
                            height: 36px;
                            line-height: 36px;
                            border-radius: 18px;
                            width: 180px;
                        }
                    }
                }
                
                .ROLLList_searchBtn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 20px;
                    
                    .ob-btn {
                        margin-right: 12px;
                        cursor: pointer;
                        font-size: 16px;
                    }
                }
            }
            
            .ROLLList_searchInfo {
                
                flex: 1;
                display: flex;
                justify-content: flex-end;
                position: relative;
                font-size: 12px;
                
                .tip-handler {
                    display: flex;
                    align-items: center;
                    
                    img {
                        margin-right: 5px;
                    }
                }
                
                .tip-child {
                    position: absolute;
                    width: 400px;
                    top: -20px;
                    right: 70px;
                    padding: 20px;
                    z-index: 3;
                    
                    .wrap {
                        background: #303133;
                        border-radius: 10px;
                        width: 100%;
                        padding: 10px;
                    }
                }
                
                img {
                    height: 16px;
                    width: 13px;
                }
                
                /*div{
                   
                    height: 13px;
                    width: 48px;
                    border-bottom: 1px solid #FFFFFF;
                    font-size: 12px;
                    cursor: pointer;
                    color: white;
                    font-family: SourceHanSansCN-Bold;
                }        */
            }
        }
        
        .ROLLList_cardList {
            margin-top: 16px;
            width: 100%;
            min-height: 632px;
            /*display: flex;*/
            /*justify-content: center;*/
            /*align-items: center;*/
            /*flex-wrap: wrap;*/
            
            .ROLLList_cardListD {
                display: flex;
                /*height: 620px;*/
                /*width: 1200px;*/
                flex-wrap: wrap;
                margin-right: -15px;
                
                ::-webkit-scrollbar {
                    display: none; /*ChromeSafari*/
                }
                
                .ROLLList_listCol {
                    min-width: 288px;
                    height: 288px;
                    border-radius: 10px;
                    margin-right: 44px;
                    margin-top: 25px;
                }
            }
        }
        
        .details_pagination {
            position: relative;
            margin-top: 20px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            
            .el-pagination .btn-next, .el-pagination .btn-prev {
                color: white;
                background-color: rgb(36, 36, 36) !important;
            }
        }
    }
</style>