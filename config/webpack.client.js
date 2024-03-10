const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');

const clientConfig = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../public'),
  },
  devServer: {
    open: true, // 编译完自动打开浏览器
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配到.css样式文件
        use: [
          'style-loader', // 把得到的CSS内容插入到HTML中
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
            },
          },
        ],
      },
    ],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: path.resolve(__dirname, '../src/client/index.html'),
  //   }),
  // ],
};

module.exports = merge(commonConfig, clientConfig);
