/**
 * Created by mortenrummelhoff on 11/02/16.
 */
mortenApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    console.log("Print out console now");

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'app/components/home/partial-home.html',
            controller: 'PartialHomeController'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            template: '<h2>Here is the about page</h2>'
            // we'll get to this in a bit
        })
        .state('contact', {
            url: '/contact',
            template: '<div class="container text-center"><h4>Here is the contact page</h4></div>'
            // we'll get to this in a bit
        })



    ;

});