<template>
    <div class="welfareContent">
        <img v-lazy="require('../../assets/welfare/wel2.png')" alt="" class="bg">
        <div class="brokenLine">
            <img v-lazy="require('../../assets/welfare/1.png')" alt="" class="brokenLineBG">
            <div class="taskTips">
                <div v-for="(item,index) in contentList" :key="index" class="taskTip" :style="'margin-top:'+-(index*35)+'px'">
                    <p class="title" >任务{{index+1}}</p>
                    <p>{{item.taskName}}</p>
                    <!--<p>赠送{{item.taskName}}</p>-->
                </div>
            </div>
            <div class="taskBtns" >
                <div v-for="(item,index) in contentList" :key="index" class="taskbtn">
                    <img v-lazy="item.prizeImg" v-if="item.prizeImg"  alt="" style="width:110px;">
                    <p class="p" v-show="item.getStatus==='1'">已领取</p>
                    <p class="p1" v-show="item.getStatus==='0'"  @click="receiveWelfare(item.id)">立即领取</p>
                    <p class="p2"  v-show="item.getStatus==='2'" @click="haddone(item.boxId,index)">去完成</p>
                </div>
            </div>
        </div>
        <!--消息弹窗-->
        <div>
            <gp-dialog :visible.sync="showDialog" width="360px" @close="closeDialog">
                消息
                <div class="msgInfo">
                    领取成功！
                </div>
            </gp-dialog>
        </div>

    </div>
</template>

<script>
import {getWelfare} from '../../api/part'
export default {
  name: 'welfareContent',
  components: {
  },
  props:{
      contentList:{
          type:Array,
          dafault:[]
      },
      typeItem:{
          type:Number,
          default:0
      }
  },
  mounted(){
  },
  data(){
    return{
        showDialog:false,
    }
  },
  methods:{
      //关闭弹窗
      closeDialog(){
          this.showDialog=false;
      },
      //领取福利
      receiveWelfare(id){
          getWelfare(id).then((res)=>{
              this.showDialog=true;
              this.$emit("getListInfo");
          })
      },
      //去完成任务
      haddone(id,index){
          if(this.typeItem===2){
            this.$router.push({name:'opencase',query:{id: id}})//跳转开箱
          }else if(this.typeItem===1){
              this.$router.push('/recharge');
          }else if(this.typeItem===0){
              if(index===0){this.$router.push('/recharge');}
              if(index===1){this.$router.push({name:'opencase',query:{id: id}})}
          }
      }
  }
}
</script>
<style lang="less" scoped>
    .welfareContent{
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
       .bg{
           width: 100%;
           height: 700px;
           position:absolute;
       }
       .brokenLine{
           display: flex;
           justify-content: center;
           align-items: center;
           width: 1600px;
           height: 700px;
           position: relative;
           .brokenLineBG{
               width: 1600px;
           }
           .taskTips{
               font-size: 12px;
               width: 1360px;
               position: absolute;
               left: 115px;
                top: 318px;
               display: flex;
                justify-content: space-between;
               .taskTip{
                  width: 120px;
                    height: 60px;
                   display: flex;
                   justify-content: center;
                   align-items: center;
                   flex-direction: column;
                   background: -webkit-linear-gradient( to bottom, rgba(106, 81, 197, 0.5) , rgba(106, 81, 197, 0) ); 
                   background: -o-linear-gradient( to bottom, rgba(106, 81, 197,  0.5) ,rgba(106, 81, 197, 0) ); 
                   background: -moz-linear-gradient( to bottom, rgba(106, 81, 197,  0.5) , rgba(106, 81, 197, 0) ); 
                   background: linear-gradient( to bottom, rgba(106, 81, 197,  0.5) , rgba(106, 81, 197, 0) );
                   border-radius: 15px;
               }

           }
           .taskBtns{
               font-size: 14px;
               width: 1360px;
               position: absolute;
               left: 115px;
               bottom: 40px;
               display: flex;
                justify-content: space-between;
                .taskbtn{
                    width: 110px;
                    height: 104px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;
                }
               .p{
                    width: 110px;
                    height: 29px;
                    border-radius: 19px;
                   background: #7c7c7c;
                   text-align: center;
                   line-height: 28px;
                   cursor: pointer;
                   transition: all .2s;
                   &:hover{
                      box-shadow: 0 0 5px -1px #7c7c7c;
                   }
               }
               .p1{
                   cursor: pointer;
                    width: 110px;
                    height: 29px;
                    border-radius: 19px;
                   background: -webkit-linear-gradient( to right, #650fdc , #961bee); 
                   background: -o-linear-gradient( to right, #650fdc , #961bee);  
                   background: -moz-linear-gradient( to right, #650fdc , #961bee); 
                   background: linear-gradient( to right, #650fdc , #961bee); 
                   text-align: center;
                   line-height: 28px;
                   transition: all .2s;
                   &:hover{
                      box-shadow: 0 0 5px -1px #961bee;
                   }
               }
               .p2{
                   cursor: pointer;
                    width: 110px;
                    height: 29px;
                    border-radius: 19px;
                   background: -webkit-linear-gradient( to right, #34c1ff , #4f5dff); 
                   background: -o-linear-gradient( to right, #34c1ff , #4f5dff);  
                   background: -moz-linear-gradient( to right, #34c1ff , #4f5dff); 
                   background: linear-gradient( to right, #34c1ff , #4f5dff); 
                   text-align: center;
                   line-height: 28px;
                   transition: all .2s;
                   &:hover{
                      box-shadow: 0 0 5px -1px #4f5dff;
                   }
               }
           }
       }
        /deep/.el-dialog{
            .msgInfo{
                padding: 20px 30px 30px 10px;
                box-sizing: border-box;
            }
        }
        /deep/.el-dialog__body{
            padding: 10px 0px 0px 20px;
        }

    }
</style>
