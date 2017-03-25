/**
 * Created by mortenrummelhoff on 18/02/16.
 */
var pioneerController = angular.module('pioneerController', []);
pioneerController.controller('PioneerController', ['$scope', '$timeout', 'PioneerService', '$rootScope',
    function($scope, $timeout, PioneerService, $rootScope) {

        var initializing = true;

        $scope.powerStatus = false;
        $scope.mode = "";

        $scope.slider = {
            value: 0,
            options: {
                floor: 0,
                ceil: 160,
                showSelectionBar: false,
                hideLimitLabels: true,
                showSelectionBarFromValue: null,
            }
        };

        function getModeStatus() {
            PioneerService.getMode(function(response) {
                console.log("Mode Status: " + response);
                $scope.mode = response;
            });
        }

        function getVolumeStatus() {
            PioneerService.getVolume(function(response) {
               console.log("Volume: "+ response.volume);
               $scope.slider.value = response.volume;
            });
        }

        function getPioneerStatus() {
            getModeStatus();
            getVolumeStatus();
        }

        $scope.$on("slideEnded", function() {
            // user finished sliding a handle
            console.log("User Changed Sliding: " + $scope.slider.value);
            PioneerService.setVolume($scope.slider.value);
        });

        PioneerService.getPowerStatus(function(response) {
            console.log("PowerStatus : " + response);
            $scope.powerStatus = response;


            if ($scope.powerStatus) {
                getPioneerStatus();
            }

        });

        $scope.setMode = function(mode) {
            console.log("Setting mode:" + mode);
            PioneerService.setMode(mode);
            $scope.mode = mode;
        };




        $scope.$watch('powerStatus', function() {

            if (initializing) {
                console.log("Initializing, skipping powerStatus change");
                $timeout(function() { initializing = false; });
            }
            else {
                console.log("PowerStatus switch changed: " + $scope.powerStatus);
                PioneerService.setPowerStatus($scope.powerStatus, function(response) {
                    if ($scope.powerStatus) {
                        $timeout(getPioneerStatus(), 3000);
                    }
                });
            }
        });

}]);