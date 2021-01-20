<template>
  <Input v-bind="$attrs" v-on="$listeners" :style="style">
    <template v-for="(index, name) in $slots" :slot="name">
      <slot :name="name" />
    </template>
  </Input>
</template>
<script>
  import { Input } from 'element-ui'
  export default {
    components: {
      Input
    },
    computed: {
      style() {
        return {}
      }
    }
  }
</script>
<style lang="less" scoped>
  /deep/.el-input__inner{
    border-radius: 10px;
    height: 22px;
    line-height: 22px;
    vertical-align: middle;
    background: transparent;
    box-sizing: border-box;
    border: 1px solid #ddd;
    color: #fff;
    font-size: 14px;
    transition: all .2s;
    box-shadow: none;
    &::placeholder{
      color: #5a5858;
    }
    &:focus, &:hover{
      box-shadow: 0 0 4px -1px #58E4FD;
    }
  }
  /deep/.el-input__prefix{
    
    i{
      margin-left: 10px;
    }
    >div{
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
  /deep/.el-input__prefix, /deep/.el-input__suffix{
    color: #58E4FD;
    padding: 0 10px;
    display: flex;
    align-items: center;
    
  }

</style>