/**
 * Created by mortenrummelhoff on 17/02/16.
 */
var mortenAppConfig = angular.module('mortenAppConfig', []);
mortenAppConfig.run(function($rootScope) {


    $rootScope.host = "http://localhost:8080";

    $rootScope.volumen = 0;

});