<template>
    <div id="sudokuDetails">
        <div class="sudokuDetails_sudo">
            <div class="title">
                <span class="tab active" @click="$router.go(-1)">
                    <i></i>
                    九宫格
                    <i></i>
                </span>
                <span
                    class="title_small">{{this.detailsData.activityName}} 第{{this.detailsData.activityTwoName}}期</span>
            </div>
            <div class="center">
                <div class="centerCard" :style="{backgroundImage:'url('+detailsData.activityImg+')'}">
                    <div class="centerCardOne" v-for="(item,index) in detailsCard" :key="index"
                         @click="cardClick(index,item)"
                         :style="{borderBottomLeftRadius: [6].includes(index)  ? '16px' : '',borderBottomRightRadius: [8].includes(index)  ? '16px' : '',borderTopLeftRadius: [0].includes(index)  ? '16px' : '',borderTopRightRadius: [2].includes(index)  ? '16px' : '',borderRight: ![2,5,8].includes(index) ? '1px solid #b9b9b9' : '',borderBottom: index < 6 ? '1px solid #b9b9b9' : ''}">
                        <div class="img">
                            <img v-lazy="item.avatar" v-show="item.flag === 1"/>
                        </div>
                        
                        <span>{{item.nickname}}</span>
                        <span v-show="item.flag == 0" style="font-size:20px">{{index+1}}</span>
                        <div class="check" v-show="item.flag === 0">
                            <div class="check_yuan"></div>
                            <div class="check_gou" v-show="cardIndex.includes(index)"></div>
                        </div>
                        <div class="hover" v-show="item.flag === 1"></div>
                    </div>
                </div>
                <div class="btn">
                    <div>
                        <span style="margin-left:18px">单价：</span>
                        <span>{{detailsData.price}}钻石</span>
                        <span style="margin-left:30px">支付金额：</span>
                        <span>{{realPrice}}钻石</span>
                    </div>
                    <div class="btn_list">
                        <gp-btn v-if="!detailsData.endTime" :width="146" :height="30"
                                bg="linear-gradient(135deg, #9fa2ff 0%, #7679ff 100%)" @click="btnClick()">立即参与
                        </gp-btn>
                        <gp-btn v-if="detailsData.endTime" :width="146" :height="30"
                                bg="linear-gradient(135deg, #9fa2ff 0%, #7679ff 100%)" @click="$router.go(-1)">已结束
                        </gp-btn>
                    </div>
                </div>
            </div>
        </div>
        <div class="sudokuDetails_title">
            <span class="tab active">
                <i></i>
                奖池
                <i></i>
            </span>
            <span class="detailed" @click="openDialog()">往期详情</span>
        </div>
        <div class="sudokuDetails_card">
            <bg :level="item.level" class="sudokuDetails_cardOne" v-for="(item,index) in detailsGoodsList" :key="index">
                <img v-lazy="item.image"/>
                <span class="yue" :title="item.name+'('+item.title+')'">{{item.name}}({{item.title}})</span>
            </bg>
        </div>
        <gp-dialog :visible.sync="dialogVisible">
            <div class="sudokuDetails_dialog">
                <span style="margin:12px 0 0 12px;">往期活动详情</span>
                <div class="sudokuDetails_select">
                    第
                    <el-select v-model="value" placeholder="请选择" @change="changeSelect()">
                        <el-option
                            v-for="item in detailsCycle"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    期
                </div>
                <div class="sudokuDetails_list">
                    <bg :level="item.level" class="sudokuDetails_one" v-for="(item,index) in pastDetails" :key="index">
                        <img class="good" v-lazy="item.goodsPicture"/>
                        <div class="title">
                            <img class="avar" v-lazy="item.avatar"/>
                            <span class="name">{{item.nickName}}</span>
                        </div>
                    </bg>
                </div>
            </div>
        </gp-dialog>
        <div class="countDown_mask" v-show="countDownImgShow">
            <img :class="{countDown_maskImg:currentIndex === 5}" :src="countDownImg[currentIndex]"
                 v-if="currentIndex < 6"/>
            <span style="font-size:22px;margin-bottom:15px" v-if="currentIndex > 5">开奖结果</span>
            <div class="countDown_maskList" v-if="currentIndex > 5">
                <bg :level="item.level" :class="{countDown_maskOne:true,countDown_maskOne_hiden:!item.me}"
                    v-for="(item,index) in countDown_maskList" :key="index">
                    <span class="countDown_maskOne_span">{{item.cellId}}</span>
                    <img class="countDown_maskOne_img" :src="item.goodsPicture"/>
                    <div class="countDown_maskOne_user">
                        <img class="user_img" :src="item.avatar"/>
                        <span>{{item.nickName}}</span>
                    </div>
                </bg>
                <div class="close" @click="maskClose"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapMutations, mapActions} from 'vuex'
    import bg from '../../components/localComponents/goodsCard/goods_bg'
    import {getSudokuDetails, getSudokuCell, getSudokuPastDetails} from '../../api/sudoku'
    import {getToken} from "../../libs/util";
    
    export default {
        name: 'sudokuDetails',
        components: {
            bg
        },
        data() {
            return {
                countDown_maskList: [],
                value: 1,
                currentIndex: 0,
                dialogVisible: false,
                countDownImgShow: false,
                bg_color: '../../assets/freeBox/bm.png',
                cardIndex: [],
                img_gun: require('../../assets/roll/roll_qiang.png'),
                detailsData: {},
                detailsCard: [],
                detailsGoodsList: [],
                detailsCycle: [],
                pastDetails: [
                    {
                        goodsPicture: require('../../assets/roll/roll_qiang.png'),
                        avatar: require('../../assets/roll/roll_qiang.png'),
                        nickName: '123'
                    },
                    {
                        goodsPicture: require('../../assets/roll/roll_qiang.png'),
                        avatar: require('../../assets/roll/roll_qiang.png'),
                        nickName: '123'
                    },
                    {
                        goodsPicture: require('../../assets/roll/roll_qiang.png'),
                        avatar: require('../../assets/roll/roll_qiang.png'),
                        nickName: '123'
                    },
                    {
                        goodsPicture: require('../../assets/roll/roll_qiang.png'),
                        avatar: require('../../assets/roll/roll_qiang.png'),
                        nickName: '123'
                    },
                    {
                        goodsPicture: require('../../assets/roll/roll_qiang.png'),
                        avatar: require('../../assets/roll/roll_qiang.png'),
                        nickName: '123'
                    },
                
                ],
                detailsGoodsListLevel: [
                    {
                        level: '受限',
                        bg_color: require('../../assets/freeBox/bm.png')
                    },
                    {
                        level: '消费级',
                        bg_color: require('../../assets/freeBox/gy.png')
                    },
                    {
                        level: '违禁',
                        bg_color: require('../../assets/freeBox/ym.png')
                    },
                    {
                        level: '非凡',
                        bg_color: require('../../assets/freeBox/ff.png')
                    },
                    {
                        level: '隐秘',
                        bg_color: require('../../assets/freeBox/jg.png')
                    }
                ],
                nextId: 0,
                countDownImg: [require('../../assets/img/countdown_5.png'), require('../../assets/img/countdown_4.png'), require('../../assets/img/countdown_3.png'), require('../../assets/img/countdown_2.png'), require('../../assets/img/countdown_1.png'), require('../../assets/img/countdown_wenhao.png')]
            }
        },
        computed: {
            realPrice() {
                return this.detailsData.price * this.cardIndex.length;
            }
        },
        methods: {
            ...mapActions(['updateUserInfo']),
            ...mapMutations(['loginModalVisible']),
            maskClose() {
                this.countDownImgShow = false;
                getSudokuDetails({id: this.nextId}).then((res) => {
                    if (res.data) {
                        this.detailsData = res.data;
                        this.detailsCard = res.data.cellDetails;
                        this.detailsGoodsList = res.data.goodsList;
                        this.detailsCycle = res.data.cycle;
                    }
                })
            },
            getcountDownImg() {
                setTimeout(() => {
                    if (this.currentIndex < this.countDownImg.length) {
                        this.getcountDownImg();
                        this.currentIndex += 1;
                    }
                }, this.currentIndex === 4 ? 2000 : 1000)
            },
            openDialog() {
                this.dialogVisible = true;
                getSudokuPastDetails({activityId: this.detailsCycle[0].id}).then((res) => {
                    if (res.data) {
                        this.pastDetails = res.data;
                    }
                })
            },
            changeSelect() {
                getSudokuPastDetails({activityId: this.value}).then((res) => {
                    if (res.data) {
                        this.pastDetails = res.data;
                    }
                })
            },
            compare(key){
                    return function(value1,value2){
                             let val1=value1[key];
                             let val2=value2[key];
                             return val1-val2;
                        }
            },
            btnClick() {
                if (!getToken()) {
                    this.loginModalVisible(true)
                    return
                }
                
                if (this.cardIndex.length > 0) {
                    let str = "";
                    for (const iterator of this.cardIndex) {
                        str += iterator + 1 + ','
                    }
                    if (str.length > 0) {
                        str = str.substr(0, str.length - 1);
                    }
                    let typeParams = {
                        activityId: this.detailsData.id,
                        cellId: str
                    }
                    console.log(str, 'typeParams');
                    getSudokuCell(typeParams).then((res) => {
                        this.currentIndex = 0;
                        if (res.code == 1) {
                            this.$message.warning(res.msg);
                            this.getSudokuDetailsList();
                        }
                        if (res.code == 0) {
                            this.getSudokuDetailsList();
                            this.cardIndex = []
                            this.updateUserInfo();
                            if (res.data.hasOwnProperty('msg')) {
                                this.$message.warning('参与失败，本轮活动已结束，即将显示开奖结果')
                            } else if (res.data.isLast) {
                                this.$message.success('参与成功,即将显示开奖结果')
                            } else {
                                this.$message.success('参与成功,请等待开奖')
                            }
                            
                        }
                        if (res.data && res.data.hasNext && res.data.isLast) {
                            res.data.list.sort(this.compare('cellId'))
                            this.countDown_maskList = res.data.list;
                            this.countDownImgShow = true;
                            this.getcountDownImg();
                            this.nextId = res.data.nextId;
                            localStorage.setItem("sudokuCardId", res.data.nextId)
                        }
                    })
                } else {
                    this.$message.warning('请选择想要购买的格子！');
                }
            },
            cardClick(val, item) {
                if (item.flag === 0)
                    this.cardIndex.includes(val) ? this.cardIndex.splice(this.cardIndex.indexOf(val), 1) : this.cardIndex.push(val);
            },
            getBgImg(val) {
                for (const item of this.detailsGoodsListLevel) {
                    if (item.level == val) {
                        return item.bg_color;
                    }
                }
                return ''
                
            },
            async getSudokuDetailsList() {
                let cardId = JSON.parse(localStorage.getItem("sudokuCardId"));
                let res
                res = await getSudokuDetails({id: cardId});
                if (res.data) {
                    this.detailsData = res.data;
                    this.detailsCard = res.data.cellDetails;
                    this.detailsGoodsList = res.data.goodsList;
                    this.detailsCycle = res.data.cycle;
                    this.cardIndex = []
                }
            }
        },
        mounted() {
            this.getSudokuDetailsList();
        }
    }
