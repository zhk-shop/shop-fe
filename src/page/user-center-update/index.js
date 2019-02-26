require('page/common/nav/index.js');
require('./index.css');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _shop = require('util/shop.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string')
var page = {
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function() {
		//初始化左侧菜单
		navSide.init({
			name: 'user-center'
		});
		//加载用户信息
		this.loadUserInfo();
	},
	bindEvent : function(){
		var _this = this;
		//完成按钮逻辑
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				phone : $.trim($('#phone').val()),
				email : $.trim($('#email').val()),
				question : $.trim($('#question').val()),
				answer : $.trim($('#answer').val()),
			},
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				_user.updateUserInfo(userInfo,function(res, msg){
					_shop.successTips(msg);
					window.location.href = './user-center.html';
				},function(errMsg){
					_shop.errorTips(errMsg);
				});
			}else{
				_shop.errorTips(validateResult.msg);
			}
		});
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _shop.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml)
		},function(errMsg){
			_shop.errorTips(errMsg)
		})
	},
	//验证字段信息
	validateForm : function(formData){
		var result = {
			status: false,
			msg: '',
		};
		if(!_shop.validate(formData.phone, 'phone')) {
			result.msg = '手机号格式不正确';
			return result;
		}
		if(!_shop.validate(formData.email, 'email')) {
			result.msg = '邮箱格式不正确';
			return result;
		}
		if(!_shop.validate(formData.question, 'require')) {
			result.msg = '密码提示问题不能为空';
			return result;
		}
		if(!_shop.validate(formData.answer, 'require')) {
			result.msg = '密码提示问题答案不能为空';
			return result;
		}
		//通过验证
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
};
$(function() {
	page.init();
});