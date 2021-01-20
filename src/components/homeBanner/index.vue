<template>
    <div class="homeBanner">
        <div class="homeBanner_statistical">
            <div class="homeBanner_single_D"  v-for="(item,index) in 6" :key="index" :style="{backgroundColor:colorArr[index].bgColor,borderRadius: index === 0 ? '18px 0 0 18px' : index === 5 ? '0 18px 18px 0' : ''}">
                <div class="homeBanner_single" :style="{backgroundColor:colorArr[index].bgColor,borderRadius: index === 0 ? '18px 0 0 18px' : index === 5 ? '0 18px 18px 0' : ''}">
                    <img class="homeBanner_single_img" v-lazy="colorArr[index].img" />
                    <span class="homeBanner_singleTitle">
                        <span class="singleTitle_one" :style="colorArr[index].color">{{colorArr[index].name}}</span>
                        <span class="singleTitle_two">{{colorArr[index].value}}</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="homeBanner_notable">
            <div class="homeBanner_notableList">
                <div class="homeBanner_notableList_div" v-for="(item,index) in notableList" :key="index" @mouseenter="mouseEnter(index)" @mouseleave="mouseLeave" :style="{backgroundImage:'url('+getBgList(index)+')'}">
                    <img v-lazy="item.image" />
                    <span>{{item.name}}</span>
                    <div class="hover" v-show="notableIndex === index">
                        <img class="hover_img" :src="item.avatar" />
                        <span class="hover_text">{{item.nickName}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getBannerInfo,getAside } from '../../api/banner'
export default {
    name:'homeBanner',
    components:{
    },
    data(){
        return{
            notableIndex: -1,
            img_qiang:require('../../assets/roll/roll_qiang.png'),
            notableColor:[require('../../assets/qiangbg/qiang_blue.png'),require('../../assets/qiangbg/qiang_yellow.png'),require('../../assets/qiangbg/qiang_guihong.png'),require('../../assets/qiangbg/qiang_zi.png'),require('../../assets/qiangbg/qiang_red.png')],
            colorArr:[
                {
                    name:'开箱总数',
                    img:require('../../assets/roll/roll_zongshu.png'),
                    bgColor:'rgb(255,255,255,.02)',
                    color:'color: rgb(255,255,255);',
                    value:''
                },
                {
                    name:'匕首',
                    img:require('../../assets/roll/roll_bishou.png'),
                    bgColor:'rgb(255, 221, 63,.02)',
                    color:'color: rgb(255, 221, 63);',
                    value:''
                },
                {
                    name:'隐秘',
                    img:require('../../assets/roll/roll_yinmi.png'),
                    bgColor:'rgb(245, 85, 75,.02)',
                    color:'color: rgb(245, 85, 75);',
                    value:''
                },
                {
                    name:'保密',
                    img:require('../../assets/roll/roll_baomi.png'),
                    bgColor:'rgb(229, 75, 249,.02)',
                    color:'color: rgb(240, 125, 255);',
                    value:''
                },
                {
                    name:'受限',
                    img:require('../../assets/roll/roll_shouxian.png'),
                    bgColor:'rgb(169, 117, 255,.02)',
                    color:'color: rgb(169, 117, 255);',
                    value:''
                },
                {
                    name:'军规级',
                    img:require('../../assets/roll/roll_junji.png'),
                    bgColor:'rgb(104, 121, 255,.02)',
                    color:'color: rgb(104, 121, 255);',
                    value:''
                }
            ],
            notableList:[]
        }
    },
    methods:{
        mouseEnter(val) {
            this.notableIndex = val;
        },
        mouseLeave() {
            this.notableIndex = -1;
        },
        getBgList (val) {
            let sr = val % 5;
            return this.notableColor[sr];
        },
        getList() {
            let typeParams= {}
            getBannerInfo(typeParams).then((res)=>{
                if (res.data) {
                    this.colorArr[0].value = res.data.opened;
                    this.colorArr[1].value = res.data.knifed;
                    this.colorArr[2].value = res.data.secret;
                    this.colorArr[3].value = res.data.secrecy;
                    this.colorArr[4].value = res.data.bounded;
                    this.colorArr[5].value = res.data.military;
                }
            })
            getAside(typeParams).then((res)=>{
                if (res.data) {
                    this.notableList = res.data;
                }
            })
        }        
    },
    mounted(){
        this.getList();
    }
}
</script>
<style lang="less" scoped>
.homeBanner{
    width: calc(100vw - 275px);
    
    min-height: 122px;
    display: flex;
    flex-direction: column;
    //padding:0px 17px;
    box-sizing: border-box;
    //background-color: rgb(42, 42, 42);
    .homeBanner_statistical{
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;    
        .homeBanner_single_D{
            height:94px;
            width:16.66%;
            flex-shrink: 0;
            .homeBanner_single{
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                .homeBanner_single_img{
                    width: 35px;
                    height: 30px;
                    margin-right: 6px;
                }
                .homeBanner_singleTitle{
                    display: flex;
                    flex-direction: column;
                    .singleTitle_one{
                        line-height: 15px;
                        text-align: left;
                        font-size: 18px;
                        margin-bottom: 2px;
                    }
                    .singleTitle_two{
                        margin-top: 5px;
                        font-size: 18px;
                        line-height: 15px;
                        text-align:left;
                        color: white;
                    }
                }         
            }
        }
    }
    .homeBanner_notable{
        margin-top: 16px ;
        display: flex;
        overflow: hidden;
        .homeBanner_notableList{
            width: 100%;
            white-space:nowrap;
            display: flex;
            overflow: hidden;
            .homeBanner_notableList_div{
                cursor: pointer;
                display: inline-block;
                width: 216px;
                height: 107px;
                flex-shrink: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-size: 100%;
                position: relative;
                img{
                    width: 100px;
                }
                span{
                    color: white;
                    font-size: 12px;
                    text-align: center;
                    white-space: nowrap;  /*强制span不换行*/
                    display: inline-block;  /*将span当做块级元素对待*/
                    width: 80%;  /*限制宽度 可设px*/
                    overflow: hidden;  /*超出宽度部分隐藏*/
                    text-overflow: ellipsis;  /*超出部分以点号代替*/
                    margin: 0 5px;
                    position: absolute;
                    left: 10%;
                    bottom: 5px;
                }
                .hover{
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background:rgba(0,0,0,.5);
                    font-size: 14px;
                    .hover_img{
                        border-radius: 50%;
                        height: 60px;
                        width: 60px;
                    }
                    .hover_text{
                        margin-top: 5px;
                        font-size: 14px;
                    }
                }
            }
        }
    }   
} 
</style>