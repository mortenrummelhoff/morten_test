var mortenApp = angular.module('mortenApp', [

    //config
    'mortenAppConfig',

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