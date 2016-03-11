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

    // Cart Total
    $rootScope.cartTotal = 0;
    $rootScope.totalQuantity = 0;

    // Products List
    $scope.products = {};

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
 * @param {OBJECT} product   Contains Selected product on which
 *                           "Add To cart" button is pressed
 * @return {void}     
 * @description Add product to $rootScope.cart variable
 * 
 */

    $scope.addToCart = function(product){
        if(product.addedToCart == 1)
            return;
        // Clearing any form error
        $scope.formError = '';
        $scope.orderPlaced = 0;
        $scope.checkoutMessage = '#Order';

        $rootScope.cart.push({
                    code:  product.product.code,
                    qty: 1,
                    name:product.product.name,
                    image: product.product.image,
                    sp: (product.price - product.discount)
                });
        product.addedToCart = 1;
        $scope.calculateTotal();

    }

    $scope.addOneQuantity = function(product)
    {
            product.qty++;
            $scope.calculateTotal();
    }

    $scope.minusOneQuantity = function(product)
    {
        if(product.qty > 1)
        {
            product.qty--;
            $scope.calculateTotal();
        }

    }

    $scope.resetAddedToCart = function(){
        $scope.products.forEach(function(element,key){
            element.addedToCart = 0; 
        });
    }
    $scope.removeFromCart = function(product){

        $scope.products.forEach(function(element){
            if(element.product.code == product.code)
                element.addedToCart = 0;
        })
        $rootScope.cart.forEach(function(element,key){
            if(product.code == element.code)
                $rootScope.cart.splice(key,1);
        })
        $scope.calculateTotal();
    }
    /**
     * [placeOrder description]
     * @return {[type]} [description]
     */
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
            $scope.calculateTotal();
            $scope.resetAddedToCart();


         }, function errorCallback(response) {
                $scope.formError = response.data;
                console.log(response.data);
                $scope.placingOrder = 0;

        });
    }

    $scope.calculateTotal = function(){
        sum = 0;
        quantity = 0;
        $rootScope.cart.forEach(function(product,key){
            quantity = quantity + product.qty;
            sum = sum + (product.qty * product.sp);
        });
        $rootScope.cartTotal = sum;
        $rootScope.totalQuantity = quantity;
    }
};

