<template>
    <div class="leftDiv">
        
        
        <img v-lazy="require('../../assets/left/left.png')" alt="" class="logoBottom">
        <!--咨询-->
        <div class="service">
            <img v-lazy="require('../../assets/left/service.png')" style="width:20px;"/>
            <p class="qqa">官方QQ群:</p>
            <p class="qq">95876521</p>
            <p class="qq">97021620</p>
            <p class="qq">95641616</p>
        </div>
        <div class="left">
            <div class="logo">
                <router-link to='/' style="background:none;">
                    <img v-lazy="require('../../assets/header/LOGO.png')" alt="">
                </router-link>
            </div>
            <!--头像-->
            <div class="left_header">
                <div class="opera" v-if="!isLogin">
                    
                    <div class="login">
                        <gp-btn :width="100" @click="loginModalVisible(true)" :height="30"
                                bg="linear-gradient(135deg, #06f5af 0%, #4989f4 100%)">登录
                        </gp-btn>
                    </div>
                    <div class="register">
                        <gp-btn :width="100" @click="registerModalVisible(true)" :height="30"
                                bg="linear-gradient(135deg, #4a87f4 0%, #864af3 100%)">注册
                        </gp-btn>
                    </div>
                </div>
                <div v-if="isLogin">
                    <Upload
                        class="upload-demo"
                        action=""
                        ref="upload"
                        :http-request="httpRequest"
                        :auto-upload="false"
                        :on-change="fileChange"
                        :show-file-list="false"
                        :limit="1">
                        <el-tooltip content="点击更换头像" placement="right">
                            <img class="left_header_img" :src="userInfo.avatar"/>
                        </el-tooltip>
                    </Upload>
                    <p class="account">
                        <span>{{userInfo.nickName}}</span>
                        <el-tooltip content="点击退出登录" placement="right">
                            <img v-lazy="require('../../assets/left/exit.png')" alt="" @click="logout">
                        </el-tooltip>
                    
                    </p>
                    <div class="btnInvest">
                        <!--<img src="../../assets/left/zs.png " style="width:22px;height:22px;"/>-->
                        <div class="inner">
                            <span class="money"> <img src="../../assets/left/diamond.png" alt=""> {{userInfo.diamond}}</span>
                            <el-tooltip content="去充值" placement="right">
                                <span class="invest" @click="payClick">充值</span>
                            </el-tooltip>
                        </div>
                    
                    
                    </div>
                    <div class="score">
                        <div class="inner">
                            <span class="money">积分：{{userInfo.point || 0}}</span>
                            <el-tooltip content="点击查看如何获取积分" placement="right">
                                <span class="img" @click="$router.push('/spread')"></span>
                                <!--<img v-lazy="require('../../assets/left/see.png')" style="cursor: pointer"
                                      alt="">-->
                            </el-tooltip>
                        </div>
                      
                    
                    </div>
                </div>
            
            </div>
            <div v-for="(item,index) in list" :key="index"
                 class="header_content"
                 @click="mouseEnter(index)">
                <router-link :to="item.path">
                    <div class="content">
                        <img class="left_img" :src="item.img1" alt="">
                        <div class="text_header">{{item.title}}</div>
                    </div>
                </router-link>
            </div>
        </div>
        <register width="460px" :visible="register" @close="close('register')"/>
        <login width="460px" :visible="login" @close="close('login')"/>
        <forgot-password width="460px" :visible="forgot" @close="close('forgot')"/>
    </div>
</template>

<script>
    import register from '@/components/user/register.vue'
    import login from '@/components/user/login.vue'
    import forgotPassword from '@/components/user/forgotPassword.vue'
    import {mapMutations, mapState, mapActions} from 'vuex'
    import {getToken} from "../../libs/util";
    import {Upload} from 'element-ui'
    import config from '../../config'
    import axios from 'axios'
    
    export default {
        name: 'Left',
        components: {
            register, login, forgotPassword, Upload
        },
        data() {
            return {
                currentIndex: 0,
                list: [
                    {
                        id: 0,
                        title: "我的背包",
                        path: '/backpack',
                        img1: require('../../assets/left/myBag.png'),
                    },
                    /*{
                        id: 1,
                        title: "我的优惠券",
                        path: '/coupon',
                        img1: require('../../assets/left/coupon.png'),
                    },*/
                    {
                        id: 2,
                        title: "福利任务",
                        path: '/welfare',
                        img1: require('../../assets/left/welfare.png'),
                    },
                    {
                        id: 3,
                        title: "系统消息",
                        path: '/news',
                        img1: require('../../assets/left/setAccount.png'),
                    },
                ],
                isLogin: getToken(),
                // avatarUrl: require('')
                config: config,
                header: {
                    'Content-Type': 'multipart/form-data',
                    'AUTHORIZATION': getToken(),
                }
            }
        },
        computed: {
            ...mapState({
                register: state => state.userModules.registerModal,
                login: state => state.userModules.loginModal,
                forgot: state => state.userModules.forgotPwdDialog,
                userInfo: state => state.userModules.userInfo
            }),
            uploadUrl() {
                let url = process.env.NODE_ENV === 'development' ? this.config.baseUrl.dev : this.config.baseUrl.pro
                return url + '/userCenter/uploadImg'
            }
        },
        watch: {
            login() {
                this.isLogin = getToken()
            }
        },
        methods: {
            ...mapMutations([
                'loginModalVisible', 'registerModalVisible', 'forgotPwdDialogVisible', 'setUserInfo'
            ]),
            ...mapActions(['updateUserInfo', 'userLogout']),
            mouseEnter(index) {
                this.currentIndex = index;
            },
            payClick() {
                this.$router.push('/recharge');
            },
            close(type) {
                switch (type) {
                    case 'login':
                        this.loginModalVisible(false)
                        break
                    case 'register':
                        this.registerModalVisible(false)
                        break
                    case 'forgot':
                        this.forgotPwdDialogVisible(false)
                        break
                }
                
            },
            // 推出登录
            logout() {
                this.$msg({
                    title: '提示',
                    content: '确定要退出登录吗？',
                    confirm: () => {
                        this.userLogout().then(res => {
                            this.isLogin = getToken()
                        })
                        
                    }
                })
            },
            fileChange(file, fileList) {
                this.$refs.upload.submit();
            },
            httpRequest(param) {
                console.log(param)
                let fileObj = param.file // 相当于input里取得的files
                let fd = new FormData()// FormData 对象
                fd.append('file', fileObj)// 文件对象
                let url = this.uploadUrl
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'AUTHORIZATION': getToken(),
                    },
                    transformRequest: [function (form) {
                        return form;
                    }],
                }
                axios.post(url, fd, config).then(res => {
                    if (res && !res.code) {
                        this.updateUserInfo()
                    }
                })
            }
        },
        created() {
            // 已登录更新用户信息,未登录清除用户信息
            if (getToken()) {
                this.updateUserInfo()
                this.isLogin = getToken()
            } else {
                this.setUserInfo({})
            }
            
        }
    }
