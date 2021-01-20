<template>
    <div class="TenAndFive">
        <p class="gongxi">恭喜获得</p>
        <div class="five">
            <img class="img" src="../../assets/tenAndFive/1.png" alt="">
            <img class="light" src="../../assets/openBox/guang.png" alt="">
            <div class="itemBox" v-for="(item,index) in arr" :key="index">
                <div class="Color" :style="{backgroundImage:getColor(item.level)}">{{item.name}}</div>
                <div class="itmb">
                    <img class="itmbImg" src="../../assets/openBox/hong.png" alt="">
                    <img class="fir" v-lazy="item.image" alt="">
                </div>
                <div class="text">{{item.name}}</div>
                <div class="text">价格：{{item.price}}钻石</div>
            </div>
        </div>

        <!-- 开始按钮 -->
        <div class="button">
            <div class="ons packsnke" @click="Deposited">存入背包</div>
            <div class="ons recyle" @click="recovery">{{totalMoney.toFixed(2)}}钻石回收</div>
        </div>
    </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props:{
      arr:{
          type:Array,
          default:[]
      },
      totalMoney:{
          type:Number,
          default:0
      }
  },
  data() {
    return {
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
                level:'军规级',         
                bg_color:require('../../assets/roll/details_guihong.png'),
                color:'linear-gradient(135deg, #b72dd8 0%, #b72dd8 100%)'
            },
            {   
                level:'工业级',         
                bg_color:require('../../assets/roll/details_guihong.png'),
                color:'linear-gradient(135deg, #b72dd8 0%, #b72dd8 100%)'
            },
            {   
                level:'消费级',         
                bg_color:require('../../assets/roll/details_guihong.png'),
                color:'linear-gradient(135deg, #b72dd8 0%, #b72dd8 100%)'
            },
        ]
    }
  },
  mounted(){
      console.log(this.arr,'this.arr')
  },
  methods:{
      getColor (val) {
          for (const iterator of this.detailsGoodsListLevel) {
              if (iterator.level == val) {
                  return iterator.color;
              }
               
          }
      },
      load(){
          const IMG = {
                zi:require('../../assets/openBox/zi.png'),
                hong:require('../../assets/openBox/hong.png'),
                huang:require('../../assets/openBox/huang.png'),
                lan:require('../../assets/openBox/lan.png'),
                meihong:require('../../assets/openBox/meihong.png'),
          }
      },
        //点击存入背包
    Deposited(){
         this.$emit('FatherDeposited')
     },
      recovery() {
          let idArr = this.arr.map((item) => {
              return item.userGoodsId
          })
          
          this.$emit('recovery', idArr.join(','))
      }
  }
}
</script>

<style scoped lang="less">
    .TenAndFive{
        position:fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 100;
        
    }
    .five{
        width:1400px;
        max-height: 520px;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .img{
        position: absolute;
        left: 0px;
        top: 0px;
        bottom: 0;
        width: 100%;
        height: 100%;
    }
    .light{
        position: absolute;
        z-index: 1;
        width: 560px;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
    }
    .itemBox{
        flex:0 0 20%;
        display: flex;
        align-items: center;
        flex-direction: column;
        position: relative; 
    }
    .itmb{
        margin-top: 10px;
        width: 100%;
        height: 195px;
        display: flex;
        align-items: center;
        position: relative;
        justify-content: center;
    }
    .itmbImg{
        width:50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .text{
        margin-bottom: 5px;
        font-size: 16px;
        text-align: center;
        white-space: nowrap;  /*强制span不换行*/
        display: inline-block;  /*将span当做块级元素对待*/
        width: 100%;  /*限制宽度 可设px*/
        overflow: hidden;  /*超出宽度部分隐藏*/
        text-overflow: ellipsis;  /*超出部分以点号代替*/
    }
    .fir{
        width: 50%;
        position: relative;
    }
    .Color{
        position: absolute;
        top: 15px;
        right: 20px;
        width: 70px;
        height: 20px;
        background: #803bff;
        font-size: 14px;
        text-align: center;
        line-height: 20px;
        border-radius: 30px;
    }
    .ons{
       padding: 0 30px;
        height: 45px;
        border-radius: 50px;
        text-align: center;
        line-height: 45px;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        &.recyle{
         
         }
    }
    .button{
        position: absolute;
        display: flex;
        left: 50%;
        transform: translateX(-50%);
        bottom: -100px;
        z-index: 1;
        justify-content: space-between;
        box-sizing: border-box;
        width:350px;
    }
    .packsnke{
        background-image: linear-gradient(to right, #4f82f5, #8250f3);
        box-shadow:inset 0px 15px 10px -15px #a487f7;
    }
    .recyle{
        background-image: linear-gradient(to bottom, #941aed, #680fdc);
        box-shadow:inset 0px 15px 10px -15px #a487f7;
    }
    .gongxi{
        font-size: 30px;
        margin: 10px auto;
        color: #fff;
        text-shadow: 0 0 5px #4d2f9a;
        width: 300px;
        text-align: center;
    }
</style>
