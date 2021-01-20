<template>
    <div class="backpack">
        <gp-card style="margin-top: 20px;">
            <div class="steam-link">
                <div class="link">
                    <p>steam交易链接：</p>
                    <p v-if="userInfo.transactionUrl">{{userInfo.transactionUrl}}</p>
                    <p v-else>未设置交易链接，请更换交易链接</p>
                </div>
                <div class="opera">
                    <span @click="show=true">
                        <img src="../../../assets/left/loingout.png" alt="">
                        更换交易链接
                    </span>
                    <span @click="$router.push('/questions')">
                        <img src="../../../assets/left/tip.png" alt="">
                        如何获取交易链接
                    </span>
                </div>
            </div>
        </gp-card>
        <gp-card style="margin-top: 20px;">
            <div class="wrap">
                <div class="tabs">      
                  <span class="tab " @click="change(item,index)" v-for="(item,index) in tabList"
                        :class="{active: index === tabIndex}" :key="index">
                    <i></i>
                    {{item.text}}
                    <i></i>
                  </span>               
                </div>
            </div>
        
        </gp-card>
        <router-view/>
        <div class="bg" v-if="show" @click="show = false">
        </div>
        <div class="dialog" v-if="show"  >
            <div class="inner">
                <input type="text" v-model="steamLink">
                <gp-btn :width="100" :height="30" @click="changeLink"  bg="linear-gradient(to bottom, #a743f0 0%, #650fdb 100%)"  >确定</gp-btn>
            </div>
        </div>
       
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import {changeSteamLink} from "../../../api/user";

    export default {
        name: "backpack",
        computed: {
          ...mapState({
              userInfo: state => state.userModules.userInfo
          })
        },
        data() {
            return {
                tabIndex: 0,
                tabList: [
                    {
                        text: '待处理饰品',
                        path: '/backpack'
                    },
                    {
                        text: '饰品取回',
                        path: '/backpack/getBack'
                    },
                    {
                        text: '收回记录',
                        path: '/backpack/backRecords'
                    },
                    {
                        text: '开箱记录',
                        path: '/backpack/openRecords'
                    },
                ],
                steamLink: '',
                show: false, //是否显示更换链接弹窗
            }
        },
        methods: {
            ...mapActions(['updateUserInfo']),
            change(item, index) {
                this.tabIndex = index
                this.$router.push(item.path)
            },
            // 更换steam链接
            async changeLink(){
                let res = await changeSteamLink({transactionUrl: this.steamLink})
                if(res && !res.code){
                    this.show = false
                    this.$message.success('更换链接成功')
                    this.updateUserInfo()
                }else {
                    this.$message.error(res.msg)
                }
            }
        },
        mounted() {
            switch (this.$route.name) {
                case 'pending':
                    this.tabIndex = 0
                    break
                case 'getBack':
                    this.tabIndex = 1
                    break
                case 'backRecords':
                    this.tabIndex = 2
                    break
                case 'openRecords':
                    this.tabIndex = 3
                    break
            }
        }
    }
</script>

<style scoped lang="less">
    .wrap {
        padding: 5px 10px;
    }
    .dialog{
       /* position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
        z-index: 998;*/
        .inner{
            position: fixed;
            z-index: 999;
            left: 50%;
            transform: translateX(-50%);
            top: 220px;
            display: flex;
            align-items: center;
            input{
                width: 400px;
                padding: 0 10px;
                height: 30px;
                line-height: 30px;
                outline: none;
                border-radius: 15px;
                border: none;
                font-size: 12px;
                color: #333;
                margin-right: 10px;
            }
        }
    }
    .bg{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
       
       
    }
    .backpack {
        margin-top: 20px;
        //padding: 0 17px;
        color: #fff;
    }
    .steam-link{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        .link{
            font-size: 14px;
            line-height: 20px;
        }
        .opera{
            font-size: 14px;
            img{
                width: 12px;
                height: 12px;
            }
            span{
                cursor: pointer;
                margin-left: 10px;
                &:hover{
                    color: rgb(71, 157, 255);
                }
            }
        }
    }
    .tabs {
        
        border-bottom: 1px solid #383838;
        
        .tab {
            display: inline-block;
            margin-right: 40px;
            position: relative;
            cursor: pointer;
            padding: 5px 15px;
            color: #fff;
            
            &:after {
                position: absolute;
                content: '';
                display: block;
                opacity: 0;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background: #876edf;
                transition: all .2s;
            }
            
            &.active {
                color: #c5b5ff;
                
                &:after {
                    opacity: 1;
                }
                
                i {
                    opacity: 1;
                }
            }
            
            i {
                position: absolute;
                display: inline-block;
                opacity: 0;
                width: 30px;
                height: 30px;
                transition: all .2s;
                background: url('../../../assets/img/tab_bg.png') no-repeat;
                
                &:first-child {
                    top: 0;
                    left: -15px;
                }
                
                &:last-child {
                    top: 0;
                    right: -5px;
                }
                
                
            }
        }
    }
</style>