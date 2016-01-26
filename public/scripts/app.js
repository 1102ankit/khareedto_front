

app = angular.module('Creators', [
	'app.core'
	]);



(function() {
    'use strict';

    angular
        .module('app.core', [
            'ui.router',
            'ui.bootstrap',
            'ngAnimate' ,
            'ngStorage',
            'cfp.loadingBar',

        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider){

      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;

      // Disables animation on items with class .ng-no-animation
      $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

    }

})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('CONFIG', {
          'baseUrl':     'http://'
        })
      ;

})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window'];
    
    function appRun($rootScope, $state, $stateParams, $window) {
      
      // Set reference to access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$storage = $window.localStorage;

      // Uncomment this to disable template cache
      /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if (typeof(toState) !== 'undefined'){
            $templateCache.remove(toState.templateUrl);
          }
      });*/

      // cancel click event easily
      $rootScope.cancel = function($event) {
        $event.stopPropagation();
      };

      // Hooks Example
      // ----------------------------------- 

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function(event, unfoundState/*, fromState, fromParams*/) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
      // Hook error
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
        });
      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function(/*event, toState, toParams, fromState, fromParams*/) {
          // display new view from top
          $window.scrollTo(0, 0);
          // Save the route title
          $rootScope.currTitle = $state.current.title;
        });

      // Load a title dynamically
      $rootScope.currTitle = $state.current.title;
      $rootScope.pageTitle = function() {
        var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        document.title = title;
        return title;
      };      

    }

})();



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
