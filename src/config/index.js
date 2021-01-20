export default {
    /**
     * @description 配置显示在浏览器标签的title
     */
    title: 'Gpcase',
    /**
     * @description token在Cookie中存储的天数，默认1天
     */
    cookieExpires: 1 / 48,
    /**
     * @description api请求基础路径
     */
    baseUrl: {
       // dev: 'http://192.168.31.84:8080',
        //dev: 'http://192.168.31.151:8009',
         dev: 'http://192.168.31.18:8099',
        
        pro: function () {
            let url = ''
            switch (process.env.VUE_APP_TITLE) {
                case 'build-test':
                    url = "http://192.168.31.156:8004"  //这里是测试环境中的url
                    break
                case 'production':
                    url = window.location.protocol + '//' +window.location.host + '/api'  //生产环境url
                    break
            }
            return url
    
        }()
        
    },
    
    /**
     * @description 需要加载的插件
     */
    plugin: {
        // 引入自定义插件
    }
}
