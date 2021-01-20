<template>
    <div class="sudoku_ongoing">
        <div class="sudoku_ongoingList">
            <div class="wrap">
                <SudokuCard v-for="(item,index) in cardData" :key="index" :cardDetails="item" ></SudokuCard>
            </div>
            
        </div>
    </div>
</template>
<script>
import SudokuCard from './sudokuCard'
import { getSudokuDoing } from "../../api/sudoku";
export default {
    name: 'sudoku_ongoing',
    components:{
        SudokuCard
    },
    data(){
        return{
            typeParams:{
                page:1,
                size:10,
                msgType:0
             },
             cardData:[]
        }
    },
    mounted() { 
        getSudokuDoing(this.typeParams).then((res)=>{
            if (res.data) {
                this.cardData = res.data;
            }
        })
    }
}
</script>
<style lang="less" scoped>
.sudoku_ongoing{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .sudoku_ongoingList{
        width: 100%;
        overflow-x: hidden;
        .wrap{
            flex-shrink: 0;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            min-height: 500px;
            margin-right: -50px;
        }
        
    }
}
</style>