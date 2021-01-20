<template>
    <gp-dialog :visible.sync="visible" :lock-scroll="false" :destroy-on-close="true" width="300px">
        <div class="alert">
            <div class="title">
                {{title}}
            </div>
            <div class="content">
                {{content}}
            </div>
            <div class="footer">
                <gp-btn class="btn" v-if="cancelBtn" border="#000" :width="70" :height="24" color="#000"
                        @click="close">取消
                </gp-btn>
                <gp-btn class="btn" :width="70" :height="24" bg="linear-gradient(to bottom, #b763f3 0%, #680fdc 100%)"
                        @click="onClose">确认
                </gp-btn>
            </div>
        </div>
    </gp-dialog>
</template>

<script>
    const Msg = {
        name: 'message',
        data() {
            return {
                title: '提示',
                visible: false,
                content: '',
                cancelBtn: false,
                confirm: '',
                cancel: ''
            }
        },
        install(Vue) {
            Vue.prototype.$msg = (config) => {   //通过原型注册一个方法
                const MessageConstructor = Vue.extend(Msg);  //生成一个Vue子类，子类就是这个组件
                
                
                const instance = new MessageConstructor({data: config});   //生成该子类的实例
                instance.vm = instance.$mount();  //将该实例手动挂载
                instance.confirm = config.confirm || function () {
                    instance.vm.visible = false;
                }
                instance.cancel = config.cancel || function () {
                    instance.vm.visible = false;
                }
                if(config.hasOwnProperty('cancel')){
                    instance.vm.cancelBtn = true;
                }
                document.body.appendChild(instance.vm.$el);    //将实例挂载到body上
                
                instance.vm.visible = true;
            }
        },
        watch: {
            visible(v) {
            
            }
        },
        methods: {
            onClose() {
                this.visible = false
                this.confirm()
                this.$el.parentNode.removeChild(this.$el)
            },
            show() {
                this.visible = true
            },
            close () {
                this.visible = false
                this.cancel()
                this.$el.parentNode.removeChild(this.$el)
            }
        },
        
        
    }
    
    export default Msg
</script>

　
<style scoped lang='less'>
    .alert {
        padding: 10px;
        
        .title {
            font-size: 14px;
            color: #000;
        }
        
        .content {
            padding: 20px;
        }
        
        .footer {
            text-align: right;
            
            .btn {
                margin-left: 10px;
            }
        }
    }
</style>