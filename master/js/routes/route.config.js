/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider','RouteHelpersProvider', '$urlRouterProvider'];
    function routesConfig($stateProvider, $locationProvider, helper, $urlRouterProvider){

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/app/index');



        //
        // Application Routes
        // -----------------------------------
        $stateProvider
          .state('app', {
              url: '/app',
              abstract: true,
              templateUrl: helper.basepath('pages/app.html'),
              // resolve: helper.resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl')
          })






          // eCommerce
          // -----------------------------------
          .state('app.index', {
              url: '/index',
              title: 'Home',
              templateUrl: helper.basepath('pages/home.html'),

          })


    } // routesConfig

})();

