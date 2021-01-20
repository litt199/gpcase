<template>
  <div class="coupon">
    <div class="coupon_select">
        <el-select v-model="typeItem" placeholder="优惠券类型" class="status"  @change="couponType(typeItem)">
            <el-option label="全部" value="">全部</el-option>
            <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select> 
        <el-select v-model="statusItem" placeholder="优惠券状态" class="status"  @change="couponStatus(statusItem)" style="margin-left:10px;">
            <el-option label="全部" value="">全部</el-option>
            <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select> 
    </div>
 
      <div class="tips">
          <gp-card >
                <div class="title">
                    <img v-lazy="require('../../assets/home/1.png')" class="left"/>
                    <span class="p1">优惠券使用说明</span>
                    <img v-lazy="require('../../assets/home/1.png')" class="right"/>
                </div>
                <p>发放：优惠券由平台自由发放</p>
                <p>使用：充值或开箱符合条件自动触发</p>
                <p>有效期：优惠券在有效期，过期则无法使用</p>
          </gp-card>
       </div>
        <div class="content">
          <gp-card >
            <div class="couponList">

                <div :class="item.usedFlag===false&&item.expiredFlag===false?'detail':'detail filter'" v-for="(item,index) in couponList" :key="index">
                    <img v-lazy="require('../../assets/coupon/1.png')" alt="" class="bg">
                    <div class="topCon">
                        <p>送<img v-lazy="require('../../assets/coupon/zs.png')"/><span>{{item.limitValue}}</span></p>
                        <p class="p1">仅限充值满{{item.faceValue}}钻石使用</p>
                        <p  class="p2" >{{item.startDate}}-{{item.expireDate}}</p>
                    </div>
                    <div class="word">
                        <p>优惠券类型：充值返利券</p>
                        <p class="p1">规格说明：<span>充值满{{item.faceValue}}钻石即可赠送{{item.limitValue}}钻石,向上不叠加，用完作废。</span></p>
                        <p>限制类型：充值</p>
                    </div>
                    <div style="width:100%;height: 32px;display: flex;justify-content: center;margin-top:12px;">
                        <div class="btn" v-show="item.usedFlag===false||item.expiredFlag===false">
                            <p>立即使用</p>
                            <img v-lazy="require('../../assets/coupon/use.png')" alt="">
                        </div>
                    </div>
                    <img :src="item.usedFlag===true?used:(item.expiredFlag===true?oldDate:'')" alt="" class="statusImg">
                </div>
            </div>
          </gp-card>
        </div>
      
      
  </div>
</template>

<script>
import {getCoupon,getNine} from '../../api/part'
export default {
  name: 'coupon',
  components: {
  },
  data(){
    return{
        oldDate:require("../../assets/coupon/2.png"),
        used:require("../../assets/coupon/3.png"),
        typeItem:"全部",
        statusItem:"全部",
        couponQuery:{
            type:"",
            status:"",
            pageNum:1,
            pageSize:12
        },
        typeList:[
            {
                value: '1',
                label: '代金券'
            },
             {
                value: '2',
                label: '折扣券'
            },
             {
                value: '3',
                label: '优惠券'
            },
        ],
        statusList:[
            {
                value: '1',
                label: '可使用'
            },
             {
                value: '2',
                label: '已过期'
            },
             {
                value: '3',
                label: '已使用'
            },
        ],
        couponList:[//0:未使用 1：使用 2：过期
           
        ]
    }
  },
  mounted(){
      this.getCouponList();
  },
  methods:{
      getCouponList(){
          getCoupon(this.couponQuery).then((res)=>{
              this.couponList = res.data.list;
          })
      },
      couponType(name){
          console.log(name)
          this.couponQuery.type = name;
          this.getCouponList()
      },
      couponStatus(name){
          console.log(name)
          this.couponQuery.status = name;
          this.getCouponList();
      }
  }
}
</script>
<style lang="less" scoped>
.coupon{
    padding: 17px;
    box-sizing: border-box;
    .tips{
        margin-top: 15px;
        font-size: 12px;
        /deep/.gp-card{
            padding: 12px;
            box-sizing: border-box;
            .title{
                width: 160px;
                height: 30px;
                line-height: 30px;
                font-size:17px;
                position: relative;
                top: -4px;
                .p1{
                    display: inline-block;
                    color:#bbacf1;
                    text-align: center;
                    height: 30px;
                    line-height: 30px;
                    padding: 0 20px;
                    box-sizing: border-box;
                }
                .left{
                    position: absolute;
                    left: -12px;
                    top: 0px;
                }
                .right{
                    position: absolute;
                    top: 0px;
                    right: 0px;

                }
            }
            /deep/.card-content p{
                height: 16px;
                line-height: 16px;
            }
        }
        
    }
    .content{
        margin-top: 15px;
        /deep/.gp-card{
            padding: 20px;
            box-sizing: border-box;
            /deep/.card-content{
                display: flex;
                justify-content: flex-start;
            }
            .couponList{
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                .detail{
                    width: 250px;
                    height: 375px;
                    background: linear-gradient(to bottom, #9964fe, #8c50ff);
                    border-radius: 15px;
                    margin: 0px 0px 20px 15px;
                    padding: 30px 24px 24px 24px;
                    box-sizing: border-box;
                    position: relative;
                   .topCon{
                       position: absolute;
                        top: 100px;
                        left: 44px;
                        width: 162px;
                        text-align: center;
                       p{
                           font-weight: 600;
                           color: #8b4bff;
                           img{
                               width: 40px;
                           }
                           span{
                               font-size: 42px;
                           }
                       }
                        .p1{
                            font-size: 12px;
                            margin-top: 8px;
                        }
                        .p2{
                            font-size: 12px;
                           font-weight:400;
                           margin-top: 3px;
                        }
                        
                   }
                    .bg{
                        width: 100%;
                    }
                    .word{
                        font-size: 12px;
                        p{
                            height: 18px;
                            line-height: 18px;
                            word-wrap: break-word;
                        }
                        .p1{
                            height: 36px;
                            line-height: 18px;
                            word-wrap: break-word;
                        }
                        span{
                            display: inline-block;
                            position: absolute;
                            width: 157px;
                        }
                    }
                    .btn{
                        cursor: pointer;
                        background: #fff;
                        border-radius: 16px;
                        position: relative;
                        width: 160px;
                        p{
                            color:#9e49ff;
                            height: 32px;
                            line-height: 32px;
                            text-indent: 36px;
                            font-weight: bold;
                        }

                        img{
                            position: absolute;
                            top: 7px;
                            right: 40px;
                            width: 16px;
                        }
                    }
                    .statusImg{
                        width: 100px;
                        position: absolute;
                        bottom: 10px;
                        right: 10px;
                    }
                    
                }
            }
            

        }
        
    }
    .filter{
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
    }


}
.coupon_select{
    .el-select /deep/.el-input__inner{
        background-image: linear-gradient(90deg, #141414 0%, #101010 100%);
        border-radius: 12px;
        height: 24px;
        width: 110px;
        border: 1px solid #3f3f3f;
    }
    .el-select /deep/.el-input.is-focus /deep/input.el-input__inner{
        border: 1px solid #cacaca;
    }
    .el-select /deep/.el-input__inner:focus{
        border: 1px solid #cacaca;
    }
    /deep/i.el-select__caret.el-input__icon.el-icon-arrow-up{
        line-height: 24px;
        color: #666666;
    }
}

</style>
