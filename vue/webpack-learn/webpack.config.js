// webpack 打包配置文件

const path = require('path');

module.exports = {
    entry: path.join(__dirname, './main.js'), // 入口文件
    output: {
        path: path.join(__dirname, './dist/'),
        filename: 'bundle.js'
    },
    module: {    // 处理第三方模块
        rules: [ // 第三方模块匹配规则
            {test: /\.css$/, use: ['style-loader', 'css-loader']},  // 处理css文件Loader
            {test: /\.(jpg|gif|png|jpeg|bmp)$/, use: ['url-loader']}
        ]
    }
}