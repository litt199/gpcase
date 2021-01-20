<template>
    <div class="backRecords" >
        <gp-table :columns="columns" :data="data" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
            
            <template slot-scope="{ row, index }" slot="name">
                <div class="name">
                    <img v-lazy="row.image" alt="">
                    <div class="">{{row.name}} ({{row.title}})</div>
                </div>
            </template>
            <template slot-scope="{ row, index }" slot="time">
                <div class="time">
                    {{row.sellTime}}
                
                </div>
            </template>
            <template slot-scope="{ row, index }" slot="price">
                <div class="time">
                    {{row.price}}
                
                </div>
            </template>
        
        </gp-table>
        <div class="pagination">
            <gp-pagination layout="prev, pager, next"   @current-change="currentChange" :page-size="pageSize" :total="total"></gp-pagination>
        </div>
    </div>
</template>

<script>
    import {getBackpackInfo} from "../../../api/backpack";

    export default {
        name: "backRecords",
        data() {
            return {
                columns: [
                    
                    {title: '饰品名称', slot: 'name'},
                    {title: '回收时间', slot: 'time'},
                    {title: '回收价格', slot: 'price'},
                
                ],
                data: [],
                pageSize: 20,
                pageNum: 1,
                goodsState: 3,
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
            currentChange(pageNum){
                this.pageNum = pageNum
            }
        },
        mounted() {
            this.getBackpackInfo(1)
        }
    }
</script>

<style scoped lang="less">
    .backRecords {
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
        
        .pagination {
            margin-top: 20px;
            text-align: center;
        }
    }
</style>