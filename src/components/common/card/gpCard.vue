<template>
  <div class="gp-card" :class="{round: round}">
    <div class="header" v-if="$slots.header">
      <slot name="header">
      </slot>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
   
  </div>
</template>
<script>
  export default {
    name: 'gp-card',
    props: {
      round: {
        type: Boolean,
        default: true,
      }
    }
  }
</script>
<style lang="less" scoped>
  .gp-card{
    background: url('../../../assets/img/bg.png') repeat;
    width: 100%;
    height: 100%;
    &.round{
      border-radius: 15px;
      overflow: hidden;
    }
    .header{
      //rder-radius: 15px;
      padding: 10px;
      background: url('../../../assets/img/bg_black.png') repeat;
    }
    .content{
      padding: 5px;
    }
  }
</style>