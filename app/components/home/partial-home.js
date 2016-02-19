/**
 * Created by mortenrummelhoff on 14/02/16.
 */
var partialHomeController = angular.module('partialHomeController', []);

partialHomeController.controller('PartialHomeController', ['$scope', 'DateExtractor', function ($scope, DateExtractor) {

    $scope.mhrname = "Hello PartialHome - This is the Controller speaking";

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;

    $scope.d1 = today;
    $scope.d2 = today;

    $scope.totalDays = 0;
    $scope.calc = function() {
        console.log("Calculate called, Date1: " + $scope.d1 +  ", Date2: " + $scope.d2);

        var date1Array = $scope.d1.split("-");
        var date2Array = $scope.d2.split("-");

        DateExtractor.getDayExtract(date1Array[0], date1Array[1], date1Array[2], date2Array[0], date2Array[1], date2Array[2], function(response) {
            $scope.totalDays = response;
        });

    };

}]);