var _shop = require('util/shop.js');
var _product = {
	//获取商品信息
	getProductList: function(listParam, resolve, reject) {
		_shop.request({
			url: _shop.getServerUrl('/product/list.do'),
			data: listParam,
			success: resolve,
			error: reject
		})
	},
	//获取商品详细信息
	getProductDetail: function(productId, resolve, reject) {
		_shop.request({
			url: _shop.getServerUrl('/product/detail.do'),
			data: {
				productId: productId
			},
			success: resolve,
			error: reject
		});
	}

}
module.exports = _product;