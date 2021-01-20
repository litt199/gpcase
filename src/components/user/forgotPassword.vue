<template>
    <gp-dialog v-bind="$attrs" v-on="$listeners">
        <div class="register-dialog">
            <div class="register">
                
                <div class="logo">
                    修改密码
                </div>
                <div class="progress">
                    <gp-progress :step-num="step" :step-count="stepTip"></gp-progress>
                </div>
                
                <!--form-->
                <div class="form">
                    
                    <div class="formOne" v-if="step === 0">
                        <el-form ref="formOne" :rules="formOneRules" :model="formOne">
                            <el-form-item prop="phone">
                                <dialog-input class="phone" v-model.trim="formOne.phone" placeholder="请输入手机号">
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
                            
                            <gp-btn long :height="40" @click="nextStep(2)" class="btn"
                                    bg="linear-gradient(to bottom, #9621ee 0%, #6910dc 100%)">完成
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
    import {mapMutations, mapActions} from "vuex";
    import {getPhoneCode, resetPassward, verifyCode} from "../../api/user";
    
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
            let repeatPwd = (rule, value, callback) => {
                console.log(value)
                if (!value) {
                    return callback(new Error('请再次输入密码！'));
                } else if (value !== this.formTwo.passWord) {
                    return callback(new Error('两次输入的密码不一致！'));
                } else {
                    callback()
                }
            }
            return {
                step: 0,
                stepTip: ['账号验证', '密码重置'],
                
                timer: null,
                second: '获取验证码',
                formOne: {
                    phone: '',
                    code: '',
                },
                formOneRules: {
                    phone: [
                        {validator: checkPhone, trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入手机验证码', trigger: 'blur'},
                    ],
                    
                },
                formTwo: {
                    passWord: '',
                    repeatpwd: '',
                },
                formTwoRules: {
                    passWord: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    repeatpwd: [
                        {validator: repeatPwd, trigger: 'blur'},
                    ],
                    
                },
                
            }
        },
        computed: {},
        methods: {
            ...mapMutations([
                'loginModalVisible', 'registerModalVisible', 'forgotPwdDialogVisible'
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
            // 获取验证码 接口
            async getPhoneCode() {
                return  await getPhoneCode({mobile: this.formOne.phone, isRegist: 0})
           
            },
            
            // 验证验证码
            async verifyCode() {
                let params = {
                    "username": this.formOne.phone,
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
                                            message: "验证码错误！",
                                            type: 'error'
                                        })
                                    } else if (res.code === 0) {
                                        this.$message.success('验证码发送成功！')
                                        this.formOne.code = res.msg
                                        this.step = step  //下一步
                                    } else {
                                        this.$message({                                          //element-ui中的展示请求错误的信息
                                            duration: 2000,
                                            message: "未知错误，从重新注册！",
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
                        this.$refs['formTwo'].validate( async (valid) => {
                            console.log(valid)
                            if (valid) {
                                let res = await this.submit()
                                if(res && res.code === 0){
                                    this.$message.success('密码修改成功，请重新登录')
                                    this.updateUserInfo()
                                    this.forgotPwdDialogVisible(false)
                                }
                                this.step = step
                            } else {
                                return false;
                            }
                        });
                        break
                }
                
                
            },
            // 修改密码
            async submit() {
                return  await resetPassward({
                    mobile: this.formOne.phone, code: this.formOne.code, passWord: this.encrypt(this.formTwo.passWord)
                })
                
            },
            // 去登录
            goLogin() {
                this.loginModalVisible(true)
                this.registerModalVisible(false)
            },
            // 点击获取验证码
            getQrcode(time) {
                // 验证手机号码
                this.$refs['formOne'].validateField('phone', async (valid) => {
                    if (!valid) {
                        if (this.timer) return
                        let res = await this.getPhoneCode()
                        if(res && res.msg ==='success'){
                            this.$message.success(res.msg)
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
            
            
        },
        mounted() {
        
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
            font-size: 30px;
            font-weight: bold;
            margin-top: 50px;
            
            img {
                width: 160px;
            }
        }
        
        .progress {
            margin-top: 50px;
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