</script>

<style lang="less" scoped>
    .leftDiv {
        width: 192px;
        position: relative;
        background: #2e2e2e url("../../assets/left/bj.png") no-repeat;
        background-size: 100%;
        min-height: 800px;
        
        .service {
            color: #fff;
            font-size: 12px;
            position: absolute;
            bottom: 88px;
            left: 7px;
            
            .qqa {
                margin-bottom: 12px;
            }
            
            .qq {
                padding-left: 10px;
            }
            
            img {
                position: absolute;
            }
        }
        
        .bg {
            width: 226px;
            position: absolute;
            top: 0px;
            left: 0;
        }
        
        .logoBottom {
            width: 192px;
            position: absolute;
            bottom: 28px;
            left: 0;
        }
        
        .left {
            
            .logo {
                
                margin-top: 56px;
                display: flex;
                justify-content: center;
                
                img {
                    width: 136px;
                    height: 50px;
                }
            }
            
            width: 192px;
            color: #fff;
            // padding-left: 80px;
            text-align: center;
            font-size: 14px;
            box-sizing: border-box;
            
            a {
                text-decoration: none;
            }
            
            .left_header {
                z-index: 2;
                .opera{
                    margin-bottom: 50px;
                }
                p {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 14px;
                    margin: 0;
                    
                }
                
                margin-bottom: 16px;
                padding-top: 70px;
                
                .left_header_img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    //background: #fff;
                    
                }
                
                .account {
                    margin-top: 5px;
                    
                    span {
                        font-size: 14px;
                    }
                    
                    img {
                        cursor: pointer;
                    }
                }
                
                .money {
                    background: rgba(0, 0, 0, .3);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    padding: 0 10px;
                    
                    img {
                        margin-right: 5px;
                    }
                }
                
                .btnInvest {
                    margin-top: 10px;
                    
                    span {
                        font-size: 12px;
                        width: 77px;
                    }
                    
                    
                    .invest {
                        cursor: pointer;
                        width: 36px;
                        height: 16px;
                        line-height: 16px;
                        background-image: linear-gradient(90deg, #71a1fb 0%, #9372ff 100%);
                        border-radius: 8px;
                        margin-left: 5px;
                        text-align: center;
                        transition: all .2s;
                        font-size: 12px;
                        &:hover {
                            box-shadow: 0 0 5px -1px #9372ff;
                        }
                    }
                }
                .inner{
                    display: flex;
                    margin: 0 auto;
                    width: 140px;
                }
                .score {
                    margin-top: 10px;
                    
                    span {
                        width: 77px;
                        font-size: 12px;
                    }
                    .img{
                        width: 22px;
                        height: 16px;
                        margin-left: 5px;
                        background: url('../../assets/left/see.png') 100% center no-repeat;
                    }
                    
                }
            }
            
            .header_content {
                width: 192px;
                text-align: center;
                height: 38px;
                line-height: 38px;
                font-size: 14px;
                
                .text_header {
                    color: #fff;
                    font-size: 19px;
                }
                
                .content {
                    display: flex;
                    align-items: center;
                    margin-left: 24px;
                    
                    .left_img {
                        width: 22px;
                        height: 22px;
                        margin-right: 4px;
                    }
                }
            }
            
        }
    }
    
    .router-link-exact-active, .router-link-active {
        width: 100%;
        height: 100%;
        display: inline-block;
        background: linear-gradient(to right, rgba(112, 80, 172, 100%), rgba(147, 114, 255, 0));
        
        
    }
</style>

