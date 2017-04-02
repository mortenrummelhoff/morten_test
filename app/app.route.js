/**
 * Created by mortenrummelhoff on 11/02/16.
 */
mortenApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('  login');

    console.log("Print out console now");

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'app/components/home/partial-home.html',
            controller: 'PartialHomeController'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('pioneer', {
            url: '/pioneer',
            templateUrl: 'app/components/pioneer/pioneer.html',
            controller: 'PioneerController'
            // we'll get to this in a bit
        })
        .state('ihc', {
            url: '/ihc',
            templateUrl: 'app/components/ihc/ihc.html',
            controller: 'IhcController'
            // we'll get to this in a bit
        })
        .state('contact', {
            url: '/contact',
            template: '<div class="container text-center"><h4>Here is the contact page</h4></div>'
            // we'll get to this in a bit
        })
        .state('login', {
            url: '/login',
            controller: 'LoginController',
            templateUrl: 'app/components/security/login.html'
        })
        .state('logout', {
            url: '/login',
            controller: function(AuthenticationService, $route) {
                AuthenticationService.ClearCredentials();
                $route.reload();

            }
        })


    ;

});