<template>
    <div class="spread">
        <el-row :gutter="20">
            <el-col :lg="12">
                <gp-card class="content">
                    <div class="title">
                        <Title>我的推广信息</Title>
                    </div>
                    <div class="info">
                        <div class="wrap">
                            <div class="item">
                <span>
                  我的推广码：
                </span>
                                <input class="input" :disabled="true"   v-model="spreadData.extensionCode"></input>
                                <gp-btn @click="copyUrl(spreadData.extensionCode)" :width="90" :height="20" bg="linear-gradient(135deg, #a2a4ff 0%, #7679ff 100%)">
                                    复制
                                </gp-btn>
                            </div>
                            <div class="item">
                <span>
                  我的推广链接：
                </span>
                                <input class="input" :disabled="true"  v-model="spreadData.spreadLink" />
                                <gp-btn @click="copyUrl(spreadData.spreadLink)" :width="90"  :height="20" bg="linear-gradient(135deg, #a2a4ff 0%, #7679ff 100%)">
                                    复制
                                </gp-btn>
                            </div>
                        </div>
                    </div>
                </gp-card>
            </el-col>
            <el-col :lg="12">
                <gp-card class="content">
                    <div class="title">
                        <Title>我的推广成果</Title>
                    </div>
                    <div class="result">
                        
                        <div class="card  bg1">
                            <div class="bg">
                                <p>我的积分</p>
                                <p>{{spreadData.myPoint}}（分）</p>
                            </div>
                        
                        </div>
                        <div class="card  bg2">
                            <div class="bg ">
                                <p>推广完成注册人数</p>
                                <p>{{spreadData.myPromotion}}（人）</p>
                            </div>
                        
                        </div>
                        <div class="card  bg3">
                            <div class="bg ">
                                <p>完成首充人数</p>
                                <p>{{spreadData.myRecharegeCount}}（人）</p>
                            </div>
                        
                        </div>
                        <div class="card bg4">
                            <div class="bg">
                                <p>充值总金额（累计）</p>
                                <p>{{spreadData.myRecharegeAmount}}（钻石）</p>
                            </div>
                        </div>
                    
                    </div>
                    <div class="btn">
                        <gp-btn @click="spreadDetail" :width="110" :height="20" bg="linear-gradient(135deg, #951bee 0%, #660fdb 100%)">刷新数据
                        </gp-btn>
                    </div>
                </gp-card>
            </el-col>
        
        </el-row>
        
        <div class="welfare">
            <div class="title">
                <Title>我的推广信息</Title>
            </div>
            <gp-card style="margin-top: 20px;">
                <div class="welfare-panel">
                    <div class="table">
                        <p class="tip">提示：按推广玩家充值总金额的档位福利</p>
                        <gp-table :columns="columns" :data="data">
                            <template slot-scope="{ row, index }" slot="name">
                                <div class="name">
                                    <div class="" v-if="row.upperLimit">{{row.lowerLimit}}钻石 - {{row.upperLimit}}钻石</div>
                                    <div v-else>{{data[index-1].upperLimit}}钻石以上</div>
                                </div>
                            
                            </template>
                            <template slot-scope="{ row, index }" slot="time">
                                <div class="time">
                                    {{row.rate}}%
                                
                                </div>
                            </template>
                            <template slot-scope="{ row, index }" slot="status">
                                <div class="status">
                                    {{row.getStatus | changeStatus}}
                                </div>
                            </template>
                        
                        </gp-table>
                    </div>
                    <div class="welfare-info">
                        <div class="item">
                            <p class="title">推广福利</p>
                            <p>1.玩家推广用户注册，并完成充值，可获取积分。</p>
                            <p>2.获取的积分可在本站兑换商城中兑换相应积分的饰品。</p>
                        </div>
                        <div class="item">
                            <p class="title">积分规则</p>
                            <p>1.1钻石=10积分，目前推广用户充值是积分的唯一来源。</p>
                            <p>2.根据推广玩家的累积充值金额。</p>
                            <p>3.积分获取分为左图5个档位。</p>
                        </div>
                    </div>
                </div>
            </gp-card>
        </div>
    
    
    </div>
