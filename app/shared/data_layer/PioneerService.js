/**
 * Created by mortenrummelhoff on 20/02/16.
 */
var pioneerService = angular.module("pioneerService", []);

pioneerService.factory("PioneerService", function($http) {

    var host = "http://localhost:8080";
    var endpoint = "/api/pioneer/";

    var factory = {};

    factory.getPowerStatus = function(callback) {
        var url = host + endpoint + "power";
        $http.get(url).then(function (response) {
            console.log("Power Status: " + response.data);
            callback(response.data);
        });
    };

    factory.setPowerStatus = function(powerOn, callback) {
        var url = host + endpoint + "power?on=" + powerOn ;
        $http.put(url).then(callback);
    };

    return factory;

});