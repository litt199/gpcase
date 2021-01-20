<template>
    <gp-dialog v-bind="$attrs" v-on="$listeners">
        <div class="register-dialog">
            <p class="title">欢迎注册</p>
            <div class="register">
                
                <div class="logo">
                    <img src="../../../public/images/logo.png" alt="">
                </div>
                <div class="progress">
                    <gp-progress :step-num="step" :step-count="stepTip"></gp-progress>
                </div>
                
                <!--form-->
                <div class="form">
                    
                    <div class="formOne" v-if="step === 0">
                        <el-form ref="formOne" :rules="formOneRules" :model="formOne">
                            <el-form-item prop="registerName">
                                <dialog-input class="registerName" v-model.trim="formOne.registerName"
                                              placeholder="请输入手机号">
                                    <div slot="prefix">
                                        +86 <span style="color: #333"> > </span>
                                        <gp-icon type="icon-xiangyou_icon" color="#58E4FD" :size="12"></gp-icon>
                                    </div>
                                </dialog-input>
                            </el-form-item>
                            <el-form-item prop="code">
                                <dialog-input class="getqrcode" v-model.trim="formOne.code" placeholder="在此输入验证码">
                                    <span type="text" slot="suffix" @click="getQrcode(60)">{{  !isNaN(second) ? second +'S' : second }}</span>
                                </dialog-input>
                            </el-form-item>
                        
                        </el-form>
                        <gp-btn long :height="40" @click="nextStep(1)" class="btn"
                                bg="linear-gradient(to bottom, #9621ee 0%, #6910dc 100%)">下一步
                        </gp-btn>
                        <div class="extra-tip">
                            <span class="" @click="goLogin">已有账号，去登录</span>
                        </div>
                    </div>
                    
                    <div class="formTwo" v-if="step === 1">
                        <el-form ref="formTwo" :rules="formTwoRules" :model="formTwo">
                            <el-form-item prop="passWord">
                                <dialog-input type="password" v-model.trim="formTwo.passWord" placeholder="请输入密码">
                                    <div slot="prefix">
                                        *
                                    </div>
                                </dialog-input>
                            </el-form-item>
                            <el-form-item prop="repeatpwd">
                                <dialog-input type="password" v-model.trim="formTwo.repeatpwd" placeholder="请再次输入密码">
                                    <div slot="prefix">
                                        *
                                    </div>
                                </dialog-input>
                            </el-form-item>
                            <el-form-item prop="nickName">
                                <dialog-input v-model.trim="formTwo.nickName" placeholder="请输入昵称">
                                    <div slot="prefix">
                                        *
                                    </div>
                                </dialog-input>
                            </el-form-item>
                            <el-form-item prop="registerExtensionCode">
                                <dialog-input v-model.trim="formTwo.registerExtensionCode" placeholder="请输入邀请码">
                                    <span type="text" slot="suffix">(非必填)</span>
                                </dialog-input>
                            </el-form-item>
                            <gp-btn long :height="40" @click="nextStep(2)" class="btn"
                                    bg="linear-gradient(to bottom, #9621ee 0%, #6910dc 100%)">下一步
                            </gp-btn>
                            <gp-btn long :height="40" border="#333" color="#333" @click="submit">
                                跳过下一步，直接完成注册
                            </gp-btn>
                        </el-form>
                    </div>
                    <div class="fromThree" v-if="step === 2">
                        <el-form ref="formThree" :model="formThree">
                            <el-form-item>
                                <dialog-input v-model.trim="formThree.steamUrl" placeholder="请输入steam交易链接">
                                    <span type="text" slot="suffix">(非必填)</span>
                                </dialog-input>
                            </el-form-item>
                            <gp-btn long :height="40" @click="nextStep(3)" class="btn"
                                    bg="linear-gradient(to bottom, #9621ee 0%, #6910dc 100%)">完成注册
                            </gp-btn>
                        
                        </el-form>
                    </div>
                </div>
                
                <!--form-end-->
            
            </div>
        </div>
    
    </gp-dialog>
