/**
 * Created by mortenrummelhoff on 14/03/16.
 */
var ihcWebSocketService = angular.module("ihcWebSocketService", []);

ihcWebSocketService.service('IhcWebSocketService', ['$q', '$rootScope', '$timeout', function($q, $rootScope, $timeout) {

    console.log("Starting angular module for IhcWebSocket Connection");

    var service = {}, listener = $q.defer(), socket = {
        client: null,
        stomp: null
    }, messageIds = [];

    var isConnected = false;

    service.RECONNECT_TIMEOUT = 30000;
    //service.SOCKET_URL = "http://192.168.0.50:8080/chat";
    service.SOCKET_URL = $rootScope.host + "/chat";
    //service.SOCKET_URL = "http://localhost:8080/chat";
    service.CHAT_TOPIC = "/topic/message";
    service.CHAT_BROKER = "/app/chat";

    var connectedListenerCallback;

    service.receive = function() {
        return listener.promise;
    };

    service.send = function(message) {
        console.log("send called. Send: " + message);

        var id = Math.floor(Math.random() * 1000000);
        socket.stomp.send(service.CHAT_BROKER, {
            priority: 9
        }, JSON.stringify({
            message: message,
            id: id
        }));
        messageIds.push(id);
    };

    service.isConnected = function() {
        return isConnected;
    };

    service.waitForConnect = function(callback) {
        connectedListenerCallback = callback;
    };

    var reconnect = function() {
        $timeout(function() {
            initialize();
        }, this.RECONNECT_TIMEOUT);
    };

    var getMessage = function(data) {

        //console.log("getMessage called: " + JSON.stringify(data));

        var message = JSON.parse(data), out = {};
        out.message = message.message;
        out.time = new Date(message.time);

        if (_.contains(messageIds, message.id)) {
            out.self = true;
            messageIds = _.remove(messageIds, message.id);
        }
        return out;
    };

    var startListener = function() {
        console.log("Websocket connected and ready to use...");
        isConnected = true;

        socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
            listener.notify(getMessage(data.body));
        });

        connectedListenerCallback(true);
    };

    var initialize = function() {
        console.log("Socket url client: " + service.SOCKET_URL);
        socket.client = new SockJS(service.SOCKET_URL);
        socket.stomp = Stomp.over(socket.client);
        socket.stomp.connect({}, startListener);
        socket.stomp.onclose = reconnect;
        console.log("Socket initialized...");

    };

    console.log("Initializing Websocket");
    initialize();
    return service;
}]);
