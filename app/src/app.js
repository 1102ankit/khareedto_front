/*!
 *
 * SmartApp - SmartTrolley Web Application
 *
 * Version: 1.0.0
 * Author: @meSingh9, @lokendra
 * Website: http://www.thesmarttrolley.com
 *
 */

app = angular.module('SmartApp', ['ui.router','ui.bootstrap' ,'ngAnimate' ,'ngStorage'])

app.run(["$rootScope", "$state", "$stateParams", '$window', '$location','$localStorage', 'HomePage',
  function(
    $rootScope, $state, $stateParams, $window,  $location, $localStorage, HomePage) {

    // Set reference to access them from any scope
    $rootScope.rupee = 'Rs';
    $rootScope.regionId = 95;
    $rootScope.regionName = 'Cyber City, Gurgaon';
    	

    if(typeof $localStorage.SMARTTROLLEY === 'undefined')
    {
    	var SmartTrolley = 
    	{
	    	total: '0.00',
	    	information:'',
	    	products:[]
    	}

    	$localStorage.SMARTTROLLEY = SmartTrolley;
    }

   	var SmartTrolley = $localStorage.SMARTTROLLEY;
    $rootScope.subTotalAmount = SmartTrolley.total;
    $rootScope.savedProducts = SmartTrolley.products;
    $rootScope.information = SmartTrolley.information;

	    (function getCategoriesDetail()
	    {
	    	HomePage.getCategories()
	    	.success(function(data) {
	    		$rootScope.categories = data.data;
				// console.log(data);
			})
			.error(function(reason, status) 
			{
			}).finally(function() {});
	    })();

	    (function getProducts()
	    {
	    	var regionId = 95;
	    	HomePage.getProducts(regionId)
	    	.success(function(data)
	    	{
	    		$rootScope.HomeProducts =  data.data;
	    		console.log($rootScope.HomeProducts)
	    		var dataLength  = $rootScope.HomeProducts.length;
	    		var SavedDataLength = $rootScope.savedProducts.length;
	    		if(SavedDataLength>0)
	    		{
		    		for( var i = 0; i < dataLength; i++)
		    		{	
		    			
		    			var productsLength = $rootScope.HomeProducts[i].products.length;
		    			for (var j = 0; j < productsLength; j++)
		    			{
		    				for( var k = 0; k < SavedDataLength; k++ )
			    			{
			    				if($rootScope.HomeProducts[i].products[j].id == $rootScope.savedProducts[k].id)
			    				{
			    					$rootScope.HomeProducts[i].products[j].isSaved = true;
			    					$rootScope.HomeProducts[i].products[j].qt = $rootScope.savedProducts[k].qt;
			    					break;
			    				}
			    			}
			    			if(!($rootScope.HomeProducts[i].products[j].hasOwnProperty('isSaved')))
			    			{
			    				$rootScope.HomeProducts[i].products[j].isSaved = false;
			    			}
		    			}	
		    		}
		    	}
			})
			.error(function(reason, status) 
			{
			}).finally(function() {});

	    })();

	    (function()
	    {
	        var css = document.createElement('link');
	        css.href = 'https://cdn.jsdelivr.net/fontawesome/4.5.0/css/font-awesome.min.css';
	        css.rel = 'stylesheet';
	        css.type = 'text/css';
	        document.getElementsByTagName('head')[0].appendChild(css);
	    })();

	    function addToCartDetail(event, product)
	    {
	        var productCart = $(event.target).parent().parent();
	        productCart.find('.inCart').css('display', 'block');
	        productCart.find('.addToCart').css('display', 'none');
    	}
  	}

  ]);


app.constant('CONFIG', {
  'baseUrl': 'http://staging-api.thesmarttrolley.com/apps/smartapp/web/v1/'
});
