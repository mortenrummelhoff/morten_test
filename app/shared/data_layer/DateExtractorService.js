/**
 * Created by mortenrummelhoff on 16/02/16.
 */
var dateExtractorService = angular.module("dateExtractorService", []);

dateExtractorService.factory("DateExtractor", function($http) {

    var raspberryHost = "http://192.168.0.50:8080";
    var dateExtractorEndpoint = "/dates/extractions";

    var factory = {};

    factory.getDayExtract = function (y1, m1, d1, y2, m2, d2, callback) {
        console.log("getDayExtract ..... called: " + y1);

        if (!y1) {
            console.log("y1 not set");
        }

        if (!m1) {
            console.log("m1 not set");
        }

        if (!y1 || !m1 || !d1 || !y2 || !m2 || !d2) {
            console.log("y1 or m1 not set");
        }

        if (!y1 || !m1 || !d1 || !y2 || !m2 || !d2) {
            console.log("missing values");
            callback('Missing Variables. Please set all');
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
