
app.config(function($stateProvider, $urlRouterProvider, $locationProvider){

    $urlRouterProvider.otherwise('/');
    
 
    $stateProvider
    .state('app',{
        url: '/',
        views: {
            'navbar': {
                templateUrl: 'views/layouts/navbar.html',
                controller:  'NavbarController',
            },
            'content': {
                templateUrl: 'views/pages/home.html' ,
                // controller:  'HomePageController',
            },
            'footer': {
                templateUrl: 'views/layouts/footer.html'
            },
            'popups':{
                templateUrl: 'views/layouts/popups.html',
                controller:  'PopupController'
            },
        }
    })

    .state('app.category', {
        url: ':slug?sub',
        views: {
            'content@': {
                templateUrl: 'views/pages/category.html',
                controller:  'categoryController'
            }
        }
     })

    // route without controller
    .state('app.cancellations', {
        url: 'cancellations',
        views: {
            'content@': {
                templateUrl: 'views/staticpages/cancellations.html',
            }
        }
     })
 
    .state('app.terms', {
        url: 'terms',
        views: {
            'content@': {
                templateUrl: 'views/staticpages/terms.html',
            }
        }
 
    })
    
    .state('app.about', {
        url: 'about',
        views: {
            'content@': {
                templateUrl: 'views/staticpages/aboutus.html',
            }
        }
 
    })

    .state('app.privacy', {
        url: 'privacy',
        views: {
            'content@': {
                templateUrl: 'views/staticpages/privacy.html',
            }
        }
 
    })

    .state('app.coupons', {
        url: 'coupons',
        views: {
            'content@': {
                templateUrl: 'views/staticpages/couponspartners.html',
            }
        }
 
    })

    $locationProvider.html5Mode(true);
    // .state('app.subscribers', {
    //     url: 'subscribers',
    //     views: {
    //         'content@': {
    //             templateUrl: 'views/pages/subscribers.html',
    //             controller: 'SubscriberController'      
    //         }
    //     }
 
    // })
    // .state('app.subscribers.detail', {
    //     url: '/:id',
    //     /*
    //     templateUrl: 'views/partials/subscriber-detail.html',
    //     controller: 'SubscriberDetailController'
    //     */
 
    //     views: {
    //         'detail@app.subscribers': {
    //             templateUrl: 'views/partials/subscriber-detail.html',
    //             controller: 'SubscriberDetailController'        
    //         }
    //     }
 
    // });


   
 
});
