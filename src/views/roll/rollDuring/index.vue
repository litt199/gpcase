<template>
    <div class="rollDuring">
        <Details></Details>
        <AwardShow></AwardShow>
    </div>
</template>
<script>
import Details from './details'
import AwardShow from './awardShow'
export default {
    name: 'rollDuring',
    components:{
        Details,
        AwardShow
    },
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>
.rollDuring{
    min-width: 800px;
    //padding:0px 17px;
    box-sizing: border-box;
   // background-color: rgb(36,36,36);
}
</style>