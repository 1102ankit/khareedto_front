'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('app.routes').controller('HomeController', HomeController);

   function HomeController( $scope, $http, $state, $stateParams,$rootScope ) {

    $scope.formError = '';
    $scope.selectedProduct = '';
    $rootScope.cart = [];
    $scope.cartFill = 1;

    $scope.formFill = {
        name: '',
        email: '',
        phone:'',
        product:{
                id: '',
                quantity:  1
            }
    }


    $scope.load = function(){
      $http({
            method: 'GET',
            url: '../api/products',
        })
        .then(function successCallback(response) {

            $scope.products = response.data.data;

         }, function errorCallback(response) {
                $scope.error = response.data;
                $scope.products = [];
        });

    }



    $scope.addToCart = function(product){
        $scope.formError = '';

        $rootScope.cart.push({
                    code:  product.product.code,
                    qty: product.qty,
                    name:product.product.name});

        console.log($rootScope.cart);

    }

    $scope.placeOrder = function() {
        console.log($scope.formFill);
        $http({
            method: 'post',
            url: '../api/orders/place',
            data: $scope.formFill
        })
        .then(function successCallback(response) {

            console.log(response);

         }, function errorCallback(response) {
                $scope.formError = response.data;
                console.log(response.data);
        });
    }
};