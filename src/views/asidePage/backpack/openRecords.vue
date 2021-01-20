<template>
    <div class="openRecords">
        <gp-table :columns="columns" :data="data" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
    
    
            <template slot-scope="{ row, index }" slot="name">
                <div class="name">
                    {{row.boxName}}
        
                </div>
            </template>
            <template slot-scope="{ row, index }" slot="resultName">
                <div class="name">
                    <img v-lazy="row.goodsPicture" alt="">
                    <div class="">{{row.goodsName}}({{row.goodsTitle}})</div>
                
                </div>
            
            </template>
            <template slot-scope="{ row, index }" slot="time">
                <div class="time">
                    {{row.createTime}}
                
                </div>
            </template>
            
        </gp-table>
        <div class="pagination">
            <gp-pagination layout="prev, pager, next" :total="total"></gp-pagination>
        </div>
    </div>
</template>

<script>
    import {openRecords} from "../../../api/backpack";
    export default {
        name: "openRecords",
        data() {
            return {
                columns: [
                   
                    {title: '箱子名称', slot: 'name'},
                    {title: '奖品名称', slot: 'resultName'},
                    {title: '开箱时间', slot: 'time'},
                    
                    
                ],
                data: [],
                pageSize: 20,
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
                    this.openReacords(val)
                }
            },
        },
        methods: {
            async openReacords(val) {
                this.loading = true
                let res =  await openRecords({page: val, size: this.pageSize})
                this.loading = false
                if(res && res.code === 0) {
                    this.data = res.data
                    this.total = res.total
                }
            }
        },
        mounted() {
            this.openReacords(1)
        }
    }
</script>

<style scoped lang="less">
    .openRecords {
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