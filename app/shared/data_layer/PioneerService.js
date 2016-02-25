/**
 * Created by mortenrummelhoff on 20/02/16.
 */
var pioneerService = angular.module("pioneerService", []);

pioneerService.factory("PioneerService", function($http, $rootScope) {

    var host = $rootScope.host;

    console.log("Host is: " + host);

    var endpoint = "/api/pioneer/";

    var factory = {};

    factory.getPowerStatus = function(callback) {
        var url = host + endpoint + "power";
        $http.get(url).then(function (response) {
            console.log("PowerStatus: " + response.data);
            callback(response.data);
        });
    };

    factory.setPowerStatus = function(powerOn, callback) {
        var url = host + endpoint + "power?on=" + powerOn ;
        $http.put(url).then(callback);
    };

    factory.setMode = function(mode, callback) {
        var url = host + endpoint + "mode?mode=" + mode;
        $http.put(url).then(callback);
    };

    factory.getMode = function(callback) {
        var url = host + endpoint + "mode";
        $http.get(url).then(function (response) {
            console.log("Mode: " + response.data);
            callback(response.data);
        });
    };

    return factory;

});