<template>
  <div class='popup'>
        <div class="title">恭喜获得</div>
        <div class="type" v-show="!free && type">{{type}}|{{name}}</div>
        <div class="type" v-show="!free && !type">{{name}}</div>
        <div class="price">价格：{{price || money}}钻石</div>
        <div class="mesImg">
            <div style="width:320px;height:326px;border:2px solid #6ad8ff;    border-radius: 18px;">
                <img class="bgImg" src="../../assets/openBox/tips_bg.png" alt="">
            </div>            
            <img class="firImg"  v-show="!free" :src="firImg" alt="">
            <img class="firImgZ" :src="firImg" alt="">
        </div>


         <div class="button">
            <div class="ons packsnke" @click="Deposited" v-show="!free">存入背包</div>
            <div class="ons recyle" @click="recovery">{{money}}{{free ? '钻石存入余额' : '钻石回收'}}</div>
        </div>
   
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props:{
      firImg:{
          type:String,
          default:require('../../assets/openBox/2.png')
      },
     level:{
         type:String,
         default:'1234'
     },
     type:{
         type:String,
         default:''
     },
     name:{
         type:String,
         default:'1234'
     },
     money:{
         type:Number,
         default:0,
     },     
     free:{
         type:Boolean,
         default:false
     },
      price: {
          type:Number,
          default:0,
      }
  },
  
  data() {
    return {
        img:'',
    }
  },
    mounted(){
        this.load()
    },
  methods:{
     load(){
         console.log(this.level)
            const IMG={
                zi:require('../../assets/openBox/zi.png'),
                hong:require('../../assets/openBox/hong.png'),
                huang:require('../../assets/openBox/huang.png'),
                lan:require('../../assets/openBox/lan.png'),
                meihong:require('../../assets/openBox/meihong.png'),
            }
            switch(this.level){
                        case '普通级':
                        this.img = IMG.zi;
                        break;
                        case '受限':
                       this.img =  IMG.zi;
                        break;
                        case '保密':
                        this.img=  IMG.zi;
                        break;
                        case '军规级':
                        this.img =  IMG.zi;
                        break;
                        case '工业级':
                        this.img=  IMG.zi;
                        break;
                        case '消费级':
                        this.img=  IMG.zi;
                        break;
                        case '违禁':
                        this.img=  IMG.zi;
                        break;
                        case '隐秘':
                        this.img =  IMG.zi;
                        break;
                        case '非凡':
                        this.img=  IMG.zi;
                        break;
                    
            }
       
        console.log(this.img)
     },
     //点击存入背包
    Deposited(){
         this.$emit('FatherDeposited')
     },
      recovery() {
        // this.free = false;
        this.$emit('recovery')
      }
  }
}
</script>

<style scoped>
.popup{
    width:693px;
    height: 530px;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 111;
    transform: translate(-50%,-50%);
    overflow: hidden;
}
.popup .title{
    position: absolute;
    top: 122px;
    width: 100%;
    text-align: center;
    font-size: 30px;
    z-index: 2;

}
.popup .price{
    position: absolute;
    bottom: 121px;
    width: 100%;
    text-align: center;
    font-size: 16px;
    z-index: 2;
}
.popup .type{
    position: absolute;
    bottom: 150px;
    width: 100%;
    text-align: center;
    font-size: 21px;
    z-index: 2;
    padding: 0 205px;
    box-sizing: border-box;
    white-space: nowrap;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.topX{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width:693px;
    height: 402px;
}

.imglight{
    width: 100%;
    position: absolute;
    left: 0;
    top: 3px;
}
.button{
    position: absolute;
    display: flex;
    left: 0;
    bottom: 20px;
    z-index: 1;
    justify-content: center;
    padding: 0 110px;
    box-sizing: border-box;
    width: 100%;
}
.ons{
    width: 200px;
    height: 45px;
    border-radius: 50px;
    text-align: center;
    line-height: 45px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
}
.packsnke{
    background-image: linear-gradient(to right, #4f82f5, #8250f3);
    box-shadow:inset 0px 15px 10px -15px #a487f7;
    margin-right: 10px;
}
.recyle{
    background-image: linear-gradient(to bottom, #941aed, #680fdc);
    box-shadow:inset 0px 15px 10px -15px #a487f7;
    margin-left: 10px;
}
.mesImg{
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
}
.bgImg{
    width: 320px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}

.firImg{
    width: 195px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.firImgZ{
    width: 130px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
</style>
