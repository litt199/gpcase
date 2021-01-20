<template>
    <div class="wrap" :class="className">
        <slot>
        
        </slot>
    </div>
</template>
<script>
    export default {
        props: {
            level: {
                type: String,
                default: '普通级'
            }
        },
        computed: {
            className() {
                switch (this.level) {
                    case '受限':
                        return 'level1'
                    case '违禁':
                        return 'level1'
                    case '非凡':
                        return 'level2'
                    case '工业级':
                        return 'level3'
                    case '军规级':
                        return 'level4'
                    case '保密':
                        return 'level5'
                    case '消费级':
                        return 'level6'
                    case '普通级':
                        return 'level6'
                    case '隐秘':
                        return 'level7'
                    
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .wrap{
        border-radius: 10px;
        overflow: hidden;
    }
    .level1{
        background: url('../../../assets/freeBox/sx_wg.png') 100% no-repeat;
    }
    .level2{
        background: url('../../../assets/freeBox/ff.png') 100% no-repeat;
    }
    .level3{
        background: url('../../../assets/freeBox/gy.png') 100% no-repeat;
    }
    .level4{
        background: url('../../../assets/freeBox/jg.png') 100% no-repeat;
    }
    .level5{
        background: url('../../../assets/freeBox/bm.png') 100% no-repeat;
    }
    .level6{
        background: url('../../../assets/freeBox/xf_pt.png') 100% no-repeat;
    }
    .level7{
        background: url('../../../assets/freeBox/ym.png') 100% no-repeat;
    }
</style>