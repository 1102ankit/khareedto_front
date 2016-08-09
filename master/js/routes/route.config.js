/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', 'RouteHelpersProvider', '$urlRouterProvider'];

    function routesConfig($stateProvider, $locationProvider, helper, $urlRouterProvider) {

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(true);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/home');



        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            .state('app', {
                url: '',
                abstract: true,
                templateUrl: helper.basepath('pages/app.html'),
                controller: function() {

                    }
                    // resolve: helper.resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl')
            })






        // Index
        // -----------------------------------
        .state('app.index', {
            url: '/home',
            title: 'Home',
            templateUrl: helper.basepath('pages/home.html?v=3'),

        })

        .state('app.privacy', {
            url: '/privacy',
            title: 'Privacy Policy',
            templateUrl: helper.basepath('pages/privacy.html')
        })

        .state('app.aboutus', {
            url: '/aboutus',
            title: 'About Us',
            templateUrl: helper.basepath('pages/aboutus.html')
        })

        .state('app.mycart', {
            url: '/mycart',
            title: 'My Cart',
            templateUrl: helper.basepath('pages/mycart.html')
        })

        .state('app.product', {
            url: '/product/:product',
            title: 'Product',
            templateUrl: helper.basepath('pages/product.html')
        })

    } // routesConfig

})();
