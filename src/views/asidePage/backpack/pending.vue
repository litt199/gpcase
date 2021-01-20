<template>
    <div class="pending">
        <div class="header">
            <div class="input">
                <gp-input placeholder="输入饰品名称" v-model="keyWord"></gp-input>
            </div>
            <gp-btn bg="#755adc" :height="36" @click="search">搜索</gp-btn>
            <div class="price" @click="changeSort(sortByPrice)">
                价格
                <!--<gp-icon class="icon" type="icondown" :size="12" color="#fff" @click.native="changeSort(0)"></gp-icon>
                <gp-icon class="icon" type="icontop" :size="12" color="#fff" @click.native="changeSort(1)"></gp-icon>-->
                <div class="triangle" >
                    <div class="up" :class="{selectup: sortByPrice}"></div>
                    <div class="down" :class="{selectdown: !sortByPrice}"></div>
                </div>
            </div>
            <div class="btn-group">
                <gp-btn class="btn" bg="linear-gradient(135deg, #32fe94 0%, #439dfe 100%)" :width="166" :height="36"
                        @click="selectAll">饰品全选
                </gp-btn>
                <gp-btn class="btn" bg="linear-gradient(135deg, #479dff 0%, #884aff 100%)" :width="166" @click="postGetGood" :height="36">取回
                </gp-btn>
                <gp-btn class="btn" bg="linear-gradient(135deg, #884aff 0%, #cf44ff 100%)" :width="166" @click="postSellGood"  :height="36">回收
                </gp-btn>
            </div>
        </div>
        <div class="card-list" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
            <div class="wrap">
                <goodsCard checkable @change="change" :is-check="i.isCheck" :data="i" v-for="(i,index) in cardList" :key="i.id"/>
            </div>
        </div>
        <div class="pagination">
            <gp-pagination layout="prev, pager, next" @current-change="currentChange" :page-size="pageSize" :total="total"></gp-pagination>
        </div>
        <gp-dialog :visible.sync="dialogVisible">
            <div class="pending_dialog">
                <span>系统提示</span>
                <gp-btn :width="170" :height="30" bg="linear-gradient(135deg, #7413e1 0%, #7413e1 100%)" style="margin-bottom:26px;" @click="exchange">取消</gp-btn>
                <gp-btn :width="170" :height="30" bg="linear-gradient(135deg, #7413e1 0%, #7413e1 100%)" style="margin-bottom:26px;" @click="exchange">确定</gp-btn>
            </div>
        </gp-dialog>        
    </div>
