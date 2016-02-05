'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('app.routes').controller('NavController', NavController);

   function NavController( $scope, $http, $state, $stateParams,$rootScope ) {

    $scope.init = function()
    {
        $scope = $rootScope;
    }

    $scope.print = function(){
        console.log($rootScope.cart);
    }
};