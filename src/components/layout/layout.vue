<template>
  <div class="layout">
    <Left/>
    <div style="padding: 0 32px;flex: 1">
      <Header/>
      <HomeBanner/>
      <router-view/>
      <Footer/>
    </div>
  </div>
</template>
<script>
  import Header from '../header'
  import Left from '../left'
  import Footer from '../footer'
  import HomeBanner from '../homeBanner'
  export default {
    name: 'layout',
    components:{
      Header,
      Left,
      Footer,
      HomeBanner
    }
  }
</script>
<style lang="less" scoped>
  
  .layout{
    width:100%;
    display: flex;
    background: #333333 url("../../assets/bg.png");
    background-size: 100%;

  }
</style>