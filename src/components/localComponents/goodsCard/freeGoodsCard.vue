<template>
    <div>
        <bg :level="data.level || '隐秘'" class="goodsCard" v-if="!data.money">
            <div class="img-wrap">
                <img v-lazy="data.goodsPiture" alt="">
            </div>
            <div class="goods-info">
                <p class="name" :title=" data.goodsName+'('+data.goodstitle+')'">{{data.goodsName+'('+data.goodstitle+')'}}</p>
                <p class="price">爆率： <span>{{data.proprite}}%</span></p>
            </div>
            <div class="model">
                <div class="row1">
                    <p>{{data.proprite}}%</p>
                    <p>爆率</p>
                </div>
                <div class="row2">
                    <p class="color-text">{{data.goodsPrice}}钻石</p>
                    <p>饰品价格</p>
                </div>
                
            </div>
        </bg>
        <div v-else class="goodsCard money">
            <div class="img-wrap">
                <img :src="img_freeBox_zuanshi" alt="">
            </div>
            <div class="goods-info">
                <p class="name" >余额增加：{{data.money}}钻石</p>
                <p class="price">爆率： <span style="color: #fff">{{data.proprite}}%</span></p>
            </div>
        </div>
    </div>
   
</template>
<script>
    import bg from './goods_bg'
    
    export default {
        data() {
            return {
                img_freeBox_zuanshi:require('../../../assets/freeBox/freeBox_zuanshi.png'),
            }
        },
        components: {
            bg
        },
        props: {
            data: {
                type: Object,
                default: () => {
                }
            },
            
        }
    }
</script>
<style lang="less" scoped>
    .goodsCard {
        width: 288px;
        height: 288px;
        border-radius: 20px;
        margin-right: 50px;
        margin-bottom: 55px;
        position: relative;
        overflow: hidden;
        .img-wrap {
        
            box-sizing: border-box;
            padding: 20px;
            width: 100%;
            overflow: hidden;
            text-align: center;
        
            img {
                width: 100%;
                height: 100%;
            
            }
        }
        &:hover{
            .model{
                opacity: 1;
            }
        }
        .model{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(48,48,49,.7);
            opacity: 0;
            transition: all .3s;
            p{
                text-align: center;
                font-size: 20px;
                font-weight: bold;
            }
            .row1{
                margin-top: 50px;
            }
            .row2{
                margin-top: 50px;
                .color-text{
                    background: linear-gradient(to bottom, #aa96df, #bf8ffc);
                    -webkit-background-clip: text;
                    color: transparent;
                }
            }
        }
        .goods-info {
            position: absolute;
            bottom: 10px;
            left: 0;
            right: 0;
            
            p {
                text-align: center;
                padding: 0 10px;
                margin-bottom: 5px;
            }
        
            .name {
                font-size: 17px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space:nowrap;
            }
        
            .price {
                font-size: 14px;
            
                span {
                    color: #23282a;
                }
            }
        }
        
       
       
    }
    .money{
        background: #303031;
        position: relative;
        .img-wrap{
            img{
                margin-top: 30px;
                width: 60%;
            }
        }
        .goods-info{
            font-weight: bold;
            
            position: absolute;
            bottom: 10px;
        }
    }
</style>