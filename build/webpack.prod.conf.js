/**
 * Created by wangyu on 16/10/11.
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
var webpack = require('webpack');
// 引入基本配置
var config = require('./webpack.config');

config.output.publicPath = 'static';

config.vue = {
    loaders: [
        {
        css: ExtractTextPlugin.extract("css")
        }
    ]
};

config.plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    //提取公共组件
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: 'vendors.js'
    }),
    // 压缩代码
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // 提取css为单文件
    //new ExtractTextPlugin("../[name].[contenthash].css"),
    new ExtractTextPlugin("../[name].css"),
    new HtmlWebpackPlugin({
        filename: '../index.html',
        template: path.resolve(__dirname, '../app/index/index.html'),
        inject: true
    })
];

module.exports = config;