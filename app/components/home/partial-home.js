/**
 * Created by mortenrummelhoff on 14/02/16.
 */
var partialHomeController = angular.module('partialHomeController', []);

partialHomeController.controller('PartialHomeController', ['$scope', 'DateExtractor', function ($scope, DateExtractor) {

    $scope.mhrname = "Hello PartialHome - This is the Controller speaking";

    $scope.d1 = new Date();
    $scope.d2 = new Date();

    $scope.totalDays = 0;
    $scope.calc = function() {
        console.log("Calculate called, Date1: " + $scope.d1 +  ", Date2: " + $scope.d2);

        DateExtractor.getDayExtract($scope.d1.getFullYear(), $scope.d1.getMonth(), $scope.d1.getDate(),
            $scope.d2.getFullYear(), $scope.d2.getMonth(), $scope.d2.getDate(), function(response) {
            $scope.totalDays = response;
        });

    };

}]);