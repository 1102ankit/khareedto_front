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


app.config(function($stateProvider, $urlRouterProvider, $locationProvider){

    $urlRouterProvider.otherwise('/');
    
 
    $stateProvider
    .state('app',{
        url: '/',
        views: {
            'navbar': {
                templateUrl: 'views/layouts/navbar.html',
                controller:  'NavbarController',
            },
            'content': {
                templateUrl: 'views/pages/home.html' ,
                // controller:  'HomePageController',
            },
            'footer': {
                templateUrl: 'views/layouts/footer.html'
            },
            'popups':{
                templateUrl: 'views/layouts/popups.html',
                controller:  'PopupController'
            },
        }
    })

    .state('app.category', {
        url: ':slug?sub',
        views: {
            'content@': {
                templateUrl: 'views/pages/category.html',
                controller:  'categoryController'
            }
        }
     })

    // route without controller
    .state('app.cancellations', {
        url: 'cancellations',
        views: {
            'content@': {
                templateUrl: 'views/staticpages/cancellations.html',
            }
        }
     })
 
    .state('app.terms', {
        url: 'terms',
        views: {
            'content@': {
                templateUrl: 'views/staticpages/terms.html',
            }
        }
 
    })
    
    .state('app.about', {
        url: 'about',
        views: {
            'content@': {
                templateUrl: 'views/staticpages/aboutus.html',
            }
        }
 
    })

    .state('app.privacy', {
        url: 'privacy',
        views: {
            'content@': {
                templateUrl: 'views/staticpages/privacy.html',
            }
        }
 
    })

    .state('app.coupons', {
        url: 'coupons',
        views: {
            'content@': {
                templateUrl: 'views/staticpages/couponspartners.html',
            }
        }
 
    })

    $locationProvider.html5Mode(true);
    // .state('app.subscribers', {
    //     url: 'subscribers',
    //     views: {
    //         'content@': {
    //             templateUrl: 'views/pages/subscribers.html',
    //             controller: 'SubscriberController'      
    //         }
    //     }
 
    // })
    // .state('app.subscribers.detail', {
    //     url: '/:id',
    //     /*
    //     templateUrl: 'views/partials/subscriber-detail.html',
    //     controller: 'SubscriberDetailController'
    //     */
 
    //     views: {
    //         'detail@app.subscribers': {
    //             templateUrl: 'views/partials/subscriber-detail.html',
    //             controller: 'SubscriberDetailController'        
    //         }
    //     }
 
    // });


   
 
});


'use strict';

app.controller('NavbarController', ['$rootScope', '$scope', '$timeout', 

  function($rootScope, $scope, $timeout) {

  		// $rootScope.isShowCart = false;
	    $scope.changeLocation = function ()
	    {
	    	var target = angular.element(document.querySelector('#location-popup'));
        	target.addClass('visible active');
        	return false;
	    }
	    
	    $rootScope.showCart = function(isShow) 
	    {	
	    	// if($rootScope.cartShow === true)
	    	// $rootScope.cartShow = isShow;
	    	var target = angular.element(document.querySelector('.cart-box'));
	    	var width = target.width()+53;
	    	console.log(width,'width')
	    	if( isShow )
	    	{
        		// target.addClass('visible active');
        		// target.scrollLeft('54px')
        		console.log('true',isShow)
        		 target.animate({right: "53px" }, 600);
	    	}
	    	// else if($rootScope.cartShow === false && isShow === false)
	    	// {	
	    	// 	return false;	
	    	// }
	    	else
	    	{
	    		console.log('false',isShow)
	    		$timeout(function() {
			        // target.removeClass('visible active');
			         target.animate({right: -width }, 600);
			        // target.scrollLeft(-width)
			    }, 600);	
	    	}
	    }

  }
]);

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


