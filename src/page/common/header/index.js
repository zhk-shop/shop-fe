require('./index.css');
var _shop = require('util/shop.js');
// 通用页面头部
var header = {
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		var keyword = _shop.getUrlParam('keyword');
		//回填输入框
		if(keyword){
			$('#search-input').val(keyword)
		};
	},
	//搜索提交
	bindEvent: function() {
		var _this = this;
		$('#search-button').click(function(){
			_this.searchSubmit();
		});
	//回车提交搜索'
	$('#search-input').keyup(function(e){
		if(e.keyCode === 13){
			_this.searchSubmit();
		}
	})
	},
	//搜索提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}else{
			_shop.goHome();
		}
	}
};
header.init();