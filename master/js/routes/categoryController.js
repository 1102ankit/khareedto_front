'use strict'

app.controller('categoryController', ['$rootScope', '$scope', '$state', '$stateParams', 'HomePage',

	function($rootScope, $scope, $state, $stateParams, HomePage)
	{	

		(function getProductThroghSlug()
		{

			var data = {
				categorySlug: $stateParams.slug,
				subcategorySlug: $stateParams.sub === undefined ? '' : $stateParams.sub
			}
			HomePage.getCategoryProduct(data)
	    	.success(function(data) {
				var result = data.data;
				$scope.category = result.category;
				$scope.subCategory = typeof result.category.sub_categories === 'undefined'? '': result.category.sub_categories;
				$scope.products = result.products;
				$scope.isProducts = $scope.products.length;
				var productsLength = $scope.products.length;
				var SavedDataLength = $rootScope.savedProducts.length;
    			for (var j = 0; j < productsLength; j++)
    			{
    				for( var k = 0; k < SavedDataLength; k++ )
	    			{
	    				if($scope.products[j].id == $rootScope.savedProducts[k].id)
	    				{
	    					$scope.products[j].isSaved = true;
	    					$scope.products[j].qt = $rootScope.savedProducts[k].qt;
	    					break;
	    				}
	    			}
	    			if(!($scope.products[j].hasOwnProperty('isSaved')))
	    			{
	    				$scope.products[j].isSaved = false;
	    			}
    			}	
				
			})
			.error(function(reason, status) 
			{

			}).finally(function() {});
			
		})();

	}

])
