<template>
    <div class="header">
        <div v-for="(item,index) in list" :key="index" class="header_content" >
            <router-link :to="item.path" @click="mouseEnter(item.id)">
                <div class="content">
                    <img class="pic_img" :src="item.id===currentIndex?item.img2:item.img1" alt="">
                    <div :class="item.id===currentIndex?'text_header_active':'text_header'">{{item.title}}</div>
                </div>
            </router-link>
        </div>
       
    </div>

</template>

<script>
    
    export default {
        name: 'Header',
        
        data() {
            return {
                currentIndex: '',
                list: [
                    {
                        id: 0,
                        title: "开箱",
                        path: '/',
                        img1: require('../../assets/header/freeOpen.png'),
                        img2: require('../../assets/header/s-freeOpen.png'),
                    },
                    {
                        id: 1,
                        title: "免费宝箱",
                        path: '/freeBox',
                        img1: require('../../assets/header/freeOpen.png'),
                        img2: require('../../assets/header/s-freeOpen.png'),
                    },
                    {
                        id: 2,
                        title: "ROLL房",
                        path: '/roll',
                        img1: require('../../assets/header/roll.png'),
                        img2: require('../../assets/header/s-roll.png'),
                    },
                    {
                        id: 3,
                        title: "九宫格",
                        path: '/sudoku',
                        img1: require('../../assets/header/nine.png'),
                        img2: require('../../assets/header/s-nine.png'),
                    },
                    {
                        id: 4,
                        title: "推广中心",
                        path: '/spread',
                        img1: require('../../assets/header/spread.png'),
                        img2: require('../../assets/header/s-spread.png'),
                    },
                    {
                        id: 5,
                        title: "兑换商城",
                        path: '/freeBox/exchangeMall',
                        img1: require('../../assets/header/exchange.png'),
                        img2: require('../../assets/header/s-exchange.png'),
                    },
                    
                    {
                        id: 6,
                        title: "常见问题",
                        path: '/questions',
                        img1: require('../../assets/header/question.png'),
                        img2: require('../../assets/header/s-question.png'),
                    },
                    
                    {
                        id: 7,
                        title: "联系我们",
                        path: '/faq',
                        img1: require('../../assets/header/nine.png'),
                        img2: require('../../assets/header/s-nine.png'),
                    },
                ],
                /* list: [
                    {
                        id: 0,
                        title: "开箱",
                        path: '/',
                        img1: require('../../assets/header-nav/opencase.png'),
                        img2: require('../../assets/header-nav/opencase-light.png'),
                    },
                    {
                        id: 1,
                        title: "免费宝箱",
                        path: '/freeBox',
                        img1: require('../../assets/header-nav/free.png'),
                        img2: require('../../assets/header-nav/free-light.png'),
                    },
                    {
                        id: 2,
                        title: "ROLL房",
                        path: '/roll',
                        img1: require('../../assets/header-nav/roll.png'),
                        img2: require('../../assets/header-nav/roll-light.png'),
                    },
                    {
                        id: 3,
                        title: "九宫格",
                        path: '/sudoku',
                        img1: require('../../assets/header-nav/activity.png'),
                        img2: require('../../assets/header-nav/activity-light.png'),
                    },
                    {
                        id: 4,
                        title: "推广中心",
                        path: '/spread',
                        img1: require('../../assets/header-nav/spread.png'),
                        img2: require('../../assets/header-nav/spread-light.png'),
                    },
                    {
                        id: 5,
                        title: "兑换商城",
                        path: '/freeBox/exchangeMall',
                        img1: require('../../assets/header-nav/mall.png'),
                        img2: require('../../assets/header-nav/mall-light.png'),
                    },
                    {
                        id: 6,
                        title: "常见问题",
                        path: '/questions',
                        img1: require('../../assets/header-nav/question.png'),
                        img2: require('../../assets/header-nav/qiestion-light.png'),
                    },
                    
                    {
                        id: 7,
                        title: "联系我们",
                        path: '/faq',
                        img1: require('../../assets/header-nav/us.png'),
                        img2: require('../../assets/header-nav/us-light.png'),
                    },
                ],*/
                
                
            }
        },
        
        methods: {
            
            mouseEnter(index) {
                this.currentIndex = index;
            },
            
        },
        watch:{
          '$route' : {
              handler(val) {
                  let arr = this.list.filter((item) => {
                      return val.path === item.path
                  })
                  if(!arr.length){
                      this.currentIndex = ''
                      return
                  }
                  this.list.map((item,index) => {
                      if(val.path === item.path){
                          this.currentIndex = item.id
                      }else {
                      
                      }
                  })
              },
              immediate: true
              
          }
        },
        mounted() {
        
        }
    }
</script>

<style lang="less" scoped>
    .header {
       // width: 1054px;
       
        display: flex;
       // margin-left: 226px;
        box-sizing: border-box;
        justify-content: space-between;
        padding: 0 135px;
        .header-inner{
            display: flex;
        }
        .header_content {
           // width: 130px;
            height: 115px;
            /*line-height: 78px;
            text-align: center;*/
            display: flex;
            align-items: center;
           // margin-right: 40px;
            .content {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                img {
                    width: 26px;
                    height: 25px;
                    margin-right: 4px;
                  
                }
                
                .text_header {
                    color: #b9b9b9;
                }
                
                .text_header_active {
                    color: #fff;
                }
            }
            
            .text_header_active {
                color: #fff;
            }
        }
        
        a {
            text-decoration: none;
        }
    }

</style>

