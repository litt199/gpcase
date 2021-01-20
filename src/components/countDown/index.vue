<template>
<div class="details_countdown">
    <span class="kaiqi">{{countdown_text}}</span>
    <div class="span_countdown">
        <span class="span_q" :style="{height:`${countdown_height}px`,width:`${countdown_width}px`,lineHeight:`${countdown_height}px`,fontSize:`${countdown_size}px`}" v-show="!countdown_custom">{{d_prefix}}</span>
        <span class="span_q" :style="{height:`${countdown_height}px`,width:`${countdown_width}px`,lineHeight:`${countdown_height}px`,fontSize:`${countdown_size}px`}" v-show="!countdown_custom">{{d_suffix}}</span>
        <span v-show="!countdown_custom">: </span>
        <span class="span_q" :style="{height:`${countdown_height}px`,width:`${countdown_width}px`,lineHeight:`${countdown_height}px`,fontSize:`${countdown_size}px`}">{{h_prefix}}</span>
        <span class="span_q" :style="{height:`${countdown_height}px`,width:`${countdown_width}px`,lineHeight:`${countdown_height}px`,fontSize:`${countdown_size}px`}">{{h_suffix}}</span>:
        <span class="span_q" :style="{height:`${countdown_height}px`,width:`${countdown_width}px`,lineHeight:`${countdown_height}px`,fontSize:`${countdown_size}px`}">{{m_prefix}}</span>
        <span class="span_q" :style="{height:`${countdown_height}px`,width:`${countdown_width}px`,lineHeight:`${countdown_height}px`,fontSize:`${countdown_size}px`}">{{m_suffix}}</span>:
        <span class="span_q" :style="{height:`${countdown_height}px`,width:`${countdown_width}px`,lineHeight:`${countdown_height}px`,fontSize:`${countdown_size}px`}">{{s_prefix}}</span>
        <span class="span_q" :style="{height:`${countdown_height}px`,width:`${countdown_width}px`,lineHeight:`${countdown_height}px`,fontSize:`${countdown_size}px`}">{{s_suffix}}</span>
    </div>
</div>
</template>
<script>
export default {
  name: 'Date',
  props:{
      endTime:{
          type:Number,
          default: () => new Date().getTime()
      },
      countdown_height:{
          type:Number,
          default: 41
      },
      countdown_width:{
          type:Number,
          default: 24
      },
      countdown_size:{
          type:Number,
          default: 18
      },
      countdown_custom:{
          type:Boolean,
          default: false
      },
      countdown_text:{
          type:String,
          default: '开启倒计时：'
      }
  },
  data() {
    return {
      d_prefix: 0,
      d_suffix: 0,
      h_prefix: 0,
      h_suffix: 0,
      m_prefix: 0,
      m_suffix: 0,
      s_prefix: 0,
      s_suffix: 0,
    }
  },
  created() {
    this.countTime()
  },
  methods: {
    countTime: function() {
      //获取当前时间
      var date = new Date()
      var now = date.getTime()
      //设置截止时间
      //时间差
      var leftTime = this.endTime - now
      //定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
          let d,h,m,s
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
        h = Math.floor((leftTime / 1000 / 60 / 60) % 24)
        m = Math.floor((leftTime / 1000 / 60) % 60)
        s = Math.floor((leftTime / 1000) % 60)
        d < 10 ? d = '0'+ d : d = d+'';
        h < 10 ? h = '0'+ h : h = h+'';
        m < 10 ? m = '0'+ m : m = m+'';
        s < 10 ? s = '0'+ s : s = s+'';
        this.h_prefix = h[0];
        this.h_suffix = h[1];
        this.d_prefix = d[0];
        this.d_suffix = d[1];
        this.m_prefix = m[0];
        this.m_suffix = m[1];
        this.s_prefix = s[0];
        this.s_suffix = s[1];
        this.$emit("change", {
            value:false
        })
      }
      if (leftTime < 0) {
          this.$emit("change", {
              value:true
          })
      }
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(this.countTime, 1000)
    },
  },
}
</script>
<style lang="less" scoped>
.details_countdown{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .kaiqi{
        color: white;
        font-size: 16px;
        margin-right:100px;
    }
    .span_countdown{
        margin-top: 12px;
        text-align: center;
        color: white; 
        margin-bottom: 12px;   
        .span_q{
            background-image: url('../../assets/roll/roll_djs.png');
            background-size: 100%;
            width: 24px;
            line-height: 41px;
            text-align: center;
            background-color: white;
            display: inline-block;
            height: 41px;
            font-size: 18px;
            font-weight: bold;
            border-radius: 8px;
            margin-right: 3px;
            color: black;      
        }                
    }
}
</style>