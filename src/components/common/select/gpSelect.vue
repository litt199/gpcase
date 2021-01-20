<template>
    <el-select v-on="$listeners" v-bind="$attrs">
        <el-option v-on="$listeners" v-bind="$attrs">
        </el-option>
    </el-select>
</template>
<script>
import {Select,Option} from 'element-ui'
export default {
    name: "gp-select",
    components: {
      Select,
      Option
    }
  }
</script>
<style scoped lang="less">
.el-select /deep/.el-input__inner{
    background-image: linear-gradient(90deg, #141414 0%, #101010 100%);
    border-radius: 12px;
    height: 24px;
    width: 110px;
    border: 1px solid #3f3f3f;
}
/deep/.el-select /deep/.el-input.is-focus /deep/input.el-input__inner{
    border: 1px solid #cacaca;
}
/deep/.el-select input.el-input__inner:focus{
    border: 1px solid #cacaca;
}
/deep/i.el-select__caret.el-input__icon.el-icon-arrow-up{
    line-height: 24px;
    color: #666666;
}
.el-scrollbar/deep/.el-select-dropdown .el-scrollbar ul{
    background-color: #111111;
}
.el-scrollbar /deep/.el-select-dropdown__item{
    background-color: #111111;
}
.el-scrollbar /deep/.el-select-dropdown__item.hover{
    background-color: #111111;
}
.el-scrollbar /deep/.el-scrollbar__view.el-select-dropdown__list{
    border: 1px solid #cacaca;
}
</style>