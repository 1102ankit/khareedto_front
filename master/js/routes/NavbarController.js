
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
