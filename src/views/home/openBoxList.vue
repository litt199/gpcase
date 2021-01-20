<template>
  <div class="homeOpenList">
        
        <!--标题-->
        <div class="title">

          <img :src="require('../../assets/home/1.png')" class="left"/>
          <p>{{listContent.groupName}}</p>
          <img :src="require('../../assets/home/1.png')" class="right"/>
        </div>
        <div class="box">
          <div class="box_content"  v-for="(item,index) in listContent.goodsInfo" :key="index" @click="toOpenBox(item.id)">
              <!--顶部价格图标-->
              <!-- <div class="topCost">
                <img :src="require('../../assets/home/box1.png')" alt="">
                <img :src="require('../../assets/home/box5.png')" alt="">
                <p>{{item.price}}</p>
              </div> -->
              <!--箱子-->
              <img :src="item.image" class="bgBox"/>
              <!--抢-->
              <img :src="item.goodsImage" :class="{gun:true,gund:seen&&mainIndex==index}"/>
              <!--射击-->
              <div class="shot " >
                  <img :src="require('../../assets/home/box4.png')" alt="" class="rotate" v-show="(seen&&mainIndex==index)">
              </div>
              
              <div class="openBox" v-show="(seen&&mainIndex==index)">
                <img :src="require('../../assets/home/box3.png')" alt="">
                
                <p>立即开启</p>
              </div>
              <!--"-->
              <div class="perName" v-show="!(seen&&mainIndex==index)">
                <div class="name">{{item.name}}</div>
                <!--底部价格图标-->
                <div class="cost">
                  <!--<img :src="require('../../assets/home/box2.png')" alt="">-->
                  <img :src="require('../../assets/home/box5.png')" alt="">
                  <p>{{item.price}}</p>
                </div>
              </div>
              <div class="enter"  @mouseenter="cursorEnter(index)" @mouseout="cursorOut(index)"></div>
          </div>
       </div>
  </div>
</template>

<script>
export default {
  name: 'homeList',
  components: {
    
  },
  props:{
    
    listContent:{
      type:Object,
      default:{}
    }
  },
  data(){
    return{
      mainIndex:null,
      seen:false,
    }
  },
  mounted(){
  },
  methods:{
    cursorEnter(index){
      this.mainIndex = index;
      this.seen = true;
    },
    cursorOut(){
      this.mainIndex = null;
      this.seen = false
    },
    toOpenBox(id){
      this.$router.push(
        {
          name:'opencase',
          query:{
            id: id
          }
        }
      )
    }
  }
}
</script>
<style lang="less" scoped>
.homeOpenList{
    //padding-left: 20px;
    box-sizing: border-box;
    width: 100%;
    min-width: 800px;
    position: relative;
    padding-bottom: 20px;
    .title{
      display: flex;
      height: 30px;
      line-height: 31px;
      font-size:17px;
     // padding-top: 25px;
      p{
        padding: 0 2px;
      }
      .right{
        position: relative;
        right: 13px;
        top: 0;
      }
    }
    .box{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      font-size: 15px;
      .box_content{
        margin-top: 30px;
        width:328px;
        height: 260px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .enter{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 99;
          cursor: pointer;
        }
        .topCost{
          cursor: pointer;
          position: absolute;
          top: 24px;
          right: 0;
          img:nth-child(1){
            width: 36px;
            height: 26px;
            position: absolute;
            top: 0px;
            right: 0px;
            z-index: 2
          }
          img:nth-child(2){
            width: 11px;
            position: absolute;
            top: 4px;
            right: 20px;
            z-index: 2;
            transform: rotate(29deg);
          }
          p{
            width: 23px;
            height: 26px;
            line-height: 30px;
            position: absolute;
            top: 0px;
            right: 0px;
            z-index: 3;
            transform: rotate(29deg);
            text-align: center;
            text-decoration:line-through
          }
          
        }
        .gun{
          width: 136px;
          position: absolute;
          top: 60px;
          //left: 100px;
            left: 50%;
            transform: translateX(-50%);
        }
        @keyframes rotate1{
          0%{
              transform: translate(-50%,0px);
            }
          25%{
            transform:translate(-50%,10px);
          }
          50%{
              transform: translate(-50%,5px);
            }
          100%{
              transform: translate(-50%,0px);
            }            
        }
        .gund{
            transition: 0.5s;
            animation: rotate1 2s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
        }
        .bgBox{
          width: 250px;
          position: absolute;
          top: 13px;
            left: 50%;
            transform: translateX(-50%);
        }
        .shot{
            
            position: absolute;
            // left: 85px;
            left: 50%;
            transform: translateX(-50%);
            img{
                width: 160px;
                
            }
          }
            @keyframes rotate{
              0%{
                  transform: rotate(0) ;
                }
              50%{
                transform:rotate(180deg) ;
              }
              100%{
                  transform: rotate(360deg) ;
                }
            }
          
          .rotate{
              transition: 0.5s;
              animation: rotate 10s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
          }
        .openBox{
          width:100%;
          height: 30px;
          text-align: center;
          position: absolute;
          bottom: -13px;
          img{
            width: 80px;
          }
          p{
            margin: 0;
            position: absolute;
            bottom: 0;
            text-align: center;
            width: 100%;
            height: 30px;
            line-height: 25px;
          }

          
        }
        .perName{
            display: flex;
            position: absolute;
            bottom: -5px;
          .name{
            height: 20px;
            
            //padding: 0 8px;
              margin-right: 20px;
          }
          .cost{
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            border-top-left-radius:10px;
            border-bottom-right-radius:10px;
            background: linear-gradient(to right, #4880ea, #7f49e8);
            img:nth-child(1){
              height: 10px;
              position: relative;
              left: 8px;
            }
            p{
              height: 14px;
              line-height: 14px;
              text-align: center;
              font-size: 12px;
              padding-left: 10px;
              padding-right: 10px;
              box-sizing: border-box;
            }
          }


        }

      }
    }
}
</style>
