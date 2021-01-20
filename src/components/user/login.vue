<template>
    <gp-dialog v-bind="$attrs" v-on="$listeners">
        <div class="register-dialog">
            <p class="title">欢迎登录</p>
            <div class="register">
                
                <div class="logo">
                    <img src="../../../public/images/logo.png" alt="">
                </div>
                <div class="progress">
                    <div class="type-btn" :class="{active: !loginType}" @click="changeLoginType(0)">账号密码登录</div>
                    <div class="type-btn" :class="{active: loginType}" @click="changeLoginType(1)">手机验证码登录</div>
                </div>
                
                <!--form-->
                <div class="form" ref="form">
                    
                    <div class="formOne" v-show="loginType === 0">
                        <el-form ref="formOne" :rules="formOneRules" :model="formOne">
                            
                            <el-form-item prop="count">
                                <dialog-input type="text" v-model.trim="formOne.count" placeholder="请输入账号">
                                </dialog-input>
                            </el-form-item>
                            
                            <el-form-item prop="password">
                                <dialog-input @keyup.enter.native="submit(0)" v-model.trim="formOne.password" type="password" placeholder="请输入密码">
                                </dialog-input>
                            </el-form-item>
                        </el-form>
                        <gp-btn long :height="40" class="btn" @click="submit(0)"
                                :loading="loading"
                                bg="linear-gradient(to bottom, #9621ee 0%, #6910dc 100%)">登录
                        </gp-btn>
                    
                    </div>
                    
                    <div class="formTwo" v-show="loginType === 1">
                        <el-form ref="formTwo" :rules="formTwoRules" :model="formTwo">
                            
                            <el-form-item prop="phone">
                                <dialog-input class="phone" v-model.trim="formTwo.phone" placeholder="请输入手机号">
                                    <div slot="prefix">
                                        +86 <span style="color: #333"> > </span>
                                        <gp-icon type="icon-xiangyou_icon" color="#58E4FD" :size="12"></gp-icon>
                                    </div>
                                </dialog-input>
                            </el-form-item>
                            <el-form-item prop="code">
                                <dialog-input  @keyup.enter.native="submit(1)" class="getqrcode" v-model.trim="formTwo.code" placeholder="在此输入验证码">
                                    <span type="text" slot="suffix" @click="getQrcode(60)">{{  !isNaN(second) ? second +'S' : second }}</span>
                                </dialog-input>
                            </el-form-item>
                        </el-form>
                        <gp-btn long :height="40" class="btn" @click="submit(1)"
                                bg="linear-gradient(to bottom, #9621ee 0%, #6910dc 100%)">登录
                        </gp-btn>
                    </div>
                    <div class="extra-tip">
                        <span @click="goRegister">去注册</span>
                        <span @click="forgotPassword">找回密码</span>
                    </div>
                </div>
                
                <!--form-end-->
            
            </div>
        </div>
    </gp-dialog>
