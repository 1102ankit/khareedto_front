
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
