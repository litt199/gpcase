<template>
    <div class="faq">
        <gp-card class="item" v-for="(item, index) in question" :key="index">
            <p slot="header" class="title">
                {{item.title}}
            </p>
            <div class="content">
                <p v-for="(i, key) in item.questionlist">{{i.question}}</p>
            </div>
        </gp-card>
    </div>
</template>
<script>
    export default {
        data() {
            return{
                question:[
                    {
                        title:'有关使用本服务的条件',
                        "id":"01",
                        questionlist:[
                            {
                                "question": "未经父母或监护人同意使用本服务，未满十八（18）岁的人不得使用本服务。您需要支持的Web浏览器才能访问该服务。您承认并同意服务的性能取决于您的电脑设备和网络连接的性能。您同意通过Valve Corporation提供的Steam帐户或邮箱账号注册并注册服务。您有责任管理您的帐户并保密您的密码。您还有责任限制对帐户的访问权限。您同意不允许任何第三方使用或访问本服务。您同意自己对您帐户中发生的所有活动或您自己使用密码负责。如果您认为第三方已访问您的密码，请尽快使用服务的密码重新生成功能来获取新密码。",
                                "answer1":"",
                                "answer2":"",
                            }
            
                        ]
            
                    },
                    {
                        title:'作为您使用本服务的条件您不会',
                        "id":"02",
                        questionlist:[
                            {
                                "question": "01.冒充或歪曲您与任何个人或实体的关系; 为了您的财产安全，你只能保存一次该地址。",
                                "answer1":"",
                                "answer2":"",
                            },
                            {
                                "question": "02.访问，篡改或使用本服务或gpcase.com后台系统的任何非公共区域。",
                                "answer1":"",
                                "answer2":"",
                            },
                            {
                                "question": "03.尝试探测，扫描或测试服务或任何相关系统或网络的漏洞，或者破坏与服务及此类系统和网络相关的任何安全或认证措施。",
                                "answer1":"",
                                "answer2":"",
                            },
                            {
                                "question": "04.尝试破译，反编译，反汇编，反向工程或以其他方式调查用于提供服务的任何软件或组件。",
                                "answer1":"",
                                "answer2":"",
                            },
                            {
                                "question": "05.以任何方式伤害或威胁伤害其他用户，或干扰或试图干扰任何用户，主机或网络的访问，包括但不限于发送病毒，超载，洪水，垃圾邮件或邮件轰炸服务。",
                                "answer1":"",
                                "answer2":"",
                            },
                            {
                                "question": "06.提供属于第三方的付款信息。",
                                "answer1":"",
                                "answer2":"",
                            },
                            {
                                "question": "07.以违反其预期用途的滥用方式使用本服务，gpcase.com的政策和说明以及任何适用法律。",
                                "answer1":"",
                                "answer2":"",
                            },
                            {
                                "question": "08.系统地从服务中检索数据或其他内容，以直接或间接地在单个或多个下载，集合，编译，数据库，目录等中创建或编译，无论是通过手动方法，通过使用机器人，爬虫还是蜘蛛，或其他手段。",
                                "answer1":"",
                                "answer2":"",
                            },
                
                            {
                                "question": "09.以违反第三方提供服务运营所需设施和技术的条款和条件的方式使用本服务，例如Valve。",
                                "answer1":"",
                                "answer2":"",
                            },
                            {
                                "question": "10.在使用或访问服务时侵犯第三方知识产权，包括但不限于使用服务提供虚拟物品。",
                                "answer1":"",
                                "answer2":"",
                            },
                            {
                                "question": "11.利用，促销，链接或访问gpcase.com认为具有冒犯性或对gpcase.com声誉造成损害的材料，包括但不限于非法内容和色情内容以及被视为冒犯的内容或者对gpcase.com或服务有伤害（例如Warez网站，IRC机器人和bittorent网站等）。",
                                "answer1":"",
                                "answer2":"",
                            }
                        ]
            
                    },
                    {
                        title:'服务的终止',
                        "id":"03",
                        questionlist:[
                            {
                                "question": "01.我们可以出于任何原因立即终止或暂停访问我们的服务，恕不另行通知或承担任何责任，包括但不限于您违反本条款。",
                            },
                            {
                                "question": "02.终止后，您使用本服务的权利将立即停止。如果您希望终止帐户，可以直接停止使用本服务。",
                            },
                            {
                                "question": "03.本条款的所有条款本质上应在终止后继续有效，包括但不限于所有权条款，保证免责声明，赔偿和责任限制。",
                            },
                        ]
            
                    },
                    {
                        title:'与其他网站的链接',
                        "id":"04",
                        questionlist:[
                            {
                                "question": "01.我们的服务可能包含不属于gpcase.com所有或控制的第三方网站或服务的链接。",
                                "answer1":"",
                                "answer2":"",
                            },
                            {
                                "question": "02.gpcase.com无法控制，也不对任何第三方网站或服务的内容，隐私政策或做法承担任何责任。您进一步承认并同意gpcase.com不会直接或间接地对因使用或依赖任何此类内容，商品或服务而导致或声称造成的任何损害或损失负责或承担责任。或通过任何此类网站或服务。",
                                "answer1":"",
                                "answer2":"",
                            },
                            {
                                "question": "03.我们强烈建议您阅读您访问的任何第三方网站或服务的条款和条件以及隐私政策。",
                                "answer1":"",
                                "answer2":"",
                            },
            
                        ]
            
                    },
                    {
                        title:'免责声明',
                        "id":"05",
                        questionlist:[
                            {
                                "question": "gpcase.com不对网站或网站提供的信息和材料作出任何陈述或保证。在不影响前款规定的一般性情况下，gpcase.com不保证：本网站将始终可用或根本不可用;或者本网站上的信息是完整，真实，准确或无误导性的。本网站上的任何内容均不构成或意图构成任何形式的建议。如果您需要有关任何法律，财务或医疗事宜的建议，请咨询相应的专业人士。 我们与Valve公司，Counter Strike：Global Offensive，Steam或Valve公司的任何其他商标无任何关联或认可。",
                                "answer1":"",
                                "answer2":"",
                            },
            
                        ]
            
                    }
                ],
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "faq";
    .faq{
        min-height: 500px;
    }
</style>