<template>
  <div>
    <gp-btn :width="100" style="margin-right: 20px;" :height="30" border="#fff"  @click="backHome">返回首页</gp-btn>
    <gp-btn :width="160" :height="30" @click="backPrev">返回上一页({{ second }}s)</gp-btn>
  </div>
</template>

<script>
import './error.less'
export default {
  name: 'backBtnGroup',
  data () {
    return {
      second: 5,
      timer: null
    }
  },
  methods: {
    backHome () {
      this.$router.push('/')
    },
    backPrev () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backPrev()
      else this.second--
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
