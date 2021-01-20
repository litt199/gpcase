<template>
    <div class="ob-btn" :class="classList" :style="style" @click="_click">
        
        <span class="inner">
            
            <svg viewBox="0 0 16 16" class="circular" v-if="loading">
                <circle cx="8" cy="8" r="6" fill="none" class="path">
                </circle>
                
            </svg>
            
             <slot></slot>
        </span>
    
    </div>
</template>
<script>
    export default {
        name: 'gp-btn',
        props: {
            type: {
                type: String,
                default: 'default' // 取值： small， dark， 默认default
            },
            width: String | Number,
            height: String | Number,
            bg: String,
            color: String,
            round: {
                type: Boolean,
                default: true
            },
            disable: {
                type: Boolean,
                default: false
            },
            border: String,
            long: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            fontSize: {
                type: String,
                default: ''
            }
            
        },
        computed: {
            style() {  // 直接修改行内样式
                let obj = {}
                if (this.color) {
                    obj.color = this.color
                }
                if (this.width) {
                    obj.width = this.width + 'px'
                }
                if (this.height) {
                    obj.height = this.height + 'px'
                    obj.lineHeight = this.height + 'px'
                    obj.borderRadius = parseInt(this.height)/2 + 'px'
                }
                if (this.bg) {
                    obj.background = this.bg
                }
                if(this.fontSize){
                    obj.fontSize = this.fontSize
                }
                if (this.border) {
                    obj.borderColor = this.border
                }
                return obj
            },
            classList() {
                return {
                    round: this.round,
                    btnDefault: this.type === 'default',
                    btnSmall: this.type === 'small',
                    border: this.border,
                    long: this.long,
                    disable: this.disable,
                    loading: this.loading
                }
            }
        },
        methods: {
            _click() {
                if(this.loading)return
                this.$emit('click')
            }
        }
    }
</script>
<style scoped lang="less">
    .circular {
        height: 16px;
        width: 16px;
        margin-right: 5px;
        animation: loading-rotate 2s linear infinite;
        .path {
            animation: loading-dash 1.5s ease-in-out infinite;
            stroke-dasharray: 90,150;
            stroke-dashoffset: 0;
            stroke-width: 2;
            stroke: #fff;
            stroke-linecap: round;
        }
    }
    
    @keyframes loading-rotate {
        100% {
            transform: rotate(1turn);
        }
    }
    
    .ob-btn {
        display: inline-block;
        padding: 0 10px;
        overflow: hidden;
        box-sizing: border-box;
        cursor: pointer;
        text-align: center;
        color: #fff;
        transition: all .2s;
        font-size: 12px;
        
        &:hover {
            box-shadow: 0 0 4px -1px #58E4FD;
        }
        
        .inner {
            
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    
    .ob-btn {
        &.round {
            border-radius: 20px;
        }
        
        &.btnSmall {
            padding: 0 10px;
            font-size: 12px;
        }
        
        &.border {
            border: 1px solid;
        }
        
        &.long {
            width: 100%;
        }
        
        /**/
        
        &.disable {
            color: #535353;
            background: #9a9a9a;
        }
        &.loading{
            opacity: .7;
        }
    }

</style>