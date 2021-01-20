const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    outputDir: function () { // 打包输出文件目录
        let dist = ''
        switch (process.env.VUE_APP_TITLE) {
            case 'build-test':
                dist = 'dist-front-test'
                break
            case 'production':
                dist = 'dist-front-prod'
                break
            default:
                dist = 'dist'
                break
                
        }
        return dist
    }(),
    productionSourceMap:false, // 不生成map文件
    configureWebpack: config => {
        let optimization = {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 20000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name (module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `npm.${packageName.replace('@', '')}`
                        }
                    }
                }
            },
            // 具体代码
            minimize: true,
            minimizer: [new TerserPlugin({
                parallel: true,
                sourceMap: true,
                extractComments: false, // 不生成注释文件
                terserOptions: {
                    warnings: false,
                    compress: {
                        drop_console: true,// 注释console
                        drop_debugger: true, // 注释debugger
                        pure_funcs: ["console.log"]  //移除console.log()
                    },
                    output: {
                        comments: false
                    }
                   
                }
            })]
        
        };
    
        Object.assign(config, {
            optimization,
            // 插件配置
            plugins:[
                ...config.plugins,
                new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/,
                    threshold: 10240, // 对超过10kb的数据压缩
                    deleteOriginalAssets: false //是否删除原文件
                }),
            ]
        })
    }
}