</template>
<script>
    import {isPhone} from '../../libs/regex'
    
    import gpProgress from './progress'
    import dialogInput from './dialogInput'
    import {mapMutations} from "vuex";
    import {getPhoneCode, register, verifyCode} from "../../api/user";
    
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
                step: 0,
                stepTip: ['输入手机号', '个人信息设置', 'steam信息设置'],
                
                timer: null,
                second: '获取验证码',
                formOne: {
                    registerName: '',
                    code: '',
                },
                formOneRules: {
                    registerName: [
                        {validator: checkPhone, trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入手机验证码', trigger: 'blur'},
                    ],
                    
                },
                formTwo: {
                    passWord: '',
                    repeatpwd: '',
                    nickName: '',
                    registerExtensionCode: ''
                },
                formTwoRules: {
                    passWord: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    repeatpwd: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'},
                    ],
                    nickName: [
                        {required: true, message: '请输入昵称', trigger: 'blur'}
                    ]
                },
                formThree: {
                    steamUrl: ''
                },
            }
        },
        computed: {},
        methods: {
            ...mapMutations([
                'loginModalVisible', 'registerModalVisible', 'forgotPwdDialogVisible'
            ]),
            encrypt(password){//密码加密
                // 从后台获取公钥，这里省略，直接赋值
                let publicKey ='MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD\n'+'2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ==';
                let encryptor = new JSEncrypt()  // 新建JSEncrypt对象
                encryptor.setPublicKey(publicKey)  // 设置公钥
                let rsaPassWord = encryptor.encrypt(password)  // 对密码进行加密
                return rsaPassWord;
            },
            // 获取验证码
            async getPhoneCode() {
                return  await getPhoneCode({mobile: this.formOne.registerName, isRegist: 1})
            
            },
            // 验证验证码
            async verifyCode() {
                let params = {
                    "username": this.formOne.registerName,
                    "code": this.formOne.code
                }
                return await verifyCode(params)
            },
            // 点击下一步
            nextStep(step) {
                /* 验证表单 */
                switch (step) {
                    case 1:
                        this.$refs['formOne'].validate(async (valid) => {
                            if (valid) {
                                let res = await this.verifyCode()
                                if (this.reqSuccess(res)) {
                                    if (res.code === 1) {
                                        this.$message({                                          //element-ui中的展示请求错误的信息
                                            duration: 2000,
                                            message: "验证码错误",
                                            type: 'error'
                                        })
                                    } else if (res.code === 0) {
                                        this.formOne.code = res.msg
                                        this.step = step  //下一步
                                    } else {
                                        this.$message({                                          //element-ui中的展示请求错误的信息
                                            duration: 2000,
                                            message: "未知错误，重新注册",
                                            type: 'error'
                                        })
                                    }
                                }
                                
                            } else {
                                console.log('验证失败 !!');
                                return false;
                            }
                        });
                        break
                    case 2:
                        this.$refs['formTwo'].validate((valid) => {
                            if (valid) {
                                this.step = step
                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        });
                        break
                    case 3:
                        // 完成注册步骤
                        this.submit()
                        break
                    
                    
                }
                
                
            },
            // 跳过steam 直接完成注册
            async submit() {
                let json = {
                    ...this.formOne,
                    ...this.formTwo,
                    ...this.formThree
                }
                json.passWord = this.encrypt(this.formTwo.passWord)
                let res = await register(json)
                if (this.reqSuccess(res)) {
                    if (!res.code) {
                        this.step = 0
                        this.formOne = {
                            registerName: '',
                            code: '',
                        }
                        this.formTwo = {
                            passWord: '',
                            repeatpwd: '',
                            nickName: '',
                            registerExtensionCode: localStorage.getItem('decide') || ''
                        }
                        this.formThree = {
                            steamUrl: ''
                        }
                        this.registerModalVisible(false)
                        this.$msg({
                            title: '提示',
                            content: '注册成功，是否要去登录？',
                            confirm: () => {
                                this.loginModalVisible(true)
            
                            }
                        })
                       
                    }
                }
            },
            // 去登录
            goLogin() {
                this.registerModalVisible(false)
                this.loginModalVisible(true)
            },
            // 点击获取验证码
            getQrcode(time) {
                // 验证手机号码
                this.$refs['formOne'].validateField('registerName', async (valid) => {
                    this.$refs['formOne'].validateField('registerName', async(valid) => {
                        if (!valid) {
                            if (this.timer) return
                            let res = await this.getPhoneCode()
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
                })
                
            }
        },
        mounted() {
            if(localStorage.getItem('decide')) {
                console.log(localStorage.getItem('decide'))
                this.$set(this.formTwo,'registerExtensionCode', localStorage.getItem('decide'))
                //this.formTwo.registerExtensionCode = localStorage.getItem('decide')
            }
        }
    }
</script>
<style lang="less" scoped>
    /deep/ .el-dialog__header {
        padding: 0;
    }
    
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
        }
        
        .form {
            margin-top: 60px;
            
            .btn {
                margin-top: 20px;
            }
            
            .extra-tip {
                width: 100%;
                text-align: center;
                font-size: 14px;
                color: #333;
                text-decoration: underline;
                cursor: pointer;
            }
        }
        
    }
    
    /deep/ .registerName.el-input--prefix {
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