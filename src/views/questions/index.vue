<template>
  <div class="questions">
      <div class="question" v-for="(item,index) in question" :key="index">
        
        <p class="title">
            <img v-lazy="require('../../assets/question/qs.png')" alt="" style="width:14px;height:13px;position: absolute;top: 14px;">
            <span>{{item.title}}</span>
        </p>
        <div class="answer">
            <img v-lazy="require('../../assets/question/qs_bg.png')" alt="" class="bg">
            <div v-for="(i, key) in item.questionlist" :key="key">
                <!--<div class="sup-title" v-for="(k,value) in i" v-if="k==='question'">{{i.value}}</div>-->
                <!--<div v-for="(k,value) in i" >{{i.value}}</div>-->
                <div class="sup-title">{{i.question}}</div>
                <div class="sup-content" v-if="i.answer1">{{i.answer1}}</div>
                <div class="sup-content" v-if="i.answer2">{{i.answer2}}</div>
                <div class="sup-content" v-if="i.answer3">{{i.answer3}}</div>
            </div>
        </div>
      </div>

      
      
  </div>
</template>

<script>
export default {
  name: 'questions',
  components: {
  },
  data(){
    return{
        /*questionsList:[
            {
                title:"如何取回饰品",
                answer:"我们有两种方法提取饰品。第一种您出售您获得的饰品之后去兑换商城兑换喜欢的饰品。另一种是您也可以取回大于1美金的饰品，这可能需要等待0-8天，我们发货会以短信的形式通知您。"
            },
            {
                title:"如何获取交易链接",
                answer:"我们有两种方法提取饰品。第一种您出售您获得的饰品之后去兑换商城兑换喜欢的饰品。另一种是您也可以取回大于1美金的饰品，这可能需要我们有两种方法提取饰品。第一种您出售您获得的饰品之后去兑换商城兑换喜欢的饰品。另一种是您也可以取回大于1美金的饰品，这可能需要我们有两种方法提取饰品。第一种您出售您获得的饰品之后去兑换商城兑换喜欢的饰品。另一种是您也可以取回大于1美金的饰品，这可能需要,这可能需要我们有两种方法提取饰品。第一种您出售您获得的饰品之后去兑换商城兑换喜欢的饰品。另一种是您也可以取回大于1美金的饰品，这可能需要"
            },
            {
                title:"交易限制",
                answer:"我们有两种方法提取饰品。第一种您出售您获得的饰品之后去兑换商城兑换喜欢的饰品。另一种是您也可以取回大于1美金的饰品，这可能需要我们有两种方法提取饰品。第一种您出售您获得的饰品之后去兑换商城兑换喜欢的饰品。另一种是您也可以取回大于1美金的饰品，这可能需要"
            },
            {
                title:"最近重置过steam密码",
                answer:"我们有两种方法提取饰品。第一种您出售您获得的饰品之后去兑换商城兑换喜欢的饰品。另一种是您也可以取回大于1美金的饰品，这可能需要"
            },
            {
                title:"steam在新设备登录",
                answer:"我们有两种方法提取饰品。第一种您出售您获得的饰品之后去兑换商城兑换喜欢的饰品。另一种是您也可以取回大于1美金的饰品，这可能需要"
            },
            {
                title:"账户封禁",
                answer:"我们有两种方法提取饰品。第一种您出售您获得的饰品之后去兑换商城兑换喜欢的饰品。另一种是您也可以取回大于1美金的饰品，这可能需要我们有两种方法提取饰品。第一种您出售您获得的饰品之后去兑换商城兑换喜欢的饰品。另一种是您也可以取回大于1美金的饰品，这可能需要"
            },
            {
                title:"其他限制类型",
                answer:"我们有两种方法提取饰品。第一种您出售您获得的饰品之后去兑换商城兑换喜欢的饰品。另一种是您也可以取回大于1美金的饰品，这可能需要我们有两种方法提取饰品。第一种您出售您获得的饰品之后去兑换商城兑换喜欢的饰品。另一种是您也可以取回大于1美金的饰品，这可能需要"
            },
            {
                title:"使用条款",
                answer:"我们有两种方法提取饰品。第一种您出售您获得的饰品之后去兑换商城兑换喜欢的饰品。另一种是您也可以取回大于1美金的饰品，这可能需要"
            },
        ]*/
        question:[
            {
                title:'如何取回饰品？',
                "id":"01",
                questionlist:[
                    {
                        "question": "我们有两种方法提取饰品。第一种您出售您获得的饰品之后去兑换商城兑换喜欢的饰品。另一种是您也可以取回大于1美金的饰品，这可能需要等待0-8天，我们发货会以短信的形式通知您。",
                        "answer1":"",
                        "answer2":"",
                    }
            
                ]
            
            },
            {
                title:'如何绑定STEAM或者STEAM无法访问？',
                "id":"02",
                questionlist:[
                    {
                        "question": "百度下载UU加速器，加速STEAM之后即可登录STEAM。",
                        "answer1":"",
                        "answer2":"",
                    }
                ]
            
            },
            {
                title:'交易限制',
                "id":"03",
                questionlist:[
                    {
                        "question": "为了保护玩家的账户安全， Steam官方会因为用户的一些操作而限制其账户进行交易平台遵循Steam官方市场交易准则交易。交易限制期间的用户将无法取回购买的物品。",
                    },
                    {
                        "question": "如何查看是否有交易限制?",
                        "answer1":"您可以通过尝试发起一次交易报价便会有所提示。",
                    },
                    {
                        "question": "如何解除交易限制?",
                        "answer1":" 无法解除，只能等待限制时间结束。Steam客服不会修改交易或 Steam社区市场中的限制，无论您的帐户出于何种原因受限。我们同样无权解除用户账户的限制，有交易限制的用户等限制解除之后即可交易。",
                    },
                    {
                        "question": "交易限制原因",
                        "answer1":"Steam令牌未启用",
                        "answer2":"为防止您的物品和 Steam账户被非法获取您密码的人盗用， Steam官方要求您启用Steam手机令牌超过15天，如果您启用Steam令牌不到15 天，您将无法交易。 您可以通过手机直接下载Steam Mobile, 开通Steam令牌，等待15天的冷却时间便可解除限制。"
                    },
                    {
                        "answer1":"",
                        "answer2":"",
                        "answer3":"",
                    },
                ]
            
            },
            {
                title:'最近重置过密码',
                "id":"04",
                questionlist:[
                    {
                        "question": "如果您重置了您的密码，您将在 5 天内无法进行交易，如果您的帐户超过 2 个月没有任何活动，您将在 30 天内无法进行交易。",
                        "answer1":"",
                        "answer2":"",
                    },
            
                ]
            
            },
            {
                title:'新设备登录',
                "id":"05",
                questionlist:[
                    {
                        "question": "如果您在一台受Steam令牌保护不到7天的设备上登录，您在7天内将无法进行交易或使用社区市场。在其它被Steam令牌保护超过7天的设备上仍然可以进行交易或使用社区市场清除您的浏览器Cookie、使用新的浏览器、重新安装Steam和格式化等操作将触发此限制。",
                        "answer1":"",
                        "answer2":"",
                    },
            
                ]
            
            },
            {
                title:'账户封禁',
                "id":"06",
                questionlist:[
                    {
                        "question": "如果您的帐户被Steam封禁交易，可能会被临时或永久性的交易封禁。",
                        "answer1":"",
                        "answer2":"",
                    },
            
                ]
            
            },
            {
                title:'其他限制类型',
                "id":"07",
                questionlist:[
                    {
                        "question": "近期取消交易报价、更改邮箱等，其他限制原因在您尝试发起一次报价的时候便会有提示的。",
                        "answer1":"",
                        "answer2":"",
                    },
            
                ]
            
            },
    
    
    
        ],
    }
  },
}
</script>
<style lang="less" scoped>
.questions{
    min-width: 800px;
    //padding: 0 17px;
    box-sizing: border-box;
    margin-top: 13px;
    .question{
        width: 100%;
        display: flex;
        color: #fff;
        font-size: 14px;
        .title{
            width: 160px;
            margin-top: 10px;
            padding: 10px 0px;
            box-sizing: border-box;
            position: relative;
            display: flex;
            span{
                border-bottom:1px solid #fff;
                margin-left: 2px;
                position: absolute;
                left: 15px;
            }
        }
        .answer{
            position: relative;
            margin-left: 10px;
            margin-top: 10px;
            border-radius: 10px;
            overflow: hidden;
            flex: 1;
            padding: 10px;
            .bg{
                
                width: 108%;
                top: 0;
                bottom: 0;
                height: 100%;
                position: absolute;
                left: -10px;
                z-index: -1;
            }
            p{
                padding: 10px 20px;
                box-sizing: border-box;

            }
        }
    }
    .sup-title{
    
    }
    .sup-content{
        padding: 10px;
        color: #c4b1b9;
    }
}
</style>
