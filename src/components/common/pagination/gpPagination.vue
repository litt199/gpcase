<template>
  <Pagination
    v-bind="$attrs" v-on="$listeners" prev-text="上一页" next-text="下一页">
    
  </Pagination>
</template>

<script>
  import { Pagination } from 'element-ui'
  export default {
    name: "gp-pagination",
    components: {
      Pagination
    }
  }
</script>

<style scoped lang="less">

.el-pagination /deep/.btn-next, .el-pagination /deep/.btn-prev{
  background: transparent;
  color: #fff;
}
.el-pagination /deep/button:disabled{
  background: transparent;
}
/deep/.btn-next , /deep/ .btn-prev{
  background: transparent;
  color: #fff;
}
/deep/.el-pager li{
  position: relative;
  color: #a0a0a0;
  background: transparent;
 &.active{
   text-decoration: underline;
   color: #fff;
 }
}
</style>