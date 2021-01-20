<template>
    <div class="page" v-if="show">
        <div class="transverse"></div>
        
        <div class="slideBox" v-if="arr.length" :style="{left:'-'+numberJuli+'px',filter:`blur(${blurNumber}px)`}">
            <div :class="['frame']"
                 :style="[{borderColor:item.borde_color}]"
                 v-for="(item,index) in arr"
                 :key="index">
                <img class="img" :src="item.image||item.goodsPiture" alt="">
            </div>
        </div>
        <div class="slideBox1" :style="{left:'-'+numberJuli+'px'}">
            <div class="frame frame1"
                     :style="{borderColor:item.borde_color,}"
                 v-for="(item,index) in arr"
                 :key="index">
            </div>
        </div>
        
        <!-- 开始按钮 -->
        <!--<div class="button" @click="openStart">开始</div>
        <div class="cancel" @click="openCancel">取消</div>-->
        
        <popUp
            :level='level'
            :firImg='firImg'
            :type="type"
            :name="name"
            @FatherDeposited="closeBoxOne"
            @recovery="recovery(luckId)"
            v-if="showPopUp"
            :money="money"
            :price="price"
            :free="free"
        ></popUp>
        
        <TenAndFive
            v-if="showTen"
            @FatherDeposited="closeBoxMany"
            @recovery="recovery"
            :arr="tipsArr"
            :totalMoney="totalMoney"
        ></TenAndFive>
    </div>
</template>

<script>
    import axios from 'axios'
    import popUp from './popUp'
    import TenAndFive from './TenAndFive'
    import {openBox, boxDetail, openDayPrize, freeBoxDetail} from '../../api/part'
    import {postSellGood} from "../../api/backpack";
    import {mapActions} from 'vuex'
    
    export default {
        name: '',
        components: {
            popUp,
            TenAndFive
        },
        props: {
            openNum: {
                type: Number,
                dafault: 0
            }
        },
        data() {
            return {
                img_freeBox_zuanshi:require('../../assets/freeBox/freeBox_zuanshi.png'),//钻石默认图片
                totalMoney: 0,
                id: this.$route.query.id,
                arr: [],
                blurColor: true,  //本体是否模糊
                numberJuli: 0,
                lastIndex: 0,
                Timer: "",  //清除缓存
                suo: true,  //控制开箱动画
                showPopUp: false,  //开一次的显示和隐藏
                firImg: "",  //储存给开单个枪械的图
                name:"",
                type:"",
                level: '',  //储存给单个枪械的级别
                money: 0,//开启单个回收价格
                price: 0, // 免费宝箱回收价格
                showTen: false,  //控制10连开的显示和隐藏
                blurNumber: 5,  //控制
                tipsArr: [],
                show: false,
                luckId: '',
                free: false
            }
        },
        mounted() {
        },
        
        methods: {
            ...mapActions(['updateUserInfo']),
            closeBoxOne() {
                this.showPopUp = false;
                this.$emit("closeOpenBox");
            },
            async tenRecovery() {
            
            },
            async recovery(id) {
                let res = await postSellGood({id: id})
                this.closeBoxOne()
                if (res && !res.code) {
                    if(this.free===true){
                        this.$message.success('已存入余额')
                    }else{
                        this.$message.success('回收成功')
                    }
                    
                    await this.updateUserInfo()
                } else {
                    this.$message.error(res.msg)
                    await this.updateUserInfo()
                }
            },
            closeBoxMany() {
                this.showTen = false;
                this.$emit("closeOpenBox");
            },
            //免费开箱调接口
            getBoxFreeList() {
                freeBoxDetail().then((res) => {
                    res.data.forEach((value, index) => {
                        if(value.goodsPiture===null){
                            value.goodsPiture = this.img_freeBox_zuanshi;
                        }
                    })
                    const dataFree = res.data;
                    let list = this.render(this.shuaixuanyanse(dataFree))
                    this.arr = list;
                    this.getDayPrize();
                })
            },
            //免费开奖数据
            getDayPrize() {
                openDayPrize().then((res) => {
                    if(res.data.goodsPiture===null){
                        res.data.goodsPiture = this.img_freeBox_zuanshi;
                        this.free = true;
                    }else {
                        this.free = false
                    }
                    const num = res.data
                    this.money = num.money;
                    this.price = num.goodsPrice
                    this.level = "";
                    this.firImg = num.goodsPiture;
                    this.type = num.type;
                    this.luckId = num.userGoodsId
                    this.name = num.user;
                    this.arr.splice(103, 1, num);
                    this.arr = this.shuaixuanyanse(this.arr)
                    this.show = true
                    this.open()
                })
            },
            //开箱数据
            getOpenBox() {
                this.tipsArr = [];
                openBox({
                    id: this.id,
                    openNum: (this.openNum + 1)
                }).then((res) => {
                    this.totalMoney=0;
                    const num = res.data[0];
                    this.tipsArr = res.data;
                    this.tipsArr.forEach((value, index) => {
                        this.totalMoney = this.totalMoney + value.price;
                    })
                    this.money = num.price;
                    this.level = num.level;
                    this.firImg = num.image;
                    this.type = num.type;
                    this.name = num.name;
                    this.luckId = num.userGoodsId
                    this.arr.splice(103,1,num)
                    this.arr = this.shuaixuanyanse(this.arr)
                    this.show = true
                    this.open()
                    this.updateUserInfo();
                })
            },
            //开始开箱
            openStart() {
                this.getOpenBox();
            },
            //开箱逻辑
            open() {
                if (this.Timer) {
                    console.log('正在开箱')
                    return
                }
                this.numberJuli = 0;
                this.blurNumber = 5
                let suijiNumber = Math.floor(Math.random() * 185 + 1)   //生成1-185之间的随机数
                let LastnumberJuli = 19810 + suijiNumber;   //停止的位置
                let sumJuli = 10000    //声明从哪里开始减速
                let num = 150;          //声明一次可以跨越的距离
                let speed = num;
                this.Timer = setInterval(() => {
                    if (this.numberJuli > sumJuli && this.numberJuli < 19810) {   //只有当距离大于10000的适合，才开始慢慢停下来
                        speed = speed * 0.985
                        this.blurColor = 0;
                        this.blurNumber = this.blurNumber * 0.985
                    } else if (this.numberJuli > 19810) {   //最后开始的延迟滑动
                        speed = 1;
                        this.blurNumber = 0
                    }
                    if (this.numberJuli > LastnumberJuli) {      //如果等于0的话，就停止定时器
                        this.openCancel();
                        this.Timer = "";
                        setTimeout(() => {
                            if ((this.openNum + 1) === 1) {
                                this.showPopUp = true;
                            } else {
                                this.showTen = true;
                            }
                        }, 500)
                    }
                    this.numberJuli += speed;
                }, 20)
            },
            //取消定时器
            openCancel() {
                clearInterval(this.Timer)
            },
            //调接口
            getBoxList() {
                boxDetail(this.id).then((res) => {
                    if (res.code === 0) {
                        let data = res.data[0].goodsList;
                        let list = this.render(this.shuaixuanyanse(data))
                        this.arr =list.map((item) => {
                            return item
                        })
                        this.openStart();
                    }
                })
            },
            //筛选颜色的方法
            shuaixuanyanse(data) {
                data.forEach((item, i) => {
                    switch (item.level) {
                        case '普通级':
                            item.borde_color = "#b1c4d8";
                            break;
                        case '受限':
                            item.borde_color = "#8850fb";
                            break;
                        case '保密':
                            item.borde_color = "#d139e3";
                            break;
                        case '军规级':
                            item.borde_color = "#4e6efb";
                            break;
                        case '工业级':
                            item.borde_color = "#6199d7";
                            break;
                        case '消费级':
                            item.borde_color = "#b1c4d8";
                            break;
                        case '违禁':
                            item.borde_color = "#e3ad45";
                            break;
                        case '隐秘':
                            item.borde_color = "#e94d50";
                            break;
                        case '非凡':
                            item.borde_color = "#e94d50";
                            break;
                    }
                })
                return data;
            },
            
            //封装小数组填充大数组的算法=>超复杂
            HpArray(smallArray, bigArray) {
                var bei = 0;
                var wwww = 0;                 //声明一个第二个元素的长度
                for (var i = 0; i < bigArray.length; i++) {
                    if (bei != 0) {
                        bigArray[i] = smallArray[i - wwww * bei];
                        if (i == (smallArray.length) * (bei + 1) - 1) {
                            wwww = smallArray.length;
                            bei++;
                        }
                    } else if (bei == 0) {
                        bigArray[i] = smallArray[i - wwww];
                        if (i == smallArray.length - 1) {
                            wwww = smallArray.length;
                            bei++;
                        }
                    }
                    
                }
                return bigArray
            },
            
            
            //此函数是实现随机数组的方法，打乱数组的排序
            shuffle(arr) {
                for (var i = arr.length - 1; i >= 0; i--) {
                    var randomIndex = Math.floor(Math.random() * (i + 1));
                    var itemAtIndex = arr[randomIndex];
                    arr[randomIndex] = arr[i];
                    arr[i] = itemAtIndex;
                }
                return arr;
            },
            
            
            render(smallArray) {   //render函数
                // $('.slider-wrapper').empty()   //每次重新点击，都会移除滚动元素的所有内容
                var bigArray = Array(127);
                var smallArray = smallArray;  //获取返回的接口内容
                var xunhuanBigArray = this.HpArray(smallArray, bigArray);
                return xunhuanBigArray;
            },
        }
    }
