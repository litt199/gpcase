<template>
    <div class="sudokuCard" >
        <div class="sudokuCardList" :style="{backgroundImage:'url('+cardDetails.activityImg+')'}">
            <div class="sudokuCard_number" v-for="(item,index) in cardDetails.cellDetails" :key="index" @click="cardClick(cardDetails.id)"
            :style="{color:item.flag == 0 ? '#fff' : '#717171', borderTopLeftRadius: [0].includes(index)  ? '12px' : '',borderTopRightRadius: [2].includes(index)  ? '12px' : '',borderRight: ![2,5,8].includes(index) ? '1px solid #323232' : '',borderBottom: index < 6 ? '1px solid #323232' : ''}">
                {{item.cellId}}
                <div class="hover" v-show="item.flag !== 0"></div>
            </div>
        </div>
        <div class="sudokuCardTitle">
            <span>{{cardDetails.activityName}}</span>
            <span>{{cardDetails.price}}钻石</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'sudokuCard',
    props:{
        cardDetails:{
            type:Object,
            default: () => {}
        }
    },
    data(){
        return{

        }
    },
    methods:{
        cardClick(val){
            this.$router.push({
                                name:'sudokuDetails',
                                params:{
                                    id:val
                                }
                            });
            let obj = JSON.stringify(this.cardDetails.id);
            localStorage.setItem("sudokuCardId", obj);
        }
    }
}
</script>
<style lang="less" scoped>
.sudokuCard{
    height: 216px;
    width: 288px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    flex-wrap: wrap;
    box-shadow:  1px 1px 1px 1px #615f5f;
    margin: 25px 40px 0 0;
    .sudokuCardList{
        display: flex;
        flex-wrap: wrap; 
        background-size: 100%;
        .sudokuCard_number{
            width: 95px;
            height: 60px;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: pointer;
            .hover{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background:rgba(0,0,0,.3);
            }            
        }   
    }
    .sudokuCardTitle{
        margin-top: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #323232;
        padding: 0 12px 10px;
        border-radius:0 0 12px 12px;
        span{
            font-size: 14px;
        }
    }
}
</style>