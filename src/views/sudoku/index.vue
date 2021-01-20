<template>
    <div class="sudoku">
        <div class="tabs">
            <div class="tabs_btn">
                <gp-btn :width="336" :height="35" :bg="typeIndex === index ? getBg(typeIndex) : ''" @click="btnClick(index,item)" v-for="(item,index) in sudokuType" :key="index">{{item.name}}</gp-btn>                       
            </div>
            <div class="tabs_meo">
                <img :src="img_roll_shuoming" />
                <el-tooltip style="" effect="dark" placement="bottom-end">
                <div slot="content">
                    关于游戏<br/>
                    1、奖池中的奖品被打乱放置于九宫格中<br/>
                    2、玩家根据喜好，选择自己想购买的号码<br/>
                    3、若被选中的号码被其他玩家选走，系统会提示您重新选择<br/>
                    4、选卡请确保余额充足<br/>
                    5、点击立即参与即可购买卡片参与活动<br/>
                    6、九宫格玩法是本站提供的休闲娱乐活动，切勿沉迷<br/>
                </div>
                <span>玩法说明</span>
                </el-tooltip>    
            </div>
        </div>
        <router-view />
    </div>
</template>
<script>
export default {
    name: 'sudoku',
    data(){
        return{
            typeIndex: 0,
            sudokuType: [
                {
                    name:'进行中',
                    path:'/sudoku'
                },
                {
                    name:'已结束',
                    path:'/sudoku/finished'
                },
                {
                    name:'我参与的',
                    path:'/sudoku/participate'
                }
            ],
            img_roll_shuoming:require('../../assets/roll/roll_shuoming.png')
        }
    },
    methods:{
        btnClick(val,item) {
            this.typeIndex = val;
            this.$router.push(item.path);
        },
        getBg (val) {
           return val === 0 ? 'linear-gradient(135deg, #33fd95 0%, #439cfe 100%)' : val === 1 ? 'linear-gradient(135deg, #449aff 0%, #894bff 100%)' : 'linear-gradient(135deg, #8b49ff 0%, #d044ff 100%)';
        }
    },
    mounted() {
        this.$route.path == '/sudoku' ? this.typeIndex = 0 : this.$route.path == '/sudoku/finished' ? this.typeIndex = 1 : this.typeIndex = 2;
    }
}
</script>
<style lang="less" scoped>
.sudoku{
    min-width: 800px;
    //padding:0px 17px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .tabs{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 25px;
        .tabs_btn{
            width: 308px;
            height: 35px;
            flex-shrink: 0;
            border-radius: 14px;
            display: flex;
            align-items: center;
            background-color: #262626;
        }
        .tabs_meo{
            display: flex;
            align-items: center;
            img{
                width: 14px;
                height: 14px;
                margin-right: 3px;
            }
            span{
                font-size: 12px;
                border-bottom: 1px solid #FFFFFF;
                cursor: pointer;
            }
        }
    }  
}
</style>