</template>
<script>
    import goodsCard from '../../../components/localComponents/goodsCard/goodsCard.vue'
    import {getBackpackInfo, postGetGood, postSellGood} from "../../../api/backpack";
    import {mapActions} from 'vuex'
    export default {
        name: 'backpack',
        components: {
            goodsCard
        },
        data() {
            return {
                dialogVisible: false,
                all: false,
                cardList: [],
                pageSize: 18,
                pageNum: 1,
                goodsState: 0,
                keyWord: '',
                sortByPrice: 0,
                total: 0,
                selectedList: [],
                loading: false,
                comasd: 1
            }
        },
        watch: {
            pageNum: {
                handler(val) {
                    this.selectedList = []
                    this.all = false
                    this.getBackpackInfo(val)
                },
                
            },
            sortByPrice() {
                this.getBackpackInfo(1)
            },
            cardList() {
                console.log('bian')
            }
        },
        methods: {
            ...mapActions(['updateUserInfo']),
            exchange() {},
            // 全选
            selectAll() {
               // console.log(this.all)
                this.all = !this.all
                this.comasd += 1;
                let arr = [].concat(this.cardList)
                this.cardList = []
                
                arr.map((item, index) => {
                    item.isCheck = this.all
                })
                this.cardList = arr
               // console.log(this.cardList)
            },
            // 选择商品
            change(val) {
                if(val.value) {
                    this.selectedList.push(val.id)
                }else {
                    this.selectedList.map((item, index) => {
                        if(item === val.id){
                            this.selectedList.splice(index, 1)
                        }
                    })
                }
            },
            // 获取背包数据
            async getBackpackInfo(page) {
                let json = {
                    size: this.pageSize,
                    page: page,
                    goodsState: this.goodsState,
                    keyWord: this.keyWord,
                    sortByPrice: this.sortByPrice,
                }
                this.loading = true
                let res = await getBackpackInfo(json)
                this.loading = false
                if (res && res.code === 0) {
                    this.cardList = []
                    this.$nextTick(() => {
                        this.cardList = res.data || []
                        this.total = res.total
                    })
                    
                }
            },
            // 搜索
            search() {
                if(!this.keyWord.length)return
                this.getBackpackInfo(1)
            },
            // 修改排序
            changeSort(type) {
                
                if(type){
                    this.sortByPrice = 0
                }else{
                    this.sortByPrice = 1
                }
                this.$nextTick(() => {
                    this.selectedList = []
                    this.all = false
                })
                
            },
            // 页数变化
            currentChange(pageNum){
                this.pageNum = pageNum
            },
            // 取回
             postGetGood() {
                
                if(!this.selectedList.length){
                    this.$message.info('请先选择商品')
                    return new Promise(()=>{
                        return false
                    })
                }
                this.$msg({
                    content: '确认取回所选商品吗？',
                    confirm: async() =>{
                        let res = await postGetGood({id: this.selectedList.join(',')})
                        if(res!==undefined){
        
                            if(res.code===0){
                                this.$message({
                                    message:'取回成功！',
                                    type:'success'
                                })
                                this.selectedList = []
                                this.all = false
                                this.updateUserInfo()
                                this.getBackpackInfo(1)
                            }else if(res.code === 10){  // 取回商品中有商品没有库存的情况
                                this.$msg({
                                    content: res.data.msg,
                                    confirm: () => {
                                        let ids = ''
                                        res.data.goodsIds.forEach((item) => {
                                            ids += item.id + ',';
                                        })
                                        ids = ids.substring(0,ids.length - 1);
                                        postGetGood({id: ids, isforcetake: 1}).then(res=> {
                                            this.$message({
                                                message:'取回请求发起成功，请耐心等待！',
                                                type:'success'
                                            })
                                            this.selectedList = []
                                            this.all = false
                                            this.updateUserInfo()
                                            this.getBackpackInfo(1)
                                        })
                                    },
                                    cancel: ()=>{
                                        console.log('cancel')
                                    }
                                })
                            }else {
                                this.$message({
                                    message:res.msg,
                                    type:'error'
                                })
                            }
        
                        }
                    }
                })
                
            },
            // 回收
             postSellGood() {
                if(!this.selectedList.length){
                    this.$message.info('请先选择商品！')
                    return
                }
                 this.$msg({
                     content: '确认回收所选商品吗？',
                     confirm: async() =>{
                         let res = await postSellGood({id: this.selectedList.join(',')})
                         if(res!==undefined){
                             if(res.code===0){
                                 this.$message({
                                     message:'回收成功！',
                                     type:'success'
                                 })
                                 this.selectedList = []
                                 this.all = false
                                 this.updateUserInfo()
                                 this.getBackpackInfo(1)
                             }else{
                                 this.$message({
                                     message:res.msg,
                                     type:'error'
                                 })
                             }
        
                         }
                     }
                 })
               
            }
        },
        mounted() {
            this.getBackpackInfo(1)
        }
    }
</script>
<style lang="less" scoped>
    .pending {
        .header {
            display: flex;
            align-items: center;
            margin-top: 25px;
            /deep/.ob-btn{
                font-size: 16px;
                letter-spacing: 4px;
            }
            .input {
                width: 210px;
                display: flex;
                margin-right: 10px;
                /deep/.el-input__inner{
                    height: 36px;
                    line-height: 36px;
                    border-radius: 18px;
                }
            }
            
            .price {
                margin-left: 10px;
                position: relative;
                font-size: 22px;
                display: flex;
                align-items: center;
                cursor: pointer;
                .icon {
                    position: absolute;
                    cursor: pointer;
                    
                    &:first-child {
                        top: 15px;
                        right: -20px;
                    }
                    
                    &:last-child {
                        top: 3px;
                        right: -20px;
                    }
                }
            }
            
            .btn-group {
                margin-left: 65px;
                display: flex;
                
                .btn {
                    margin-right: 20px;
                }
            }
        }
        
        .card-list {
            margin-top: 25px;
            min-height: 200px;
            overflow-x: hidden;
            .wrap {
                display: flex;
                flex-wrap: wrap;
                margin-right: -50px;
            }
        }
        
        .pagination {
            text-align: center;
        }
        .el-dialog {
            height: 260px;
            width: 215px; 
            .el-dialog__body {
                height: 220px;
                width: 500px;
                .pending_dialog{
                height: 220px;
                width: 500px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    background: url('../../../../public/images/login_bg.png') 100% no-repeat;
                } 
            }
        
        }
    }
    .triangle {
        margin-left: 10px;
        margin-top: 6px;
        cursor: pointer;
    }

    .triangle .up {
        width: 0;
        height: 0;
        border-width: 0 4px 4px;
        border-style: solid;
        border-color: transparent transparent #AAA;
        margin: 4px auto;
        position: relative;
    }

    .triangle .down {
        width: 0;
        height: 0;
        border-width: 4px 4px 0;
        border-style: solid;
        border-color: #AAA transparent transparent;
        margin: 4px auto;
        position: relative;
    }

    .triangle .selectup {
        border-color: transparent transparent #E60064;
    }

    .triangle .selectdown {
        border-color: #E60064 transparent transparent;
    }

</style>