/**
 * Created by mortenrummelhoff on 18/02/16.
 */
var pioneerController = angular.module('pioneerController', []);
pioneerController.controller('PioneerController', ['$scope', '$timeout', 'PioneerService', '$rootScope',
    function($scope, $timeout, PioneerService, $rootScope) {

        console.log("Here's the PioneerController speaking");

        var initializing = true;

        $scope.powerStatus = false;
        $scope.mode = "";

        $scope.volumen = $rootScope.volumen;

        PioneerService.getPowerStatus(function(response) {

            console.log("PowerStatus : " + response);

            $scope.powerStatus = response;
        });


        function getModeStatus() {
             PioneerService.getMode(function(response) {
                 console.log("Mode Status: " + response);
               $scope.mode = response;
             });
        }


        $scope.setMode = function(mode) {
            console.log("Setting mode:" + mode);
            PioneerService.setMode(mode);
            $scope.mode = mode;
        };


        if ($scope.powerStatus) {
            getModeStatus();
        }

        $scope.$watch('powerStatus', function() {
        console.log("PowerStatus switch changed: " + $scope.powerStatus);

        if (initializing) {
            console.log("Initializing, skipping powerStatus change");
            $timeout(function() { initializing = false; });
        }
        else {
            PioneerService.setPowerStatus($scope.powerStatus, function(response) {
                $timeout(getModeStatus, 5000);
            });
        }
    });

}]);