<template>
    <div class="homePage">
       <ROLLList></ROLLList>
    </div>
</template>
<script>
import ROLLList from './ROLLList'
export default {
    name:'ROLLHome',
    components:{
        ROLLList
    },
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>
.homePage{
    min-width: 800px;
    //padding:0px 17px;
    box-sizing: border-box;
}
</style>