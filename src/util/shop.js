var conf = {
	serverHost : ''
	
};
var Hogan = require('hogan.js');
var _shop = {
	request : function(param){
		var _this = this;
		$.ajax({
			type     :param.method ||'get',
			url      :param.url    ||"",
			dataType :param.type   ||"json",
			data     :param.data   ||"",
			success  :function(res){
				//请求OK
				if(0===res.status){
					typeof param.success === 'function' && param.success(res.data,res.msg)
				}
				//没登陆
				else if(10 === res.status){
					_this.doLogin();
				}
				//错误
				else if(1 === res.status){
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error    :function(err){
				typeof param.error === 'function' && param.error(res.msg);
			}
		});
	},
	//获取URL参数
	getUrlParam : function(name){
		var reg = new RegExp('(^|& )'+ name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2])  : null;
	},
	
	//登陆处理
	doLogin : function(){
		window.location.href = './login.html?redirect='+encodeURIComponent(window.location.href);
	},
	//服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	//成功提示
	successTips: function(msg){
		alert(msg || '操作成功')
	},
	//错误提示
	errorTips:function(msg){
		alert(msg||'error!')
	},
	//字段验证
	varlidate:function(value,type){
		var value = $.trim(value);
		//非空验证
		if('require' === type){
			return !!value;
		}
		//手机验证
		if('phone' === type){
			return /^1\d{10}$/.test(value);
		}
		//邮箱验证
		if('email' === type){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	}, 
	//渲染模板
	renderHtml : function(htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate),
			result	 = template.render(data);
			return result;
	},
	//跳转主页
	goHome : function(){
		window.location.href = './index.html';
	},
};
module.exports = _shop;
