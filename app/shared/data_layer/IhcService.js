var ihcService = angular.module("ihcService", []);

ihcService.factory("IhcService", function($http, $rootScope) {

    console.log("This this new IhcService Angular");

    var host = $rootScope.host;
    var endpoint = "/api/ihc/";

    var factory = {};

    factory.getLightEventData = function(callback) {
        var url = host + endpoint + "data/lightevents";
        $http.get(url).then(function (response) {
            callback(response.data);
        });
    };

    return factory;

});
