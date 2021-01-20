<template>
    <div id="detailsCard" :style="{backgroundImage:'url('+getBgImg(level)+')'}">
        <div class="detailsCard_btn">
            <gp-btn  :width="70" :height="16" :bg="getImg(level)" style="margin-right:5px;">{{durable}}</gp-btn>
        </div>
        <div class="detailsCard_img">
            <img :src="picture" />
        </div>
        <div class="detail-wrap">
            <div class="detailsCard_title" style="font-size:17px;">{{name}}</div>
            <div class="detailsCard_title"  style="font-size:14px;" v-show="!point">价格:{{price}}钻石</div>
            <div class="detailsCard_title"  style="font-size:14px;" v-show="point">价格:{{price}}钻石/{{point}}积分</div>
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'detailsCard',
    props:{
        picture:{
            type:String,
            default: () => ''
        },
        durable:{
            type:String,
            default:()=> ' '
        },
        name:{
            type:String,
            default:" "
        },
        price:{
            type:Number,
            default: 0           
        },
        level:{
            type:String,
            default: ""             
        },
        point:{
            type:Number,
            default:0
        }
    },
    data(){
        return{
            img_details_qiang:require('../../assets/roll/details_qiang.png'),
            detailsGoodsListLevel: [
                {       
                    level:'受限',     
                    bg_color:require('../../assets/roll/details_zise.png'),
                    color:'linear-gradient(135deg, #9144f0 0%, #9144f0 100%)'
                },
                {   
                    level:'普通级',           
                    bg_color:require('../../assets/roll/details_blue.png'),
                    color:'linear-gradient(135deg, #0a7ed3 0%, #0a7ed3 100%)'
                },
                {   
                    level:'违禁',          
                    bg_color:('../../assets/roll/details_yellow.png'),
                    color:'linear-gradient(135deg, #e2b707 0%, #e2b707 100%)'
                },
                {   
                    level:'非凡',          
                    bg_color:require('../../assets/roll/details_red.png'),
                    color:'linear-gradient(135deg, #f85959 0%, #f85959 100%)'
                },
                {   
                    level:'隐秘',         
                    bg_color:require('../../assets/roll/details_guihong.png'),
                    color:'linear-gradient(135deg, #b72dd8 0%, #b72dd8 100%)'
                },
                {   
                    level:'保密',         
                    bg_color:require('../../assets/roll/details_guihong.png'),
                    color:'linear-gradient(135deg, #b72dd8 0%, #b72dd8 100%)'
                },
                {   
                    level:'工业级',         
                    bg_color:require('../../assets/roll/details_guihong.png'),
                    color:'linear-gradient(135deg, #b72dd8 0%, #b72dd8 100%)'
                },
                {   
                    level:'军规级',         
                    bg_color:require('../../assets/roll/details_guihong.png'),
                    color:'linear-gradient(135deg, #b72dd8 0%, #b72dd8 100%)'
                },
                {   
                    level:'消费级',         
                    bg_color:require('../../assets/roll/details_guihong.png'),
                    color:'linear-gradient(135deg, #b72dd8 0%, #b72dd8 100%)'
                }
            ]
        }
    },
    
    methods:{
        getBgImg(val) {
            for (const item of this.detailsGoodsListLevel) {
                if (item.level == val) {
                    return item.bg_color;
                }
            }
            return ''
        },
        getImg(val) {
            for (const item of this.detailsGoodsListLevel) {
                if (item.level == val) {
                    return item.color;
                }
            }
            return ''
        },
    },
    mounted(){
    }
}
</script>
<style lang="less" scoped>
#detailsCard{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    background-size: cover;
    position: relative;
    .detailsCard_btn{
        display: flex;
        justify-content: flex-end;
        margin: 5px 0 0 0;
        .ob-btn{
            margin-right: 5px;
        }
    }
    .detailsCard_img{
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            height: 80%;
            width: 80%;
        }
    }
    .detail-wrap{
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 100%;
    }
    .detailsCard_title{
        color: white;
        text-align: center;
        white-space: nowrap;  /*强制span不换行*/
        width: 100%;  /*限制宽度 可设px*/
        overflow: hidden;  /*超出宽度部分隐藏*/
        text-overflow: ellipsis;  /*超出部分以点号代替*/
        padding: 0 20px;
        margin-bottom: 10px;
        box-sizing: border-box;
    }
}
</style>