var _shop = require('util/shop.js');
var _cart = {
	//获取购物车数量
	getCartCount : function(resolve, reject) {
		_shop.request({
			url: _shop.getServerUrl('/cart/get_cart_product_count.do'),
			success: resolve,
			error: reject
		})
	},
}
module.exports = _cart;