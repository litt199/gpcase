<template>
  <div class="welfare">
        <div class="tablediv">
            <gp-table :columns="columns" :data="newslist" class="table">
                <template slot-scope="{ row, index }" slot="endTime">
                    <div class="info">{{row.endTime}}</div>
                </template>
                <template slot-scope="{ row, index }" slot="activityName">
                    <div class="printing">{{row.activityName}}</div>
                </template>
                <template slot-scope="{ row, index }" slot="nickName">
                    <div class="printing">{{row.nickName}}</div>
                </template>
                <template slot-scope="{ row, index }" slot="winNum">
                    <div class="printing">{{row.winNum}}</div>
                </template>
                <template slot-scope="{ row, index }" slot="winUserNum">
                    <div class="printing">{{row.winUserNum}}</div>
                </template>
            </gp-table>
            <div class="paging">
                <gp-pagination 
                    layout="prev, pager, next" 
                    :total="total"
                    @current-change="changePageNum"
                    @prev-click="prevClick"
                    @next-click="nextClick"	
                >
                </gp-pagination>
            </div>
        </div>
        
        
    </div>
</template>

<script>
import {getSudokuFinished} from '../../api/sudoku'
export default {
  name: 'finished',
  components: {
     
  },
  data(){
    return{
        newslist:[],
        columns: [
          { title: '时间', slot: 'endTime' },
          { title: '活动名称', slot: 'activityName' },
          { title: '中奖玩家', slot: 'nickName' },
          { title: '中奖号码', slot: 'winNum' },
          { title: '他的号码', slot: 'winUserNum' }
        ],
        page: 1,
        size: 10,
        total: 0
    }
  },
  methods:{
      //分页
      changePageNum(val){
        this.page = val;
        this.getSudokuFinishedLsit();
      },
      prevClick(val) {
        this.page = val;
        this.getSudokuFinishedLsit();
      },
      nextClick(val) {
        this.page = val;
        this.getSudokuFinishedLsit();
      },
       welfareSelect(index){
          this.titleIndex = index;
          if(index===0){
            this.list = this.contentlist;
          }else if(index===1){
              this.list = this.contentlist1;
          }else{
              this.list = this.contentlist2;
          }

      },
      getSudokuFinishedLsit() {
          let typeParams = {
            page: this.page,
            size: this.size
        }
        getSudokuFinished(typeParams).then((res)=>{
            if (res.data) {
                this.total = res.total;
                this.newslist = res.data;
                console.log(this.newslist, 'this.newslist');
            }
        })
      }
  },
  mounted(){
      this.list = this.contentlist;
      this.getSudokuFinishedLsit();
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
    .tablediv{
        position: relative;
        margin-top: 10px;
        .table{
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
                position: relative;
                top: 14px;
                left: 14px;
                background: -webkit-linear-gradient( to bottom, #b6bafc,#a37bfb ); 
                background: -o-linear-gradient( to bottom, #b6bafc,#a37bfb );
                background: -moz-linear-gradient( to bottom, #b6bafc,#a37bfb );
                background: linear-gradient( to bottom, #b6bafc,#a37bfb );
            }
            .abrasion{
                width: 100%;
                text-align: center;
                height: 50px;
            }
        }
    }
    .paging{
        margin-top: 20px;
     
        width: 100%;
        height: 40px;
        text-align: center;
    }

    
}
</style>
