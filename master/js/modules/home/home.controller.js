'use strict';
/**
 *
 * @package: Kharidto
 * @author: Piyush[alltimepresent@gmail.com]
 * @copyright: KharidTo 2016
 *
 */

angular.module('app.routes').controller('HomeController', HomeController);

   function HomeController( $scope, $http, $state, $stateParams,$rootScope, $localStorage ) {

       var init  = function(){
           if($rootScope.cart == null)
           {
               if($localStorage.cart != null)
               {
                   var cart = JSON.parse($localStorage.cart);
                   console.log(cart);
                   console.log($scope.products);
                   cart.forEach(function (element) {
                        $scope.products.forEach(function(product){
                            if((element.code == product.code) && (element.qty >0))
                            {
                                console.log(element)
                                product.addedToCart = 1;
                                product.qty = element.qty;
                            }
                            else if(element.qty <= 0)
                            {                                console.log(element)

                                product.addedToCart = 0;
                                product.qty =0;
                            }
                        })
                   });
                   $rootScope.cart = $scope.products;
                   console.log($rootScope.cart);

                   $scope.calculateTotal();
               }
               else
                   $rootScope.cart= [];
               // $scope.calculateTotal();

           }
           if($rootScope.totalQuantity == null)
               $rootScope.totalQuantity = 0;
           if($rootScope.cartTotal == null)
               $rootScope.cartTotal = 0;

       }



    $scope.formError = '';
    $scope.selectedProduct = '';
    $scope.cartFill = 1;

    // Contact form
    $scope.contact = {
        email: '',
        message: '',
        failed: 0,
        sent: 0
    }


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
            init();

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

        if($rootScope.cart.length > 0) {
            $rootScope.cart.forEach(function(element){
                if (element.code == product.code)
                    element.qty = 1;
            });
        }
        if(product.qty == 0)
            $rootScope.cart.push(product);

        product.addedToCart = 1;
        product.qty =1;

        console.log($rootScope.cart);
        $localStorage.cart = JSON.stringify($rootScope.cart);

        $scope.calculateTotal();
    }

    $scope.addOneQuantity = function(product)
    {
            product.qty++;
            $scope.calculateTotal();
        $localStorage.cart = JSON.stringify($rootScope.cart);

    }

    $scope.minusOneQuantity = function(product)
    {
        if(product.qty > 1)
        {
            product.qty--;
            $scope.calculateTotal();
        }
        $localStorage.cart = JSON.stringify($rootScope.cart);


    }

    $scope.resetAddedToCart = function(){
        // $rootScope.cart.forEach(function(product){
        //     product.addedToCart = 0;
        //     product.qty= 0;
        // });
        // $scope.calculateTotal();
        $localStorage.cart = JSON.stringify("[]");
        init();
        // JSON.stringify($rootScope.cart);

    }
    $scope.removeFromCart = function(product){

        product.addedToCart = 0;
        product.qty =0;
        $localStorage.cart = JSON.stringify($rootScope.cart);

        // $scope.products.forEach(function(element){
        //     if(element.product.code == product.code)
        //         element.addedToCart = 0;
        // })
        // $rootScope.cart.forEach(function(element,key){
        //     if(product.code == element.code)
        //         $rootScope.cart.splice(key,1);
        // })
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
            
            // $rootScope.cart = [];
            
            $scope.placingOrder = 0;
            $scope.calculateTotal();
            $scope.resetAddedToCart();


         }, function errorCallback(response) {
                $scope.formError = response.data.errors;
                console.log(response.data);
                $scope.placingOrder = 0;

        });
    }

    $scope.calculateTotal = function(){
        var sum = 0;
        var quantity = 0;
        $rootScope.cart.forEach(function(product,key){
            if(product.addedToCart == 1) {
                quantity = quantity + product.qty;
                sum = sum + (product.qty * product.sprice);
            }
        });
        $rootScope.cartTotal = sum;
        $rootScope.totalQuantity = quantity;
    }

    $scope.sendContact = function(){
        $scope.contact.action = 'Please Wait...';
        $scope.errors = '';
        $http({
            url:baseUrl+'sendContact',
            method:'post',
            data: {
                email:      $scope.contact.email,
                message:    $scope.contact.message
            }
        })
            .then(function successCallback() {
                $scope.contact.sent = 1;
            },
            function errorCallback(response) {
                $scope.contact.action = "";
                $scope.contact.failed = 1 ;
                $scope.contact.errors = response.data.errors;
            })
    }
};

