<template>
  <div class="help">
    <h2>公共组件使用方式</h2>
    <div class="row">
      <div class="title">按钮组件</div>
      <div class="content">
        <gp-btn  :width="116" :height="30" bg="linear-gradient(135deg, #58E4FD 0%, #3692FF 100%)">按钮</gp-btn>
        <gp-btn border="#000" color="#000">按钮</gp-btn>
      </div>
      <div class="info">
        使用方法： 自定义宽高，背景， 边框颜色， 字体颜色，
        属性： long 100%显示
      </div>
    </div>
    <div class="row">
      <div class="title">弹窗组件</div>
      <div class="content">
        <gp-btn  :width="116" :height="30" bg="linear-gradient(135deg, #58E4FD 0%, #3692FF 100%)" @click="showDialog = true">弹窗</gp-btn>
        <gp-dialog :visible.sync="showDialog" width="360px">
          123
          <div>
            弹窗内容，可自定义
          </div>
          <div>
            <gp-btn  :width="116" :height="30" bg="linear-gradient(135deg, #58E4FD 0%, #3692FF 100%)">确认</gp-btn>
            <gp-btn border="#000" color="#000" @click="showDialog = false">取消</gp-btn>
          </div>
        </gp-dialog>
      </div>
      <div class="info">
        使用方法： element-ui库dialog组件二次封装，属性参考element-ui
      </div>
    </div>
    <div class="row">
      <div class="title">Msg消息</div>
      <div class="content">
        <gp-btn :width="116" :height="30" bg="linear-gradient(135deg, #b763f3 0%, #3692FF 100%)" @click="showAlert">消息</gp-btn>
        <div>
          全局函数调用方式
        </div>
      </div>
      <div class="info">
        使用方法： this.$msg({
          title: '',
          content: '',
          confirm: ()=> {
          
          }
          
        })
      </div>
    </div>
    <div class="row">
      <div class="title">Input</div>
      <div class="content">
        <gp-input v-model="input"></gp-input>
        <div>
          基于element-ui input组件二次封装，使用方法相同
        </div>
      </div>
      <div class="info">
        使用方法： element-ui库dialog组件二次封装，属性参考element-ui
      </div>
    </div>
    <div class="row">
      <div class="title">card</div>
      <div class="content">
        <div style="width: 200px;height: 200px;">
          <gp-card>
            卡片
          </gp-card>
        </div>
       <div style="height: 200px;">
         <gp-card>
           <div slot="header">头部</div>
           卡片
         </gp-card>
       </div>
       
        <div>
          块级组件，快速布局
        </div>
      </div>
      <div class="info">
      </div>
    </div>
    <div class="row">
      <div class="title">分页</div>
      <div class="content">
        <gp-pagination layout="prev, pager, next" :total="50"></gp-pagination>
        <div>
          基于element-ui input组件二次封装，使用方法相同
        </div>
      </div>
      <div class="info">
        使用方法： element-ui库dialog组件二次封装，属性参考element-ui
      </div>
    </div>
    <div class="row">
      <div class="title">table</div>
      <div class="content">
        
          <gp-table :columns="columns" :data="data">
           
            <template slot-scope="{ row, index }" slot="abrasion">
              <div class="abrasion">
                <div class="">{{row.abrasion}}</div>
                <div class="">查看监视图</div>
              </div>
    
            </template>
            <template slot-scope="{ row, index }" slot="printing">
              <div class="printing">
                12321
      
              </div>
            </template>
            <template slot-scope="{ row, index }" slot="price">
              <div class="price text-light">
                ${{row.price}}
              </div>
            </template>
         
            <template slot-scope="{ row, index }" slot="actions">
              <gp-btn  round   bg=" linear-gradient(135deg, #58E4FD 0%, #3692FF 100%)">我要租</gp-btn>
            </template>
          </gp-table>
        
        <div>
        
        </div>
      </div>
      <div class="info">
      
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showDialog: false,
        input: '',
        columns: [
          
          { title: '磨损度', slot: 'abrasion' },
          { title: '印花', slot: 'printing' },
          { title: '印花', slot: 'price' },
          { title: '操作', slot: 'actions' }
        ],
        data: [
          {
           
            abrasion: '5%',
            printing: '无',
            price: 10,
        
          },
          {
            
            abrasion: '5%',
            printing: '无',
            price: 10,
           
          },
          {
            
            abrasion: '5%',
            printing: '无',
            price: 10,
          
          },
      
  
        ]
      }
    },
    methods: {
      showAlert() {
        this.$msg({
          content: '自定义消息内容',
          // cancelBtn: true,
            confirm: () => {
              console.log('ok')
            
              
            }
          
        })
      }
    },
    mounted() {
    
    }
  }
</script>
<style lang="less" scoped>
  .help{
    position: relative;
    width: 1280px;
    // margin: 0 auto;
     min-height: 700px;
    left: 226px;
   .title{
     margin: 20px 0;
     background: #eee;
     padding: 10px ;
   }
    .content{
      background: #666;
      padding: 20px;
      
    }
  }


  
</style>