var mortenApp = angular.module('mortenApp', [

    //services
    'ui.router',
//    'http',
    'dateExtractorService',
    'pioneerService',
    'frapontillo.bootstrap-switch',

    //controllers
    'partialHomeController',
    'pioneerController'


]);