</script>
<style lang="less">
    #sudokuDetails {
        margin-top: 18px;
        min-width: 800px;
        // padding:0px 17px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        
        .sudokuDetails_sudo {
            border-radius: 16px;
            //padding: 0 16px;
            .title {
                .tab {
                    display: inline-block;
                    margin-right: 10px;
                    position: relative;
                    cursor: pointer;
                    padding: 5px 20px;
                    color: #fff;
                    
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
                        background: url('../../assets/img/tab_bg.png') no-repeat;
                        
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
                
                .title_small {
                    color: #c5b5ff;
                    font-size: 12px;
                }
            }
            
            .center {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-top: 40px;
                
                .centerCard {
                    height: 302px;
                    width: 504px;
                    display: flex;
                    flex-wrap: wrap;
                    background-size: 100%;
                    border-radius: 16px;
                    box-shadow: 2px 2px 2px 2px #615f5f;
                    
                    .centerCardOne {
                        height: 100px;
                        width: 167px;
                        flex-shrink: 0;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        position: relative;
                        
                        .img {
                            width: 40px;
                            height: 40px;
                            overflow: hidden;
                            border-radius: 50%;
                            
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        
                        span {
                            font-size: 12px;
                        }
                        
                        .check {
                            position: absolute;
                            height: 30px;
                            right: 0;
                            top: 0;
                            width: 30px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            
                            .check_yuan {
                                border-radius: 50%;
                                width: 22px;
                                height: 22px;
                                background-color: black;
                                opacity: 0.5;
                                
                            }
                            
                            .check_gou {
                                position: absolute;
                                top: 8px;
                                left: 5px;
                                right: 4px;
                                bottom: 5px;
                                background-size: 100%;
                                background-image: url('../../assets/img/sudokuDetailsCard_gou.png');
                            }
                        }
                        
                        .hover {
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: rgba(0, 0, 0, .3);
                        }
                    }
                }
                
                .btn {
                    width: 503px;
                    display: flex;
                    flex-direction: column;
                    margin-top: 12px;
                    
                    .btn_list {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        
                        .ob-btn {
                            margin: 12px 0;
                        }
                    }
                }
            }
        }
        
        .sudokuDetails_title {
            margin-top: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            
            .tab {
                display: inline-block;
                margin-right: 10px;
                position: relative;
                cursor: pointer;
                padding: 5px 20px;
                color: #fff;
                
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
                    background: url('../../assets/img/tab_bg.png') no-repeat;
                    
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
            
            .detailed {
                font-size: 12px;
                border-bottom: 1px solid white;
                cursor: pointer;
            }
        }
        
        .sudokuDetails_card {
            display: flex;
            flex-wrap: wrap;
            
            .sudokuDetails_cardOne {
                background-size: 100%;
                height: 160px;
                width: 160px;
                border-radius: 12px;
                margin: 10px 30px 30px 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
                cursor: pointer;
                
                img {
                    width: 110px;
                    height: 90px;
                }
                
                .yue {
                    margin-top: 10px;
                    font-size: 14px;
                    text-align: center;
                    white-space: nowrap; /*强制span不换行*/
                    display: inline-block; /*将span当做块级元素对待*/
                    width: 90%; /*限制宽度 可设px*/
                    overflow: hidden; /*超出宽度部分隐藏*/
                    text-overflow: ellipsis; /*超出部分以点号代替*/
                }
            }
        }
        
        .el-dialog {
            height: 588px;
            width: 494px;
            
            .el-dialog__body {
                height: 100%;
                width: 100%;
                
                .sudokuDetails_dialog {
                    height: 100%;
                    width: 100%;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    background: url('../../../public/images/login_bg.png') 100% no-repeat;
                    
                    .sudokuDetails_select {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        margin: 12px 30px 0 0;
                        
                        .el-input {
                            margin: 0 5px;
                            
                            .el-input__inner {
                                border-radius: 12px;
                                height: 23px;
                                width: 60px;
                            }
                            
                            .el-input__suffix {
                                height: 23px;
                                text-align: center;
                                line-height: 23px;
                                margin-right: 5px;
                                
                                .el-input__icon {
                                    line-height: 23px;
                                }
                            }
                        }
                    }
                    
                    .sudokuDetails_list {
                        display: flex;
                        padding: 12px;
                        flex-wrap: wrap;
                        justify-content: flex-start;
                        
                        .sudokuDetails_one {
                            flex-shrink: 0;
                            height: 125px;
                            width: 125px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            background-size: 100%;
                            margin: 0 15px 15px;
                            
                            .good {
                                width: 115px;
                                height: 60px;
                                margin: 10px;
                            }
                            
                            .title {
                                display: flex;
                                align-items: center;
                                margin: 0 10px 10px;
                                
                                .avar {
                                    width: 45px;
                                    height: 45px;
                                    border-radius: 50%;
                                }
                                
                                .name {
                                    margin-left: 5px;
                                    color: white;
                                }
                            }
                        }
                    }
                }
            }
            
        }
        
        .countDown_mask {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            bottom: 0;
            left: 0;
            position: fixed;
            z-index: 998;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            @keyframes rotate1 {
                0% {
                    transform: rotateY(180deg);
                }
                50% {
                    transform: rotateY(360deg);
                }
                100% {
                    transform: rotateY(180deg);
                }
            }
            
            .countDown_maskImg {
                animation: rotate1 2s linear infinite; /*开始动画后无限循环，用来控制rotate*/
            }
            
            .countDown_maskList {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                height: 450px;
                width: 600px;
                flex-shrink: 0;
                position: relative;
                
                .countDown_maskOne {
                    display: flex;
                    height: 150px;
                    flex: 30%;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    background-size: 100%;
                    position: relative;
                    margin: 10px;
                    
                    .countDown_maskOne_span {
                        position: absolute;
                        top: 0;
                        right: 0;
                        left: 0;
                        bottom: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 50px;
                    }
                    
                    .countDown_maskOne_img {
                        height: 80px;
                        width: 100px;
                        flex-shrink: 0;
                    }
                    
                    .countDown_maskOne_user {
                        display: flex;
                        align-items: center;
                        
                        .user_img {
                            height: 50px;
                            width: 50px;
                            border-radius: 50%;
                            margin-right: 5px;
                        }
                    }
                }
                
                .countDown_maskOne_hiden {
                    color: dimgray;
                }
                
                .close {
                    display: inline-block;
                    width: 30px;
                    height: 4px;
                    background: #fff;
                    transform: rotate(45deg);
                    position: absolute;;
                    right: -100px;
                    cursor: pointer;
                }
                
                .close::after {
                    content: '';
                    display: block;
                    width: 30px;
                    height: 4px;
                    background: #fff;
                    transform: rotate(-90deg);
                }
            }
        }
    }
</style>