</template>
<script>
    import {isPhone} from "../../libs/regex";
    import {setToken} from "../../libs/util";
    import gpProgress from './progress'
    import dialogInput from './dialogInput'
    import {mapState, mapMutations,mapActions} from 'vuex'
    import {userLogin, userLoginByCode, getLoginCode} from "../../api/user";
    import {JSEncrypt} from 'jsencrypt';
    
    export default {
        components: {
            gpProgress, dialogInput
        },
        data() {
            let checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入手机号码！'));
                } else {
                    if (isPhone(value)) {
                        callback()
                    } else {
                        callback(new Error('手机号码格式不正确！'))
                    }
                }
            };
            return {
                loginType: 0, // 登录方式 0： 账号， 1：手机号
                formOne: {
                    count: '',
                    password: ''
                },
                formOneRules: {
                    count: [
                        {required: true, message: '请输入账号！', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码！', trigger: 'blur'},
                    ]
                },
                formTwo: {
                    phone: '',
                    code: ''
                },
                formTwoRules: {
                    phone: [
                        {validator: checkPhone, trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入验证码！', trigger: 'blur'},
                    ]
                },
                timer: null,
                second: '获取验证码',
                loading: false,
            }
        },
        methods: {
            ...mapMutations([
                'loginModalVisible', 'registerModalVisible', 'forgotPwdDialogVisible', 'setUserInfo'
            ]),
            ...mapActions(['updateUserInfo']),
            encrypt(password) {//密码加密
                // 从后台获取公钥，这里省略，直接赋值
                let publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD\n' + '2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ==';
                let encryptor = new JSEncrypt()  // 新建JSEncrypt对象
                encryptor.setPublicKey(publicKey)  // 设置公钥
                let rsaPassWord = encryptor.encrypt(password)  // 对密码进行加密
                return rsaPassWord;
            },
            // 获取登录验证码
            async getLoginCode() {
              return  await getLoginCode({username: this.formTwo.phone})
            },
            async submit(type) { // type: 登录方式 0 账号登录，1 手机登录
                let res
                this.loading = true
                if (!type) {
                    res = await userLogin({username: this.formOne.count, password: this.encrypt(this.formOne.password) })
                    console.log(res)
                } else {
                    res = await userLoginByCode({
                        username: this.formTwo.phone,
                        code: this.formTwo.code
                    })
                }
                this.loading = false
                if (res.code === 0) {
                    this.$message.success('登录成功！')
                    this.loginModalVisible(false)
                    if(!type){
                        localStorage.setItem('userCount',res.data.user.user.loginName)
                    }else {
                        localStorage.setItem('userCount',res.data.user.loginName)
                    }
                    
                    this.$router.go(0)
                    setToken(res.data.token)
                    await this.updateUserInfo()
                } else{
                    this.$message.error(res.msg)
                }
            },
            // 切换登录方式
            changeLoginType(type) {
                this.loginType = type
                this.$refs['formOne'].resetFields();
                this.$refs['formTwo'].resetFields();
            },
            // 去注册
            goRegister() {
                this.loginModalVisible(false)
                this.registerModalVisible(true)
                //this.$store.commit('loginModalVisible',false)
            },
            
            // 找回密码
            forgotPassword() {
                this.loginModalVisible(false)
                this.forgotPwdDialogVisible(true)
            },
            // 获取验证码
            getQrcode(time) {
                // 验证手机号码
                this.$refs['formTwo'].validateField('phone', async (valid) => {
                    if (!valid) {
                        if (this.timer) return
                        let res = await this.getLoginCode()
                        if(res && res.msg ==='success'){
                            this.$message.success('验证码发送成功')
                            this.second = time  // 定义倒计时间
                            this.timer = setInterval(() => {
                                if (this.second > 1) {
                                    this.second--
                                } else {
                                    clearInterval(this.timer)
                                    this.timer = null
                                    this.second = '重新获取'
                                }
                            }, 1000)
                        }else {
                            this.$message.error(res.msg)
                        }
        
                    } else {
                        return false
                    }
                })
                
            },
           /* keyDown(e) {
                //如果是回车则执行登录方法
                if (e.keyCode == 13) {
                    this.submit();
                }
            }*/
        },
        mounted() {
          //  document.addEventListener('keydown', this.keyDown);
        },
        beforeDestroy() {
          //  console.log('destroy')
          //  document.removeEventListener('keydown', this.keyDown);
        }
    }
</script>
<style lang="less" scoped>
    .register-dialog {
        background: url('../../../public/images/login_bg.png') 100% no-repeat;
    }
    
    .title {
        color: #333;
        padding: 10px 15px;
    }
    
    .register {
        width: 80%;
        margin: 0 auto;
        padding-bottom: 60px;
        color: #000;
        
        .logo {
            text-align: center;
            
            img {
                width: 160px;
            }
        }
        
        .progress {
            margin-top: 30px;
            display: flex;
            padding: 0 2px;
            border-radius: 20px;
            border-top: 1px solid #eee;
            
            .type-btn {
                width: 50%;
                height: 40px;
                display: flex;
                border-radius: 20px;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                
                &:first-child {
                    border-left: 1px solid #c8c8c8;
                }
                
                &:last-child {
                    //box-shadow: 2px -1px 2px #c8c8c8;
                    border-right: 1px solid #c8c8c8;
                }
                
                &.active {
                    color: #fff;
                    background: linear-gradient(to bottom, #9621ee 0%, #6910dc 100%);
                    box-shadow: none;
                }
            }
        }
        
        .form {
            margin-top: 60px;
            
            .btn {
                margin-top: 20px;
            }
            
            .extra-tip {
                margin-top: 20px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                color: #333;
                text-decoration: underline;
                cursor: pointer;
            }
        }
        
    }
    
    /deep/ .phone.el-input--prefix {
        .el-input__inner {
            padding-left: 70px;
        }
    }
    
    /deep/ .getqrcode.el-input--suffix {
        /deep/ .el-input__inner {
            padding-right: 100px;
        }
        
        .el-input__suffix-inner {
            cursor: pointer;
            text-align: center;
        }
        
    }

</style>