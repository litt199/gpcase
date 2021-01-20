<template>
    <div class="table-container">
        <table class="zbx-table" border="0">
            <tr class="zbx-table-head table-row">
                <th v-for="(item, index) in columns">
                    <div class="zbx-table-cell">
                        {{item.title}}
                    </div>
                
                </th>
            </tr>
            
            
            <tbody class="zbx-table-body">
            
            <tr class="table-row" v-for="(row, rowIndex) in data">
                <td v-for="(item, index) in columns">
                    <div class="zbx-table-cell">
                        <slot :name="item.slot" :row="row" :index='rowIndex'>
                        </slot>
                    </div>
                </td>
                <!--<td v-if="columns[columns.length - 1].slot === 'actions'">
                  <div class="zbx-table-cell">
                    <slot name="actions" :row="row" :index = 'rowIndex'>
                    </slot>
                  </div>
                </td>-->
            </tr>
            <tr v-if="!data.length" class="table-row">
                <td v-for="(item, index) in columns">
                    <div class="zbx-table-cell">
                    
                    </div>
                </td>
            
            
            </tr>
            </tbody>
        </table>
        <div v-if="!data.length" class="nodata" style="">暂无数据</div>
    </div>

</template>
<script>
    export default {
        name: 'zbx-table',
        props: {
            columns: {
                type: Array,
                default: () => [
                    {title: '#', slot: 'index'}
                ],
            },
            
            data: {
                type: Array,
                default: () => []
            }
            
        }
    }
</script>
<style lang="less" scoped>
    .table-container{
        position: relative;
    }
    .zbx-table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        
        .zbx-table-head {
            font-size: 12px;
            
            th {
                height: 40px;
                
                &:first-child {
                    .zbx-table-cell {
                        border-radius: 20px 0 0 0;
                    }
                }
                
                &:last-child {
                    .zbx-table-cell {
                        border-radius: 0 20px 0 0;
                    }
                }
            }
            
            .zbx-table-cell {
                background: url('../../../assets/img/bg_black.png');
                font-size: 14px;
                font-weight: bold;
                color: #bbb0ff;
            }
        }
        
        .table-row {
            td {
            
            }
        }
        
        .zbx-table-body {
            .zbx-table-cell {
                color: #fff;
                font-size: 12px;
                background: url('../../../assets/img/bg.png');
            }
            
            .table-row {
                &:last-child {
                    td {
                        &:first-child {
                            .zbx-table-cell {
                                border-radius: 0 0 0 20px;
                            }
                        }
                        
                        &:last-child {
                            .zbx-table-cell {
                                border-radius: 0 0 20px 0;
                            }
                        }
                    }
                }
            }
        }
        
        td {
            height: 104px;
            transition: background-color .2s ease-in-out;
        }
        
        th {
            height: 48px;
        }
        
        td, th {
            border: none;
            min-width: 0;
            box-sizing: border-box;
            text-align: left;
            text-overflow: ellipsis;
            vertical-align: middle;
            padding: 0;
            
        }
        
        .zbx-table-cell {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all .5s;
        }
    }
    
    .nodata {
        position: absolute;
        left: 0;
        right: 0;
        top: 40px;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>