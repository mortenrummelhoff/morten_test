/**
 * Created by mortenrummelhoff on 17/02/16.
 */
var mortenAppConfig = angular.module('mortenAppConfig', []);
mortenAppConfig.run(function($rootScope) {


    $rootScope.raspberryHost = "http://192.168.0.50:8080";
    $rootScope.host = "http://localhost:8080";

});