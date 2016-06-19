angular.module('app.routes')

	.factory('cartService',[ '$rootScope', '$localstorage', function() {

	var cart = [];
	var empty = 0;

	var inCart = [];

	var total = 0;

	var totalQty = 0;

	var init = function(){

		if( !NaN($localstorage.cart) )
			cart = JSON.parse($localstorage.cart);
		else
			cart = [];

		if(!cart.length)
		{
			empty = 1;
			return false;
		}

		cart.forEach(function(product, index){

			if(element.qty > 0)
			{
				inCart.push(product);

				total += product.qty * product.sprice;

				totalQty += product.qty;
			}

		});

		$rootScope.cart = cart;
		$rootScope.cartTotal = total;
		$rootScope.totalQuantity = totalQty;

		$rootScope.cart.findIndex = function(search){
			var found = -1;
			$rootScope.cart.forEach(function(product, index){

				if(product.code == search.code)
					found = index;

			});

			return found;
		}

	}

	init();

	return {

		add: function(product){
			var index = $rootScope.cart.findIndex(product);
			if(index == -1)
				$rootScope.cart.push(product);
			else{
				$rootScope.cart[index].qty += 1;

				$rootScope.totalQuantity += 1;
				$rootScope.cartTotal += product.sprice;
			}

		},

		removeQty: function(product){
			var index = $rootScope.cart.findIndex(product);
			if(index == -1)
				return;
			else
			{
				if($rootScope.cart[index].qty == 1)
					$rootScope.cart.slice(index,1);
				else
					$rootScope.cart[index].qty -= 1;

				$rootScope.totalQuantity -= 1;
				$rootScope.cartTotal -= product.sprice;
			}

		},

		remove: function(product){
			var index = $rootScope.cart.findIndex(product);
			$rootScope.slice(index,1);

		}

	}


}]);