</script>

<style scoped>
    .page {
        width: 1390px;
        height: 355px;
        overflow: hidden;
        /*background-color: #252525;*/
        position: absolute;
        display: flex;
        align-items: center;
        background-color: rgba(37,37, 37, 0.5);
    }
    
    .transverse {
        width: 6px;
        height: 226px;
        background-color: #ffff00;
        box-shadow: 0 0 10px #ffff00;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 30px;
        z-index: 100;
    }
    
    .slideBox {
        align-items: center;
        display: inline-flex;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 50;
        /*background-color: rgba(12,12, 12, 0.5);*/
        
    }
    .slideBox1 {
        align-items: center;
        display: inline-flex;
        position: absolute;
        top: 92%;
        transform: translateY(-50%);
    }
    
    .frame.frame1 {
        width: 191px;
        
        border-width: 8px;
        border-top: none;
        -webkit-filter: blur(10px); /* Chrome, Safari, Opera */
        filter: blur(10px);
    }
    
    .frame {
        width: 195px;
        height: 145px;
        border-width: 4px;
        border-style: solid;
        border-right: none;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .frame.blur {
        -webkit-filter: blur(1px); /* Chrome, Safari, Opera */
        filter: blur(1px);
    }
    
    .button {
        position: absolute;
        left: 50%;
        bottom: 0;
        color: #fff;
        cursor: pointer;
    }
    
    .cancel {
        position: absolute;
        left: 55%;
        bottom: 0;
        color: #fff;
        cursor: pointer;
    }
    
    .img {
        width: 136px;
    }
</style>
