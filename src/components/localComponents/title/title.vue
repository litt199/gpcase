<template>
  <span class="title_inner"><i></i>
    <slot>标题</slot>
    <i></i>
  </span>
</template>
<script>
  export default {
  
  }
</script>
<style lang="less" scoped>

    .title_inner{
      display: inline-block;
      margin-right: 40px;
      position: relative;
      padding: 5px 15px;
      i{
        position: absolute;
        display: inline-block;
        opacity: 1;
        width: 30px;
        height: 30px;
        background: url('../../../assets/img/tab_bg.png') no-repeat;
        &:first-child{
          top: 0;
          left: -15px;
        }
        &:last-child{
          top: 0;
          right: -5px;
        }
        
        
      }
    }
  
</style>