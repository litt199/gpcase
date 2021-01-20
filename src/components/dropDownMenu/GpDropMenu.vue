<template>
    <div class="GpDropMenu" @click="onDplIn($event)" >
        <div class="GpDropMenu_current">
            <div :class="{'current_title':true,'current_titleClick1': activeIndex> -1}">{{placeholder}}</div>
            <i :class="{'iClick':!showUl}"></i>
        </div>
        <div class="GpDropMenu_ul" v-show="showUl" @mouseleave="onDplOut($event)">
            <ul >
                <li v-for="(item,index) in dataList" :key="index" @click="onLiClick(index)">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'GpDropMenu',
    props:{
        dataList:{
            type:Array,
            default:() => [
                {name:'开箱一'},
                {name:'开箱二'}
            ]
        },
        placeholder:{
            type: String,
            default: () => '全部'
        }
    },
    directives:{
        dpl:{
            bind(el){
                el.style.display = "none";
            }
        }
    },
    data(){
        return{
            activeIndex: -1,
            showUl: false
        }
    },
    methods:{
        onDplIn(event){
            this.showUl = !this.showUl;
        },
        onDplOut(event){
            this.showUl = !this.showUl;
        },
        onLiClick(index){
            this.activeIndex = index;
            this.showUl = !this.showUl;
            this.$emit("change", {
                index:index,
                value:this.dataList[index]
            })
    }
    }
}
</script>
<style lang="less" scoped>
.GpDropMenu{
    width: 120px;
    height: 100%;
    position: relative;
    .GpDropMenu_current{
        cursor: pointer;
        background: rgb(36, 36, 36);
        border-radius: 32px;
        height: 100%;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid white;
        .current_title{
            font-family: SourceHanSansCN-Bold;
            font-size: 14px;
            letter-spacing: 0;
            margin-left: 15px;
            color: #7A79A6;
        }
        .current_titleClick{
            color: #58E4FD;
        }
        .current_titleClick1{
            color: #58E4FD;
        }
        i{
            content: '';
            width: 0;
            height: 0;
            display: block;
            border-style: solid;
            border-width: 0 6px 6px;
            border-color: transparent transparent #58E4FD;
            position: absolute;
            top: 13px;
            right: 17px;
        }
        .iClick{
            transform:rotate(180deg);
            border-color: transparent transparent #46456E;
        }

    }
    .GpDropMenu_ul{
        position: absolute;
        top: 40px;
        left: 0;
        max-height: 190px;
        width: 100%;
        margin: 0;
        padding: 0;
        overflow: auto;
        background: #1D1D32;
        border-radius: 17px;
        z-index: 2;
        ul{
            position: relative;
            height: 100%;
            width: 100%;
            margin-left: 15px;
            padding: 0;
            li{
                list-style: none;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                background: #1D1D32;
                font-family: SourceHanSansCN-Bold;
                letter-spacing: 0;
                cursor: pointer;
                z-index: 2;
            }
            li:hover{
                color: #58E4FD;
            }
        }       
    }
    ::-webkit-scrollbar{
        display:none;/*ChromeSafari*/       
    }
}
</style>