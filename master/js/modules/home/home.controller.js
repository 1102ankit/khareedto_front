'use strict';
/**
 *
 * @package: Kharidto
 * @author: Piyush[alltimepresent@gmail.com]
 * @copyright: KharidTo 2016
 *
 */

angular.module('app.routes').controller('HomeController', HomeController);

   function HomeController( $scope, $http, $state, $stateParams,$rootScope ) {

    $scope.formError = '';
    $scope.selectedProduct = '';
    $rootScope.cart = [];
    $scope.cartFill = 1;

    // Order Not Placed yet
    $scope.orderPlaced = 0;
    $scope.checkoutMessage = '#Order';

    // Current states
    $scope.placingOrder = 0;

    $scope.formFill = {
        name: '',
        email: '',
        phone:''
    }

/**
 *
 * @description Load the products lists from Api and them to AngularJS Model
 *
 */

    $scope.load = function(){
      $http({
            method: 'GET',
            url: baseUrl+'products',
        })
        .then(function successCallback(response) {

            $scope.products = response.data.data;

         }, function errorCallback(response) {
                $scope.error = response.data;
                $scope.products = [];
        });

    }


/**
 *
 * @param {OBJECT} product   Contains Selected product on 
 *                           "Add To cart" button is pressed
 * @return {void}     
 * @description Add product to $rootScope.cart variable
 * 
 */

    $scope.addToCart = function(product){
        // Clearing any form error
        $scope.formError = '';
        $scope.orderPlaced = 0;
        $scope.checkoutMessage = '#Order';

        var added = 0;
        $rootScope.cart.forEach(function(element,key){
            if(element.code == product.product.code)
                {
                    $rootScope.cart[key].qty += product.qty;
                    // Successfull to add on same product in cart
                    added =1;
                }
        });

        if(added === 0)
        $rootScope.cart.push({
                    code:  product.product.code,
                    qty: product.qty,
                    name:product.product.name});

        // @dev
        console.log($rootScope.cart);

    }

    $scope.placeOrder = function() {
        $scope.formError = '';
        $scope.placingOrder = 1;
        $http({
            method: 'post',
            url: baseUrl+'orders/place',
            data: {
                    form:   $scope.formFill,
                    products: $rootScope.cart
                }
        })
        .then(function successCallback(response) {

            console.log(response);
            $scope.orderPlaced = 1;
            $scope.checkoutMessage = '#ThankYou'
            
            $rootScope.cart = [];
            
            $scope.placingOrder = 0;


         }, function errorCallback(response) {
                $scope.formError = response.data;
                console.log(response.data);
                $scope.placingOrder = 0;

        });
    }
};