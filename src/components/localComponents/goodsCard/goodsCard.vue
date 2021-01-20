<template>
   
    <div  @click="change" >
        <bg :level="data.level" class="goodsCard">
            <div class="img-wrap">
                <img v-lazy="data.image" alt="">
            </div>
            <div class="goods-info">
                <p class="name" :title="data.name+'('+data.title+')'">{{data.name+'('+data.title+')'}}</p>
                <p class="price">回收价格： <span>{{data.price}}钻石</span></p>
            </div>
            <div class="check" v-if="checkable">
                <gp-icon v-show="check" type="iconduihao" :size="25" color="#fff"></gp-icon>
            </div>
        </bg>
        
    </div>
</template>
<script>
    import bg from './goods_bg'
    export default {
        data() {
            return {
                check: this.isCheck
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
            isCheck: {
                type: Boolean,
                default: false
            },
            checkable: {
                type: Boolean,
                default: false
            },
        },
        watch: {
            isCheck(val) {
                this.check = val
                console.log(this.check);
            },
            check(val){
                this.$emit('change', {id:this.data.id, value: val})
            }
        },
       
        methods: {
            change() {
                if (!this.checkable) return
                this.check = !this.check
            }
        }
    }
</script>
<style lang="less" scoped>
    .goodsCard {
        width: 230px;
        height: 230px;
        border-radius: 10px;
        margin-right: 50px;
        margin-bottom: 50px;
        position: relative;
        overflow: hidden;
        /*&.level1{
            background: url('../../../assets/freeBox/ym.png') no-repeat 100%;
        }
        &.level2{
            background: url('../../../assets/freeBox/gy.png') no-repeat 100%;
        }
        &.level3{
            background: url('../../../assets/freeBox/jg.png') no-repeat 100%;
        }
        &.level4{
            background: url('../../../assets/freeBox/bm.png') no-repeat 100%;
        }
        &.level5{
            background: url('../../../assets/freeBox/ff.png') no-repeat 100%;
        }*/
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
        
        .check {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 21px;
            height: 21px;
            background: rgba(0, 0, 0, .7);
            border-radius: 50%;
            
            i {
                position: absolute;
                top: -6px;
                right: -4px;
            }
        }
    }
</style>