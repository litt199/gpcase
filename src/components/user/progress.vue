<template>
  <div class="progress">
    <div class="step" :class="{full: stepNum >= index}" v-for="(i,index) in stepCount.length + 1" :key="index">
      <span class="step-text">
        {{index + 1}}
        
      </span>
      <span class="tip">{{stepCount[index]}}</span>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: "progress.vue",
    props: {
      stepCount: {
        type: Array,
        default: () => []
      },
      stepNum: {
        type: Number,
        default: 0
      }
    },
    watch: {
      stepNum(val) {
        this.$emit('stepChange', val)
      }
    }
  }
</script>

<style scoped lang="less">
.progress{
  width: 100%;
  display: flex;
  .step{
    background: #f5f5f5;
    position: relative;
    box-shadow: 2px -1px 2px #c8c8c8;
    flex: 1;
    height: 10px;
    &:first-child{
      border-radius: 5px 0 0 5px;
    }
    &:last-child{
      border-radius: 0 5px 5px 0;
      .step-text,.tip{
        display: none;
      }
      
    }
    &.full{
      background: #7d15e5;
      .step-text{
        background: linear-gradient(to bottom, #9621ee 0%, #6910dc 100%);
        color: #fff;
        box-shadow: none;
      }
    }
    .step-text{
      position: absolute;
      top: -10px;
      right: 0;
      font-size: 14px;
      font-weight: bold;
      transform: translateX(50%);
      z-index: 999;
      width: 30px;
      text-align: center;
      line-height: 30px;
      height: 30px;
      border-radius: 50%;
      background: #f5f5f5;
      box-shadow: 2px -1px 2px #c8c8c8;
     
    }
    .tip{
      display: block;
      position: absolute;
      top: 30px;
      right: 0;
      font-size: 12px;
      font-weight: normal;
      color: #000;
      line-height: 14px;
      transform: translateX(50%);
     
    }
  }
}
</style>