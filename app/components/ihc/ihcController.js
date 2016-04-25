/**
 * Created by mortenrummelhoff on 14/03/16.
 */
var ihcController = angular.module('ihcController', []);

ihcController.controller('IhcController', ['$scope', 'IhcWebSocketService', function ($scope, IhcWebSocketService) {

    var initializing = true;

    $scope.receivedMessage = "";
    $scope.kitchenLight = false;



    $scope.sendTest = function() {
        console.log("sendTest called");

        IhcWebSocketService.send("Hophop");
    };


    IhcWebSocketService.receive().then(null, null, function(message) {
        //console.log("received Message: " + JSON.stringify(message));
        $scope.receivedMessage = message;
    });


    }]);