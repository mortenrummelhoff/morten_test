/**
 * Created by mortenrummelhoff on 17/02/16.
 */
var mortenAppConfig = angular.module('mortenAppConfig', []);
mortenAppConfig.run(function($rootScope, $http) {

    $http.defaults.withCredentials = true;
    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With'];

    //$rootScope.raspberryHost = "http://192.168.0.50:8080";
    //$rootScope.raspberryHost = "http://localhost:8080";

    $rootScope.host = "http://localhost:8080";
    //$rootScope.host = "https://mhrapp.itdev.nu";
    //$rootScope.host = "https://195.192.235.202";

});

//mortenAppConfig.factory('sessionInterceptor', function($injector, Base64 ) {
//
//    var sessionInterceptor = {
//        responseError: function(response) {
//
//            console.log("Response error: "+ response.status);
//
//            if (response.status == 401){
//                AuthenticationService.ClearCredentials();
//                return;
//            }
//        }
//
//    };
//
//    return sessionInterceptor;
//
//
//});
//
//mortenAppConfig.config(['$httpProvider', function($httpProvider) {
//    $httpProvider.interceptors.push('sessionInterceptor');
//}]);

