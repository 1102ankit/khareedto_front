'use strict';
/**
 *
 * @package: Kharidto
 * @author: Piyush[alltimepresent@gmail.com]
 * @copyright: KharidTo 2016
 *
 */

angular.module('app.routes')

.controller('myCartController', myCartController);

function myCartController($scope, $http, $state, $stateParams, $rootScope, $localStorage, cartService) {

    // Run cartService
    $scope.initData = cartService.start($localStorage.cart);
    $rootScope.$emit("cartModified");

    $scope.data = {
        cart: $scope.initData.cart
    }

    $scope.cartTotal = $scope.initData.cartTotal;
    $scope.totalQuantity = $scope.initData.totalQuantity;


    //Cart Modified Event Handling
    $rootScope.$on("cartModified", function() {
        $scope.data = cartService.object();
        $scope.cartTotal = $scope.data.cartTotal;
        $scope.totalQuantity = $scope.data.totalQuantity;
        $localStorage.cart= $scope.data.cart;
        console.log($scope.data.cart)
    });


    /**
     *
     * @param {OBJECT} product   Contains Selected product on which
     *                           "Add To cart" button is pressed
     * @return {void}     
     * @description Add product to $rootScope.cart variable
     * 
     */

    $scope.addToCart = function(product) {
        cartService.add(product);
        $rootScope.$emit("cartModified");
    }

    $scope.addOneQuantity = function(product) {
        cartService.add(product);
        $rootScope.$emit("cartModified")
    }

    $scope.minusOneQuantity = function(product) {
        cartService.removeQty(product);
        $rootScope.$emit("cartModified")
    }

    $scope.removeFromCart = function(product) {

        cartService.remove(product);
        $rootScope.$emit("cartModified");
    }

    $scope.placeOrder = function() {
        $scope.formError = '';
        $scope.placingOrder = 1;
        $http({
                method: 'post',
                url: baseUrl + 'orders/place',
                data: {
                    form: $scope.formFill,
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

    $scope.calculateTotal = function() {
        var sum = 0;
        var quantity = 0;
        $rootScope.cart.forEach(function(product, key) {
            if (product.addedToCart == 1) {
                quantity = quantity + product.qty;
                sum = sum + (product.qty * product.sprice);
            }
        });
        $rootScope.cartTotal = sum;
        $rootScope.totalQuantity = quantity;
    }

    $scope.sendContact = function() {
        $scope.contact.action = 'Please Wait...';
        $scope.errors = '';
        $http({
                url: baseUrl + 'sendContact',
                method: 'post',
                data: {
                    email: $scope.contact.email,
                    message: $scope.contact.message
                }
            })
            .then(function successCallback() {
                    $scope.contact.sent = 1;
                },
                function errorCallback(response) {
                    $scope.contact.action = "";
                    $scope.contact.failed = 1;
                    $scope.contact.errors = response.data.errors;
                })
    }
};
