<template>
  <div class="footer">
       <div class="leftFoot">
            <div class="imgFooter">
                <img src="../../assets/header/biaoqingbao.png" alt="" class="tx">
                <img src="../../assets/header/LOGO.png" alt="">
            </div>
            <div class="centerFoot">
                <p>邮箱：940193479@qq.com</p>
                <p> 版本所有 广陵区尤若电子商务中心©2010 - 2020 GPcase 保留所有 苏ICP备2020056045号</p>
            </div>

       </div>
       <div class="rightFoot">
            <div >
                <p class="top">
                    <span>快捷支付</span>
                </p>
                <p>
                    <a href="">
                        支付宝
                    </a>
                </p>
                <p>
                    <a href="">微信</a>
                </p>
            </div>
            <div>
                <p class="top">
                    <span>信息</span>
                </p>
                <p>
                    <router-link to="faq">关于我们</router-link>
                </p>
                <p>
                    <router-link to="/questions">常见问题</router-link>
                </p>
            </div>
            <div>
                <p class="top">
                    <span>法律</span>
                </p>
                <p>
                     <router-link to="faq1">条款与服务</router-link>
                </p>
                <p>
                    <router-link to="">隐私与政策</router-link>
                </p>
            </div>
       </div>
  </div>
</template>

<script>
export default {
  name: 'Left',
  components: {
  },
  data() {
    return {}
  },
  methods:{
      mouseEnter(){},
  }
}
</script>

<style lang="less" scoped>
    .footer{
        width:100%;
        min-width: 800px;
       // height: 73px;
        display: flex;
        font-size: 12px;
        color: #fff;
        display: flex;
        justify-content: space-between;
        padding: 10px 40px 0px 0px;
        box-sizing: border-box;
        background: #242424;
        
        .leftFoot{
           // width: 300px;
           // height: 48px;
            margin-left: 13px;
            margin-top: 4px;
            display: flex;
            align-items: center;
            .imgFooter{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                img{
                    width: 36px;
                }
                .tx{
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: #fff;
                    margin-bottom: 4px;
                }
            }
            
            .centerFoot{
                margin-left:5px;
                display: flex;
                justify-content: center;
                flex-direction: column;
                height: 48px;
               // width: 300px;
                line-height: 28px;
                p{
                    margin: 0;
                    height: 25px;
                }
            }

        }

        .rightFoot{
            margin-top: 4px;

            display: flex;
            color:#b7b7b7;
            div{
                margin-left: 2px;
                width: 62px;
                padding-bottom: 10px;
                p{
                    height: 20px;
                   
                    margin-top: 10px;
                }
                .top{
                    font-size: 13px;
                    color: #fff;
                    span{
                        border-bottom: 1px solid #fff;
                    }
                }
            }
            a{
                color: #666;
                text-decoration: none;
                &:hover{
                    color: #fff;
                }
                
            }
        }
    }
</style>

