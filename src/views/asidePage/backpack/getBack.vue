<template>
    <div class="getback" >
        <gp-table :columns="columns" :data="data" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
            
            <template slot-scope="{ row, index }" slot="name">
                <div class="name">
                    <img v-lazy="row.image" alt="">
                    <div class="">{{row.name}} ({{row.title}})</div>
                </div>
            </template>
            <template slot-scope="{ row, index }" slot="retrieveTime">
                <div class="retrieveTime">
                    {{row.retrieveTime}}
                
                </div>
            </template>
            <template slot-scope="{ row, index }" slot="state">
                <div class="state">
                    {{row.state | changeStatus}}
                </div>
            </template>
            
            <template slot-scope="{ row, index }" slot="actions">
                <div class="actions">
                    <span class="btn" @click="postSellGood(row.id)" v-if="row.state === 1">转回收</span>
                    <span v-if="row.state === 2">/</span>
                </div>
                
            </template>
        </gp-table>
        <div class="pagination">
            <gp-pagination layout="prev, pager, next" @current-change="currentChange" :page-size="pageSize"
                           :total="total"></gp-pagination>
        </div>
    </div>
</template>

<script>
    import {getBackpackInfo, postSellGood} from "../../../api/backpack";
    
    export default {
        name: "getBack",
        data() {
            return {
                columns: [
                    
                    {title: '饰品名称', slot: 'name'},
                    {title: '提交时间', slot: 'retrieveTime'},
                    {title: '取回状态', slot: 'state'},  // 1：备货中， 2， 已取回
                    {title: '操作', slot: 'actions'}
                ],
                data: [],
                pageSize: 10,
                pageNum: 1,
                goodsState: 1,
                keyWord: '',
                sortByPrice: 0,
                total: 0,
                loading: false,
            }
        },
        watch: {
            pageNum: {
                handler(val) {
                    this.getBackpackInfo(val)
                }
            },
        },
        filters: {
            changeStatus: function (val) {
                switch (val) {
                    case 1:
                        return '备货中'
                        
                    case 2:
                        return '已取回'
                    
                    
                }
            }
        },
        methods: {
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
                    this.data = res.data
                    
                    this.total = res.total
                }
            },
            currentChange(pageNum) {
                this.pageNum = pageNum
            },
            // 回收
            async postSellGood(id) {
                
                let res = await postSellGood({id: id})
                if(res!==undefined){
                    if(res.code===0){
                        this.$message({
                            message:'转回收成功！',
                            type:'success'
                        })
                        this.getBackpackInfo(this.pageNum)
                    }else{
                        this.$message({
                            message:'转回收失败:'+ res.msg,
                            type:'error'
                        })
                    }
            
                }
            }
        },
        mounted() {
            this.getBackpackInfo(1)
        }
    }
</script>

<style scoped lang="less">
    .getback {
        margin-top: 20px;
        
        .name {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            
            img {
                width: 80px;
                height: 30px;
                margin-right: 10px;
            }
        }
        .actions{
            color: #bbb0ff;
            .btn{
                cursor: pointer;
            }
        }
        
        .pagination {
            margin-top: 20px;
            text-align: center;
        }
    }
</style>