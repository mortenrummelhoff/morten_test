/**
 * Created by mortenrummelhoff on 14/02/16.
 */
var partialHomeController = angular.module('partialHomeController', []);

partialHomeController.controller('PartialHomeController', ['$scope', 'DateExtractor', function ($scope, DateExtractor) {

    $scope.mhrname = "Hello PartialHome - This is the Controller speaking";


    console.log("Calling DateExtractor: " + DateExtractor.getDayExtract(function(response) {
            console.log("Response12: " + response);

            $scope.mhrname = response;
        }));


}]);