<template>
  <div class="home">
      <homeOpenBox/>
  </div>
</template>

<script>
// @ is an alias to /src
import homeOpenBox from './home/index'


export default {
  name: 'Home',
  components: {
    homeOpenBox
  }
}
</script>
<style lang="less" scoped>
.home{
    width: 100%;
    background-color: rgb(36,36,36);
}
</style>
