var _shop = require('util/shop.js');

var _payment = {
	// 支付信息
	getPaymentInfo: function(orderNumber,resolve, reject) {
		_shop.request({
			url: _shop.getServerUrl('/order/pay.do'),
			data:{
				orderNo : orderNumber
			},
			success: resolve,
			error: reject
		});
	},
	//获取订单状态
	getPaymentStatus: function(orderNumber,resolve, reject){
		_shop.request({
			url: _shop.getServerUrl('/order/query_order_pay_status.do'),
			data:{
				orderNo : orderNumber
			},
			success: resolve,
			error: reject
		});
	}
}
module.exports = _payment;