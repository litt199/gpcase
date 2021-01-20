<template>
    <div class="homeOpen">
        <img :src="require('../../assets/home/123.png')" alt="" class="img1">
        <div class="img2">
            <img :src="require('../../assets/home/234.png')" alt="">
            <img :src="require('../../assets/home/234.png')" alt="">
        </div>
        <div class="container">
            <div v-for="(item,index) in boxListArr" class="item" :key="index">
                <homeList :listContent="item"/>
            </div>
        </div>
        
    
    
    </div>
</template>

<script>
    import {getTreasureBox, openBoxList} from '../../api/part'
    import homeList from './openBoxList'
    
    export default {
        name: 'Home',
        components: {
            homeList
        },
        data() {
            return {
                boxListArr: [
                    /*{
                        groupName: "热门宝箱",
                        goodsInfo: [
                            {
                                bgImage: null,
                                goodsImage: "https://yizu-zbx.oss-cn-shanghai.aliyuncs.com/res/image/2020/9/41de6affa5fe4a7cb311a4e9223bb319.png",
                                hoverColor: null,
                                id: "1dcfc09a92b3417eac2adcba7391f25c",
                                image: require("../../assets/home/6.png"),
                                name: "绝地求死",
                                price: 99,
                            },
                            {
                                bgImage: null,
                                goodsImage: "https://yizu-zbx.oss-cn-shanghai.aliyuncs.com/res/image/2020/9/41de6affa5fe4a7cb311a4e9223bb319.png",
                                hoverColor: null,
                                id: "1dcfc09a92b3417eac2adcba7391f25c",
                                image: require("../../assets/home/5.png"),
                                name: "绝地求死",
                                price: 99,
                            },
                            {
                                bgImage: null,
                                goodsImage: "https://yizu-zbx.oss-cn-shanghai.aliyuncs.com/res/image/2020/9/41de6affa5fe4a7cb311a4e9223bb319.png",
                                hoverColor: null,
                                id: "1dcfc09a92b3417eac2adcba7391f25c",
                                image: require("../../assets/home/4.png"),
                                name: "绝地求死",
                                price: 99,
                            },
                            {
                                bgImage: null,
                                goodsImage: "https://yizu-zbx.oss-cn-shanghai.aliyuncs.com/res/image/2020/9/41de6affa5fe4a7cb311a4e9223bb319.png",
                                hoverColor: null,
                                id: "1dcfc09a92b3417eac2adcba7391f25c",
                                image: require("../../assets/home/2.png"),
                                name: "绝地求死",
                                price: 99,
                            },
                            {
                                bgImage: null,
                                goodsImage: "https://yizu-zbx.oss-cn-shanghai.aliyuncs.com/res/image/2020/9/41de6affa5fe4a7cb311a4e9223bb319.png",
                                hoverColor: null,
                                id: "1dcfc09a92b3417eac2adcba7391f25c",
                                image: require("../../assets/home/3.png"),
                                name: "绝地求死",
                                price: 99,
                            }
                        ]
                    }*/
                ]
                
            }
        },
        mounted() {
            this.getTreasureBox()
            this.getOpenBoxList();
            /*判断是否有推广链接*/
            //判断是否有推广来的数据，有的话，就储存到本地
            if(this.$route.params.id){
                this.decideQuery(this.$route.params.id);
                
                this.$router.push('/')
            }
        },
        methods: {
            //获取首页宝箱
            getTreasureBox() {
                getTreasureBox().then((res) => {
                    // console.log(res)
                    // this.boxListArr[0].goodsInfo = res.data
                })
            },
            //获取箱子详情
            getOpenBoxList() {
                openBoxList().then((res) => {
                    res.data.forEach((value, index) => {
                        this.boxListArr.push(value);
                    })
                })
            },
            //判断是否有推广来的数据，有的话，就储存到本地
            decideQuery(query) {
                if (query == null) {
                    return
                } else {
                    localStorage.setItem('decide', query)
                }
            },
            
        },
        
        
    }
</script>
<style lang="less" scoped>
    .homeOpen {
        min-width: 800px;
        margin: 24px 0px 0px 0px;
        color: #fff;
        position: relative;
        //background: #242424 url("../../assets/home/bg.png") no-repeat;
        background-size: 100%;
        
        .img1 {
            width: 100%;
            //padding: 0px 17px;
            box-sizing: border-box;
            z-index: 1;
        }
        
        .img2 {
            box-sizing: border-box;
            z-index: 1;
            display: flex;
            justify-content: space-between;
            margin-top: 24px;
            img {
                width: calc(50% - 32px);
                
                box-sizing: border-box;
            }
        }
    }
    .container{
        margin-top: 32px;
        background: #242424 url("../../assets/home/bg.png") no-repeat;
        .item{
            margin-top: 80px;
            &:first-child{
                margin-top: 0;
            }
        }
    }
</style>
