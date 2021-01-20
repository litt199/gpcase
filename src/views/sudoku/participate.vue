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
                <template slot-scope="{ row, index }" slot="winNum">
                    <div class="printing">{{row.winNum}}</div>
                </template>
                <template slot-scope="{ row, index }" slot="myNum">
                    <div class="printing">{{row.myNum}}</div>
                </template>
                <template slot-scope="{ row, index }" slot="pictures">
                    <div class="myPrize">
                        <div class="img_left" v-show="row.pictures && row.pictures.length > 2" @click="imgClick(-1,row,index)">
                            <img :src="img_sudoku_left" />
                        </div>
                        <div class="card_one" v-show="!btnShow && row.pictures && row.pictures.length > 0">
                            <img v-lazy="row.pictures.slice(currentIndex[index],currentIndex[index] + 1)[0]" />
                        </div>
                        <div class="card_one" v-show="row.pictures && row.pictures.length > 1">
                            <img v-lazy="row.pictures.slice(currentIndex[index] + 1,currentIndex[index] + 2)[0]" />
                        </div>
                        <div class="card_one" v-show="row.pictures && row.pictures.length > 2">
                            <img v-lazy="row.pictures.slice(currentIndex[index] + 2,currentIndex[index] + 3)[0]" />
                        </div>
                        <div class="img_right" v-show="row.pictures && row.pictures.length > 2" @click="imgClick(1,row,index)">
                            <img :src="img_sudoku_right" />
                        </div>
                    </div>
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
import {getSudokuJoin} from '../../api/sudoku'
export default {
  name: 'finished',
  components: {
     
  },
  data(){
    return{
        currentIndex: [0,0,0,0,0,0,0,0],
        btnShow: false,
        img_sudoku_left: require('../../assets/img/sudoku_left.png'),
        img_sudoku_right: require('../../assets/img/sudoku_right.png'),
        newslist:[],
        total: 0,
        page: 1,
        size: 10,
        columns: [
          { title: '时间', slot: 'endTime' },
          { title: '活动名称', slot: 'activityName' },
          { title: '中奖号码', slot: 'winNum' },
          { title: '我的号码', slot: 'myNum' },
          { title: '我的奖品', slot: 'pictures' }
        ],
        
    }
  },
  methods:{
      imgClick (val,row,index) {
          let current = this.currentIndex[index] + val;
          if (current > -1 && current < row.pictures.length - 2) {
            this.$set(this.currentIndex,index,current);           
          }
      },
      //分页
      changePageNum(val){
          this.page = val;
          this.getSudokuJoinList();
      },
      prevClick(val){
          this.page = val;
          this.getSudokuJoinList();
      },
      nextClick(val){
          this.page = val;
          this.getSudokuJoinList();
      },
      getSudokuJoinList(){
          let  typeParams = {
                page:this.page,
                size:this.size
            }
        getSudokuJoin(typeParams).then((res)=>{
            this.total = res.total;
            if (res.data) {
                this.newslist = res.data;
                console.log(this.newslist,'this.newslist');
                for (const iterator of this.newslist) {
                    if(iterator.pictures)
                    iterator.pictures =  iterator.pictures.split(',');
                }
            }
        })
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

      }
  },
  mounted(){
    this.list = this.contentlist;
    this.getSudokuJoinList();         
  }
}
</script>
<style lang="less" scoped>
.welfare{
    min-width: 800px;
    margin: 15px 0px 0px 0px;
    color: #fff;
    position: relative;
   // padding: 0 17px;
    box-sizing: border-box;
    .tablediv{
        position: relative;
        margin-top: 10px;
        min-height: 500px;
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
        .myPrize{
            width: 130px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            .img_left{
              margin-right: 10px;
              cursor: pointer;
            }
            .card_one{
              width: 30px;
              height: 30px;
              border-radius: 6px;
              flex-shrink: 0;
              margin-right: 5px;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #212121;
              img{
                  width: 30px;
                  height: 30px;
              }
            }
            .card_two{
              width: 30px;
              height: 30px;
              border-radius: 6px;
              flex-shrink: 0;
              display: flex;
              justify-content: center;
              align-items: center;            
            }
            .img_right{
              margin-left: 10px;
              cursor: pointer;
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
