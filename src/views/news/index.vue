<template>
  <div class="welfare">
        <div class="welfareTop">
            <div class="bg">
                <img v-lazy="require('../../assets/welfare/wel3.png')" class="topImg1">
                <img v-lazy="require('../../assets/welfare/wel6.png')" class="topImg2">
            </div>
            <div class="titleDiv">
                <div class="title"  v-for="(item,index) in titleList" :key="index"  @click="newsSelect(index)">
                    <img v-lazy="require('../../assets/home/1.png')" class="left" v-show="titleIndex===item.id"/>
                    <p :class="titleIndex===item.id?'p1':''">{{item.title}}</p>
                    <img v-lazy="require('../../assets/home/1.png')" class="right"  v-show="titleIndex===item.id"/>
                    <img v-lazy="require('../../assets/welfare/wel4.png')" class="bottom"  v-show="titleIndex===item.id"/>
                </div>
            </div>
            <!--全部设置为已读按钮-->
            <div class="setReader" @click="setNewsAllRead">
                <img  v-lazy="require('../../assets/news/news.png')" alt="">
                <p>全部设置为已读</p>
            </div>
        </div>
        <div class="tablediv">
            <gp-table :columns="columns" :data="newslist" class="table">
                <template slot-scope="{ row, index }" slot="abrasion">
                <div v-show="row.readFlag===false" class="dot"></div>
                    <div class="abrasion" @click="setAlreadyRead(row)">
                        
                        <div class="info">{{row.abrasion}}</div>
                    </div>
                </template>
                <template slot-scope="{ row, index }" slot="printing">
                    <div class="printing">{{row.printing}}</div>
                </template>
            </gp-table>
            <div class="paging">
                <gp-pagination 
                    layout="prev, pager, next" 
                    :total="total"
                    @current-change="changePageNum"
                >
                </gp-pagination>
            </div>
        </div>
        <!--消息弹窗-->
        <div>
            <gp-dialog :visible.sync="showDialog" width="360px" @close="closeDialog">
                消息
                <div class="msgInfo">
                    {{newDetail}}
                </div>
            </gp-dialog>
        </div>

    </div>
</template>

<script>
import {getNewsList,setAlreadyRead,setNewsAllRead} from '../../api/part'
export default {
  name: 'welfare',
  components: {
     
  },
  data(){
    return{
        total:0,
        showDialog:false,//弹窗
        newDetail:"",//弹窗消息详情
        titleIndex:0,
        titleList:[
            {
                id:0,
                title:"系统消息",
            },
            {
                id:1,
                title:"取回消息",
            },
            {
                id:2,
                title:"回收消息"
            }
        ],
        typeParams:{
            page:1,
            size:8,
            msgType:0
        },
        columns: [
          { title: '消息详情', slot: 'abrasion' },
          { title: '发送时间', slot: 'printing' },
        ],
        newslist:[
        ],
        
    }
  },
  mounted(){
      this.getNewsList();
  },
  methods:{
      closeDialog(){
          this.showDialog=false;
          this.newDetail = ""
          this.getNewsList();
      },
      //设置全部已读
      setNewsAllRead(){
          setNewsAllRead(this.typeParams.msgType).then((res)=>{
              this.showDialog=true;
              this.newDetail = "消息已全部置为已读！"
          })
      },
      //设置单条消息已读
      setAlreadyRead(row){
          this.showDialog = true;
          this.newDetail = row.abrasion;
          setAlreadyRead(row.msgId).then((res)=>{})
      },
      //分页
      changePageNum(val){
          this.typeParams.page = val;
          this.getNewsList();
      },
      newsSelect(index){
          this.titleIndex = index;
          if(index===0){
            this.typeParams.msgType = 0;
          }else if(index===1){
              this.typeParams.msgType = 1;
          }else{
              this.typeParams.msgType = 2;
          }
          this.getNewsList();
      },
      getNewsList(){
          this.newslist = []
          getNewsList(this.typeParams).then((res)=>{
              this.total = res.total;
            res.data.forEach((value)=>{
                this.newslist.push({
                    abrasion: value.msg,
                    printing: value.createdTime,
                    readFlag: value.readFlag,
                    msgId:value.id
                })
            })
          })
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
    min-height: 500px;
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
                z-index: -1;
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
            //left: 15px;
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
    .tablediv{
        .table{
            /deep/.zbx-table-head th:nth-child(1){
                width:50%;
            }
            /deep/.table-row td{
                height: 50px;
                /deep/.zbx-table-cell{
                    height: 100%;
                }
            }
            .dot{
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: red;
                position: absolute;
                left: 100px;
                background: -webkit-linear-gradient( to bottom, #b6bafc,#a37bfb ); 
                background: -o-linear-gradient( to bottom, #b6bafc,#a37bfb );
                background: -moz-linear-gradient( to bottom, #b6bafc,#a37bfb );
                background: linear-gradient( to bottom, #b6bafc,#a37bfb );
            }
            .info{
                cursor: pointer;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .abrasion{
                width: 100%;
                text-align: left;
                height: 50px;
                line-height: 50px;
                margin-left: 143px;
            }
            /deep/.zbx-table-cell{
                border-bottom: 3px solid rgba(35,35,35,0.5);
            }
        }

    }
    .paging{
        width: 100%;
        height: 40px;
        text-align: center;
    }
    .setReader{
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        font-size: 14px;
        height: 33px;
        justify-content: center;
        align-items: center;
        p{
            border-bottom: 1px solid #fff;
            margin-left: 5px;
            cursor: pointer;
        }
        img{
            width: 20px;
            display: inline-block;
            margin-top: 4px;
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
