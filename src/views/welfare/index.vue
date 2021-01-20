<template>
  <div class="welfare">
    <div class="welfareTop">
        <div class="bg">    
            <img v-lazy="require('../../assets/welfare/wel3.png')" class="topImg1">
            <img  v-lazy="require('../../assets/welfare/wel6.png')" class="topImg2">
        </div>
        <div class="titleDiv">
            <div class="title"  v-for="(item,index) in titleList" :key="index"  @click="welfareSelect(index)">
                <img v-lazy="require('../../assets/home/1.png')" class="left" v-show="titleIndex===index"/>
                <p :class="titleIndex===item.id?'p1':''">{{item.title}}</p>
                <img v-lazy="require('../../assets/home/1.png')" class="right"  v-show="titleIndex===index"/>
                <img v-lazy="require('../../assets/welfare/wel4.png')" class="bottom"  v-show="titleIndex===index"/>
            </div>
        </div>
        
    </div>
    <welfareContent :contentList="list" @getListInfo = "getAllList" :typeItem="titleIndex"/>
  </div>
</template>

<script>
import {newPeopleWelfare,investWelfare,openBoxWelfare} from '../../api/part'
import welfareContent from '../welfare/welfareContent'
export default {
  name: 'welfare',
  components: {
      welfareContent
  },
  data(){
    return{
        titleIndex:0,//福利种类
        titleList:[
            {
                id:0,
                title:"新人福利",
            },
            {
                id:1,
                title:"充值福利",
            },
            {
                id:2,
                title:"开箱福利"
            }
        ],
        list:[],
        type:0,
    }
  },
  mounted(){
      this.list = this.contentlist
      this.getPeopleWelfare();
  },
  methods:{
      //传递给子组件后子组件领取后领取信息
      getAllList(){
          if(this.titleIndex===0){
              this.getPeopleWelfare();
          }else if(this.titleIndex===1){
              this.getInvestWelfare();
          }else{
              this.getOpenBoxWelfare();
          }
      },
      //新人福利
      getPeopleWelfare(){
          newPeopleWelfare().then((res)=>{
              this.list = res.data;
          })
      },
      //充值福利
      getInvestWelfare(){
           investWelfare().then((res)=>{
              this.list = res.data;
          })
      },
      //开箱福利
      getOpenBoxWelfare(){
          openBoxWelfare().then((res)=>{
            this.list = res.data;
          })
      },
      welfareSelect(index){
          this.titleIndex = index;
          if(index===0){
            this.getPeopleWelfare();
          }else if(index===1){
              this.getInvestWelfare();
          }else{
              this.getOpenBoxWelfare();
          }

      }

  }
}
</script>
<style lang="less" scoped>
.welfare{
    min-width: 800px;
    margin: 15px 0px 0px 0px;
    color: #fff;
    position: relative;
    //padding: 0 17px;
    box-sizing: border-box;
    .welfareTop{
        position: relative;
        height: 40px;
        .bg{
            width: 100%;
            height: 40px;
            position: absolute;
            overflow: hidden;
            border-radius: 12px;
            .topImg1{
                width: 108%;
                height: 100%;
                position: absolute;
                left: -10px;
            }
            .topImg2{
                width: 100%;
                position: absolute;
                bottom: 5px;
                left: 0;
                padding: 0 20px;
                box-sizing: border-box;
            }
        }
        .titleDiv{
            display: flex;
            width: 420px;
            position: absolute;
            top: 6px;
            left: 15px;
                        .title{
                width: 110px;
                height: 30px;
                line-height: 31px;
                font-size:17px;
                position: relative;
                p{
                    width: 100%;
                    height: 100%;
                    line-height: 23px;
                    padding: 0 21px;
                    box-sizing: border-box;
                    cursor: pointer;
                }
                .p1{
                    color:#bbacf1;
                }
                .left{
                    position: absolute;
                    left: -10px;
                    top: -3px;
                }
                .right{
                    position: absolute;
                    top: -3px;
                    right: 0px;
                }
                .bottom{
                    width: 98px;
                    height: 2px;
                    position: absolute;
                    bottom: 2px;
                    left: 6px;
                }
            }

        }

    }
    .welfareContent{
        width: 100%;
        margin-top: 17px;
        // background: url("");
    }
    
}
</style>
