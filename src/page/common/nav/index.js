require('./index.css');
var _shop = require('util/shop.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var nav = {
	init: function() {
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	},
	bindEvent: function() {
		//登陆点击事件
		$('.js-login').click(
			function() {
				_shop.doLogin();
			}
		);
		//注册点击事件
		$('.js-register').click(
			function() {
				window.location.href = './user-register.html';
			}
		);
		//退出点击事件
		$('.js-logout').click(
			function() {
				_user.logout(
					function(res) {
						window.location.reload();
					},
					function(errMsg) {
						_shop.errorTips(errMsg);
					}
				);
			}
		);
	},
	//加载用户信息
	loadUserInfo: function() {
		_user.checkLogin(
			function(res) {
				$('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
			},
			function(errMsg) {
				
			}
		);
	},
	//加载购物车数量
	loadCartCount: function() {
		_cart.getCartCount(
			function(res) {
				$('.nav .cart-cont').text(res || 0);
			},
			function(errMsg) {
				$('.nav .cart-cont').text(0);
			}
		);
	}
};
module.exports = nav.init();