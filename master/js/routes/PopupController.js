'use strict';

app.controller( 'PopupController', ['$rootScope', '$scope', '$window',

	 function($rootScope, $scope, $window)
	 {

	 	var w = $('.cart-box').width();
	 	var h = screen.height;
	 	console.log(screen.height, 'screen.height')
	 	console.log(h,'height')
    	$('.cart-box').css('right', -w)
    	$('.cart-products').css('max-height',h-280);
	 	$scope.closePopup = function()
	 	{
	 		var target = angular.element(document.querySelector('#location-popup'));
        	target.removeClass('visible active');
        	return false;
	 	}

	 	$scope.removeItemFromCart = function( index )
	 	{

	 		$rootScope.savedProducts.splice(index, 1);

	 	}

	}

])
