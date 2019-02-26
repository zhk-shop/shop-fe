require('page/common/nav/index.js');
require('./index.css');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./banner.string');
var _shop = require('util/shop.js');

$(function(){
	
	//引入banner
	var bannerHtml = _shop.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
	var $slider = $('.banner').unslider({
		dots: true
	});
	//slider事件
	$('.banner-con .banner-arrow').click(function(){
		var forward = $(this).hasClass('prev') ? 'prev' : 'next';
		$slider.data('unslider')[forward]();
	})
});