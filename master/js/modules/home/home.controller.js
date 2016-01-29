'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('app.routes').controller('HomeController', HomeController);

   function HomeController( $scope, $http, $state, $stateParams ) {

    $scope.load = function(){
      $http({
            method: 'GET',
            url: '../products',
        })
        .then(function successCallback(response) {

            console.log(response);

         }, function errorCallback(response) {
                $scope.error = response.data;
                $scope.products = [];
        });

    }    
};