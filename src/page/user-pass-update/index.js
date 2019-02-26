require('page/common/nav/index.js');
require('./index.css');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _shop = require('util/shop.js');
var _user = require('service/user-service.js');
var page = {
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function() {
		//初始化左侧菜单
		navSide.init({
			name: 'user-pass-update'
		});
		
	},
	bindEvent : function(){
		var _this = this;
		//完成按钮逻辑
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				password : $.trim($('#password').val()),
				passwordNew : $.trim($('#password-new').val()),
				passwordConfirm : $.trim($('#password-confirm').val()),
			},
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				_user.updatePassword({
					passwordOrd : userInfo.password,
					passwordNew : userInfo.passwordNew
				},function(res, msg){
					_shop.successTips(msg);
				},function(errMsg){
					_shop.errorTips(errMsg);
				});
			}else{
				_shop.errorTips(validateResult.msg);
			}

        
		});
	},

	//验证字段信息
	validateForm : function(formData){
		var result = {
			status: false,
			msg: '',
		};
		//验证密码
		if(!_shop.validate(formData.password, 'require')) {
			result.msg = '原密码不能为空';
			return result;
		}
		if(!formData.passwordNew || formData.passwordNew.length < 6) {
			result.msg = '请输入一个至少六位的新密码';
			return result;
		}
		if(formData.passwordNew !== formData.passwordConfirm) {
			result.msg = '两次密码输入不一致';
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