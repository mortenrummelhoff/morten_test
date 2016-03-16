var mortenApp = angular.module('mortenApp', [

    //config
    'mortenAppConfig',

    //services
    'dateExtractorService',
    'pioneerService',
    'ihcWebSocketService',

    //modules
    'ui.router',
    'frapontillo.bootstrap-switch',
    'rzModule',

    //controllers
    'partialHomeController',
    'pioneerController',
    'ihcController'

]);

