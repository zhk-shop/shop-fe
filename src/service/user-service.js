var _shop = require('util/shop.js');
var _user = {
	//登出
	logout: function(resolve, reject) {
		_shop.request({
			url: _shop.getServerUrl('/user/logout.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	//检查登陆
	checkLogin: function(resolve, reject) {
		_shop.request({
			url: _shop.getServerUrl('/user/get_user_info.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	},

}
module.exports = _user;