</template>
<script>
    import Title from '../../components/localComponents/title/title'
    import {spreadWelfare, spreadDetail} from "../../api/spread";

    export default {
        name: 'spread',
        components: {Title},
        data() {
            return {
                columns: [
                    
                    {title: '档位条件', slot: 'name'},
                    {title: '奖励', slot: 'time'},
                    {title: '状态', slot: 'status'},
                ],
                data: [
                ],
                spreadData: {
                    extensionCode: '',
                    myPoint: 0,
                    myPromotion: 0,
                    myRecharegeAmount: 0,
                    myRecharegeCount: 0
                }
            }
        },
        filters: {
            changeStatus: function(val) {
                val = parseInt(val)
                switch (val) {
                    case 0:
                        return '待解锁'
                    case 1:
                        return '进行中'
                    case 2:
                        return '完成'
    
                }
            }
        },
        
        methods: {
            // 获取推广福利
            async spreadWelfare() {
                let res = await spreadWelfare()
                console.log(res)
                if(res && res.code === 0){
                    this.data = res.data
                }
            },
            // 推广详情
            async spreadDetail() {
                let res = await spreadDetail()
                if(res && res.code === 0) {
                   this.spreadData = Object.assign(this.spreadData,res.data)
                    console.log(this.spreadData)
                    this.spreadData.spreadLink = window.location.protocol + '//' +window.location.host + '/index/' + this.spreadData.extensionCode
                }
            },
            //实现复制功能
            copyUrl(data){
                let url = data;
                let oInput = document.createElement('input');
                oInput.value = url;
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象; 选择的是文本
                document.execCommand("Copy"); // 执行浏览器复制命令
                this.$message({
                    message: '已成功复制到剪切板',
                    type: 'success'
                });
                oInput.remove()
            },
        },
        mounted() {
            this.spreadWelfare()
            this.spreadDetail()
        }
    }
</script>
<style lang="less" scoped>
    .spread {
        //padding: 0 17px;
        margin-top: 20px;
        padding-bottom: 50px;
        
        .content {
            height: 180px;
            
            .title {
                text-align: center;
                margin-top: 10px;
            }
            
            .info, .content {
                padding-bottom: 20px;
                display: flex;
                justify-content: center;
            }
            
            .wrap {
            
            }
            
            .info {
                .item {
                    display: flex;
                    align-items: center;
                    margin-top: 20px;
                    
                    span {
                        width: 130px;
                        text-align: right;
                    }
                    
                    .input {
                        width: 250px;
                        height: 20px;
                        font-size: 14px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        box-sizing: border-box;
                        background: transparent;
                        color: #979af1;
                        outline: none;
                        border: 1px solid #979af1;
                        border-radius: 10px;
                        padding: 0 10px;
                        margin-right: 10px;
                    }
                }
            }
            
            .result {
                margin-top: 20px;
                display: flex;
                justify-content: center;
                
                .card {
                    width: 120px;
                    height: 50px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 20px;
                    
                    &.bg1{
                        background: -webkit-linear-gradient(0deg, #ceff93, #4599ff);
                    }
                    &.bg2{
                        background: -webkit-linear-gradient(0deg, #4599ff, #874bff);
                    }
                    &.bg3{
                        background: -webkit-linear-gradient(0deg, #874bff, #d043ff);
                    }
                    &.bg4{
                        background: -webkit-linear-gradient(0deg, #d043ff, #ceff93);
                    }
                    .bg {
                        width: 118px;
                        height: 48px;
                        border-radius: 9px;
                        background: url('../../assets/img/bg.png') repeat;
                        
                        p {
                            font-size: 12px;
                            text-align: center;
                            margin-top: 5px;
                        }
                    }
                }
            }
            
            .btn {
                text-align: center;
                margin-top: 20px;
            }
        }
        
        .welfare {
            margin-top: 20px;
            
        }
        
        .welfare-panel {
            display: flex;
            padding: 20px;
            
            .table {
                width: 465px;
                margin-left: 284px;
                
                /deep/ .zbx-table td {
                    height: 40px;
                    
                    /deep/ .zbx-table-cell {
                        border-bottom: 1px solid #242424;
                        background: rgba(0, 0, 0, .2);
                    }
                }
                
                /deep/ .zbx-table-head {
                    /deep/ .zbx-table-cell {
                        
                        background: rgba(0, 0, 0, .3);
                    }
                }
                
                .status {
                    color: #8f91dd;
                }
                
                .tip {
                    margin-bottom: 10px;
                    font-size: 12px;
                    padding: 0 10px;
                }
            }
            
            .welfare-info {
                margin: 50px 0 0 200px;
                
                .item {
                    margin-top: 10px;
                    font-size: 14px;
                    
                    p {
                        margin: 5px 0;
                    }
                    
                    .title {
                        color: #c5b5ff;
                        font-size: 16px;
                    }
                }
            }
        }
    }
</style>