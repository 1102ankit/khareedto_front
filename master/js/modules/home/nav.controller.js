'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('app.routes').controller('NavController', NavController);

   function NavController( $scope, $http, $state, $stateParams,$rootScope, cartService ) {

    $scope.data = cartService.object();
    $scope.cartTotal = $scope.data.cartTotal;
    $scope.totalQuantity = $scope.data.totalQuantity;

    $rootScope.$on("cartModified" , function(){
        $scope.data = cartService.object();
        $scope.cartTotal = $scope.data.cartTotal;
        $scope.totalQuantity = $scope.data.totalQuantity;
    });


    $scope.init = function()
    {
        $scope = $rootScope;
    }

    $scope.print = function(){
        console.log($rootScope.cart);
    }

    $scope.removeProduct = function(key){
    	console.log(key);

    	console.log($rootScope.cart.splice(key,1));


    }


};