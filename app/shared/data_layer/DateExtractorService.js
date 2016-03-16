/**
 * Created by mortenrummelhoff on 16/02/16.
 */
var dateExtractorService = angular.module("dateExtractorService", []);

dateExtractorService.factory("DateExtractor", function($http, $rootScope) {

    var raspberryHost = $rootScope.raspberryHost;
    var dateExtractorEndpoint = "/dates/extractions";

    var factory = {};

    factory.getDayExtract = function (y1, m1, d1, y2, m2, d2, callback) {

        if (!y1 || !m1 || !d1 || !y2 || !m2 || !d2) {
            console.log("missing values");
            callback('Missing values. Please set all dates parameters');
        }
        else {
            var url = raspberryHost + dateExtractorEndpoint + "/" + y1 + "/" + m1 + "/" + d1 + "/" + y2 + "/" + m2 + "/" + d2;

            $http.get(url).then(function (response) {
                console.log("Days: " + response.data);
                callback(response.data);
            });
        }
    };

    return factory;

});
