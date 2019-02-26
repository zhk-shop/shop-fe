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

//找回密码页逻辑
var page = {
	data: {
		username: '',
		question: '',
		anwser: '',
		token: '',
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function() {
		this.loadStepUsername();
	},
	bindEvent: function() {
		var _this = this;
		//输入用户名点击验证
		$('#submit-username').click(function() {
			var username = $.trim($('#username').val());
			if(username) {
				_user.getQuestion(username, function(res) {
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				}, function(errMsg) {
					formError.show(errMsg);
				})
			} else {
				formError.show('请输入用户名');
			}
		});
		//密码提示问题点击验证
		$('#submit-question').click(function() {
			var answer = $.trim($('#answer').val());
			//密码提示问题答案
			if(answer) {
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer	 : answer
				}, function(res) {
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadStepPassword();
				}, function(errMsg) {
					formError.show(errMsg);
				})
			} else {
				formError.show('请输入密码提示问题答案');
			}
		});
		//输入新密码点击验证
		$('#submit-password').click(function() {
			var password = $.trim($('#password').val());
			if(password && password.length>=6) {
				_user.resetPassword({
					username : _this.data.username,
					passwordNew : password,
					forgetToken : _this.data.token
				}, function(res) {
					window.location.href = './result.html?type=pass-reset'
				}, function(errMsg) {
					formError.show(errMsg);
				})
			} else {
				formError.show('请输入不少于六位的新密码');
			}
		});
	},

	
	//加载输入用户名
	loadStepUsername: function() {
		$('.step-username').show()
	},
	//加载输入问题答案
	loadStepQuestion: function() {
		formError.hide();
		$('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);

	},
	//加载输入新密码
	loadStepPassword: function() {
		 formError.hide();
		$('.step-question').hide().siblings('.step-password').show()

	}

};
$(function() {
	page.init();
});