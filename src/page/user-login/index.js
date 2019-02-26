require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _shop = require('util/shop.js');
var formError = {
	show: function(errMsg) {
		$('.error-item').show().find('.error-msg').text(errMsg);
	},
	hide: function() {
		$('.error-item').hide().find('.error-msg').text();
	}
};

//登录页逻辑
var page = {
	init: function() {
		this.bindEvent();
	},
	bindEvent: function() {
		var _this = this;
		$('#submit').click(function() {
			_this.submit();
		});
		//回车提交
		$('.user-content').keyup(function(e) {
			if(e.keyCode === 13) {
				_this.submit();
			}
		});
	},
	//提交登录表单
	submit: function() {
		var formData = {
				username: $.trim($('#username').val()),
				password: $.trim($('#userpassword').val()),
			},
			//表单验证结果
			validateResult = this.formValiDate(formData);
		if(validateResult.status) {
			_user.login(formData, function(res) {
				window.location.href = _shop.getUrlParam('redirect') || './index.html'
			}, function(errMsg) {
				formError.show(errMsg);
			});
		} else {
			formError.show(validateResult.msg);
		}
	},
	formValiDate: function(formData) {
		var result = {
			status: false,
			msg: '',


		};
		if(!_shop.validate(formData.username, 'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if(!_shop.validate(formData.password, 'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		//t通过验证
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
};
$(function() {
	page.init();
});