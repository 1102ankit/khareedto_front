'use strict';
/**
 *
 * @package: Kharidto
 * @author: Piyush[alltimepresent@gmail.com]
 * @copyright: KharidTo 2016
 *
 */

angular.module('app.routes')

.factory('cartService', ['$rootScope', '$localStorage', function($localStorage, $rootScope) {

    var cart = [];
    var empty = 0;

    var inCart = [];

    var total = 0;

    var totalQty = 0;

    var findIndex = function(search) {
        var found = -1;
        inCart.forEach(function(product, index) {

            if (product.code == search.code)
                found = index;

        });

        return found;
    }

    return {

        start: function(data) {
            cart = [];

            if (data)
                cart = data;

            if (cart.length)
                cart.forEach(function(product, index) {
                    if (product.qty > 0) {
                        inCart.push(product);

                        total += product.qty * product.sprice;

                        totalQty += product.qty;
                    }

                });



            return {
                cart: inCart,
                cartTotal: total,
                totalQuantity: totalQty
            };
        },

        object: function() {
            return {
                cart: inCart,
                cartTotal: total,
                totalQuantity: totalQty
            };
        },

        add: function(product) {
            var index = findIndex(product);
            if (index == -1) {
                inCart.push(product);
                totalQty += 1;
                product.qty = 1;
                total += product.sprice;
            } else {
                inCart[index].qty += 1;
                totalQty += 1;
                total += product.sprice;
            }



            $localStorage.cart = JSON.stringify(inCart);

        },

        removeQty: function(product) {
            var index = findIndex(product);
            if (index == -1)
                return;

            else {
                if (inCart[index].qty == 1) {
                    var tempCart = [];

                    inCart.forEach(function(element) {
                        if (element.code !== product.code)
                            tempCart.push(element);
                    });

                    inCart = tempCart;

                } else
                    inCart[index].qty -= 1;

                totalQty -= 1;
                total -= product.sprice;
            }

            $localStorage.cart = JSON.stringify(inCart);

        },

        remove: function(product) {
            var tempCart = [];
            inCart.forEach(function(element) {
                if (element.code !== product.code)
                    tempCart.push(element);
            })

            total -= product.sprice;
            totalQty -= 1;
            inCart = tempCart;

            $localStorage.cart = JSON.stringify(inCart);
        }

    }


}])

.controller('HomeController', HomeController);

function HomeController($scope, $http, $state, $stateParams, $rootScope, $localStorage, cartService) {


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
        phone: ''
    }

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

    // Testing cartService
    // console.log($rootScope.totalQuantity);   

    var init = function() {}


    /**
     *
     * @description Load the products lists from Api and them to AngularJS Model
     *
     */

    $scope.load = function() {

        $http({
                method: 'GET',
                url: baseUrl + 'products',
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

    $scope.resetAddedToCart = function() {
        $rootScope.cart.forEach(function(product) {
            product.addedToCart = 0;
            product.qty = 0;
        });
        $scope.calculateTotal();
        $localStorage.cart = JSON.stringify([]);
        init();
        // JSON.stringify($rootScope.cart);

    }
    $scope.removeFromCart = function(product) {

        cartService.remove(product);
        $rootScope.$emit("cartModified");
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
