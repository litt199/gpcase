<template>
  <Dialog v-bind="$attrs" v-on="$listeners" >
    <template v-for="(index, name) in $slots" :slot="name">
      <slot :name="name"/>
    </template>
  </Dialog>
</template>
<script>
  import { Dialog } from 'element-ui'
  export default {
    components: {
      Dialog
    }
  }
</script>
<style lang="less" scoped>
  /deep/ .el-dialog__headerbtn {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    text-align: center;
    border-radius: 50%;
    border: 1px solid #000;
    right: 10px;
    top: 10px;
    transition: all .2s;
    &:hover {
      transform: scale(1.1);
    }
    .el-dialog__close {
      color: #000;
      font-size: 12px;
      font-weight: bold;
    }
  }
  
  /deep/ .el-dialog {
    background: #fff;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    .el-dialog__body{
      padding: 0;
    }
  }
  /deep/.el-dialog__header {
    padding: 0;
  }
</style>