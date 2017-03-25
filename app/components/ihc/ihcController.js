/**
 * Created by mortenrummelhoff on 14/03/16.
 */
var ihcController = angular.module('ihcController', []);

ihcController.controller('IhcController', ['$scope', 'IhcWebSocketService', 'IhcService', '$timeout', function ($scope, IhcWebSocketService, IhcService, $timeout) {

    var initializing = true;

    $scope.receivedMessage = "";
    $scope.kitchenLight = false;


    $scope.slider = {
        value: 0,
        options: {
            floor: 0,
            ceil: 100,
            showSelectionBar: false,
            hideLimitLabels: true,
            showSelectionBarFromValue: null,
        }
    };



    $scope.sendTest = function() {
        console.log("sendTest called");

        IhcWebSocketService.send("Hophop");
    };


    IhcWebSocketService.receive().then(null, null, function(message) {
        console.log("received Message: " + JSON.stringify(message));
        $scope.receivedMessage = message;

        $scope.slider.value = message.message.value;


        kitchenLightListener();

        if ($scope.slider.value !== 0) {
            $scope.kitchenLight = true;
        }
        else {
            $scope.kitchenLight = false;
        }
        initializing = true;
        kitchenLightListener = $scope.$watch('kitchenLight', kitchenLightWatcher);


    });

    IhcService.getLightEventData(function(callback) {
        console.log("LightEvent data: " + callback[0].date + ", " + callback[0].name);
        console.log("LightEvents array length: " + callback.length);

        $scope.kitchenLightData = callback;


    });
    //console.log("LightEvent Data: " + IhcService.getLightEventData());

    console.log("WebsocketConnected: " + IhcWebSocketService.isConnected());

    if (IhcWebSocketService.isConnected()) {
        //get Kitchen light status
        var dataMessage = {
            "resource_method" : "GET",
            "resource_type": "KITCHEN"};

        IhcWebSocketService.send(dataMessage);
    }

    IhcWebSocketService.waitForConnect(function(callback) {
        console.log("Now we are connected to Websocket....");

        console.log("WebsocketConnected: " + IhcWebSocketService.isConnected());

        //get Kitchen light status
        var dataMessage = {
            "resource_method" : "GET",
            "resource_type": "KITCHEN"};

        IhcWebSocketService.send(dataMessage);

    });

    $scope.$on("slideEnded", function() {
        // user finished sliding a handle
        console.log("User Changed Sliding: " + $scope.slider.value);


        var dataMessage = {
            "resource_method" : "SET",
            "resource_type": "KITCHEN",
            "value": $scope.slider.value};

        IhcWebSocketService.send(dataMessage);
    });

    var kitchenLightWatcher = function() {
        if (initializing) {
            console.log("Initializing, skipping kitchenLight change");
            $timeout(function() { initializing = false; });
        }
        else {
            console.log("KicthenLight switch changed: " + $scope.kitchenLight);

            var dataMessage = {
                "resource_method" : "SET",
                "resource_type": "KITCHEN",
                "value": $scope.kitchenLight ? 100 : 0};

            IhcWebSocketService.send(dataMessage);

        }
    };

    var kitchenLightListener = $scope.$watch('kitchenLight', kitchenLightWatcher);

}]);