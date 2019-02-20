var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量
var WEBPACK_ENV=process.env.WEBPACK_ENV  || 'dev';
//获取参数
var getHtmlConfig = function(name,title){
	return{
	
			template:'./src/view/'+name+'.html',
			filename:'view/'+name+'.html',
			title : title,
			inject:true,
			hash:true,
			chunks:['common',name]
		
	}
};
var config = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
		'login': ['./src/page/login/index.js'],
		'result': ['./src/page/result/index.js']
	},
	output: {
		path: './dist',
		publicPath:'/dist',
		filename: 'js/[name].js'
	},
	externals: {
		'jquery': 'window.jQuery'
	},
	module: {
		loaders: [
			{test: /\.css$/,loader: ExtractTextPlugin.extract("style-loader","css-loader")},
			{test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*/,loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
			{test: /\.string$/,loader:'html-loader'}
		]
	},
	resolve:{
		alias:{
			util 			: __dirname + '/src/util',
			node_modules 	: __dirname + '/node_modules',
			page 			: __dirname + '/src/page',
			service 		: __dirname + '/src/service',
			image  			: __dirname + '/src/image',
			
		}
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		}),
		new ExtractTextPlugin("css/[name].css"),
		new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
		new HtmlWebpackPlugin(getHtmlConfig('login','登陆')),
		new HtmlWebpackPlugin(getHtmlConfig('result','提示'))
	]	
};
//
if('dev'===WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;