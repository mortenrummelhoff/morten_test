/**
 * Created by mortenrummelhoff on 18/02/16.
 */
var pioneerController = angular.module('pioneerController', []);
pioneerController.controller('PioneerController', ['$scope', 'PioneerService',  function($scope, PioneerService) {

    console.log("Here's the PioneerController speaking");

    $scope.powerStatus = false;


    PioneerService.getPowerStatus(function(response) {
        $scope.powerStatus = response;
    });


    $scope.$watch('powerStatus', function() {

        console.log("PowerStatus switch changed: " + $scope.powerStatus);
        PioneerService.setPowerStatus($scope.powerStatus, function(response) {

        });

    });

}]);