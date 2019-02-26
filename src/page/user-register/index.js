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

//注册页逻辑
var page = {
	init: function() {
		this.bindEvent();
	},
	bindEvent: function() {
		var _this = this;
		 //验证用户名
		 $('.username').blur(function(){
		 	var username = $.trim($(this).val());
		 	if(!username){
		 		return;
		 	}
		 	//异步验证
		 	_user.checkUsername(username,function(res){
		 		formError.hide();
		 	},function(errMSg){
		 		formError.show(errMSg);
		 	})
		 });
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
				passwordConfirm: $.trim($('#userpassword-confirm').val()),
				phone: $.trim($('#phone').val()),
				email: $.trim($('#email').val()),
				question: $.trim($('#question').val()),
				answer: $.trim($('#answer').val()),
				
			},
			//表单验证结果
			validateResult = this.formValiDate(formData);
		if(validateResult.status) {
			_user.register(formData, function(res) {
				window.location.href = './result.html?type=register'
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
		if(formData.password.length < 6 ) {
			result.msg = '密码长度不能小于6位';
			return result;
		}
		if(formData.password !== formData.passwordConfirm ) {
			result.msg = '两次输入密码不一致';
			return result;
		}
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
		//t通过验证
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
};
$(function() {
	page.init();
});