app.directive('ngShowProduct', ['$rootScope','$state', '$localStorage', function($rootScope, $state, $localStorage) {

  return {
    restrict: 'AE',
    scope: {
      productObj:'@productObj'
    },
    templateUrl: 'views/partials/showproduct.html',
    link: function(scope, element, attrs) 
    {
	    try 
        {
	        scope.product = JSON.parse(attrs.productObj);
	    }
        catch (e) 
        {
	        scope.$watch(function()
            {
	           return scope.$parent.$eval(attrs.productObj);
	        }, function(newValue, oldValue)
            {
	           scope.product = newValue;
	        });
	    }

        scope.openProduct = function(product)
        {
            $rootScope.product = product;
            var target = angular.element(document.querySelector('#product-popup'));
            target.addClass('visible active');
        }

        $rootScope.closePopUp = function()
        {
            var target = angular.element(document.querySelector('#product-popup'));
            target.removeClass('visible active');
        }

        scope.addToCart =  function($event, product)
        {  
            var target = angular.element($event.currentTarget);
            target.closest('.product-container').find('.inCart').css('display', 'block');
            target.closest('.product-container').find('.addToCart').css('display', 'none');
            product.qt = 1;
            $rootScope.subTotalAmount = (parseFloat($rootScope.subTotalAmount) + parseFloat(product.price)).toFixed(2);
            $rootScope.savedProducts.push(product);
            setTrolleyToLocalStorage();

        }

        scope.decreaseQt =  function($event, product)
        {   
            var target = angular.element($event.currentTarget).closest('.product-container');
            var count =  parseInt(target.find('.number').html());
            if( count > 1 )
            {
                target.find('.number').html(count-1);
                $rootScope.subTotalAmount = (parseFloat($rootScope.subTotalAmount) - parseFloat(product.price)).toFixed(2);
                var length = $rootScope.savedProducts.length;
                for(var i = 0; i< length; i++)
                {
                    if(product.id === $rootScope.savedProducts[i].id)
                    {
                        $rootScope.savedProducts[i].qt--;
                        break;
                    }
                }
                
            }
            else if( count === 1 )
            {   
                target.find('.inCart').css('display', 'none');
                target.find('.addToCart').css('display', 'block');
                $rootScope.subTotalAmount = (parseFloat($rootScope.subTotalAmount) - parseFloat(product.price)).toFixed(2);
                var length = $rootScope.savedProducts.length;
                for(var i = 0; i< length; i++)
                {
                    if(product.id === $rootScope.savedProducts[i].id)
                    {
                        $rootScope.savedProducts.splice(i, 1);
                        break;
                    }
                }
            }
            else
            {
                return false;
            }

            setTrolleyToLocalStorage();
        }

        scope.increaseQt =  function($event, product)
        {
            var target = angular.element($event.currentTarget).closest('.product-container');
            var count =  parseInt(target.find('.number').html());
            if( count > product.max_order_quantity )
            {
                alert("Sorry!!!, Maximum order limit reached for this product.", 'error');
            }
            else
            {
                target.find('.number').html( count+1 );
                $rootScope.subTotalAmount = (parseFloat($rootScope.subTotalAmount) + parseFloat( product.price )).toFixed(2);
                var length = $rootScope.savedProducts.length;
                for( var i = 0; i < length; i++ )
                {
                    if( product.id === $rootScope.savedProducts[i].id )
                    {
                        $rootScope.savedProducts[i].qt++;
                        break;
                    }
                }
                
            }
            setTrolleyToLocalStorage();
        }

       function setTrolleyToLocalStorage()
       {
            var SmartTrolley = 
                {
                    total: $rootScope.subTotalAmount,
                    information: $rootScope.information,
                    products: $rootScope.savedProducts,
                }
            $localStorage.SMARTTROLLEY = SmartTrolley
       }
    }

  };


}]);

'use strict'

app.service('appServices', ['$http', 'CONFIG', 'HomePage',


	function ( $http, CONFIG ,HomePage)
	{
		
		
	}
])
