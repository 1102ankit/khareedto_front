'use strict'


app.factory('HomePage',['$http', '$rootScope','CONFIG', function ( $http, $rootScope, CONFIG )
{

	var getCategories = function()
	{
		return $http.get(CONFIG.baseUrl + 'categories',{
    	});

	}

	var getProducts = function(regionId)
	{
		return $http.get(CONFIG.baseUrl + 'home?region_id='+regionId,{
    	});
	}

	var getCategoryProduct = function(data)
	{

		return $http.get(CONFIG.baseUrl + 'categories/'+data.categorySlug +'/'+data.subcategorySlug +'?region_id='+ $rootScope.regionId,{
    	});
	}

	return {
		getCategories: getCategories,
		getProducts: getProducts,
		getCategoryProduct: getCategoryProduct
	}


}])
