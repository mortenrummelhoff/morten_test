/**
 * Created by mortenrummelhoff on 16/02/16.
 */
var dateExtractorService = angular.module("dateExtractorService", []);

dateExtractorService.factory("DateExtractor", function($http) {

    var factory = {};

    factory.getDayExtract = function (callback) {
        //return "getDayExtract return value";

        console.log("getDayExtract ..... called");

        $http.get("http://192.168.0.50:8080/dates/extractions/2016/02/16/2017/02/16").then(function(response)  {
            console.log("Days: " + response.data);

            callback(response.data);
        });
    };

    return factory;

});
