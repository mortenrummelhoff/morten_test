var loginService = angular.module('Authentication', []);
loginService.factory('AuthenticationService',
    ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
        function (Base64, $http, $cookieStore, $rootScope, $timeout) {
            var service = {};

            service.Login = function (username, password, callback) {

                console.log("AuthenticationService login called");

                /* Dummy authentication for testing, uses $timeout to simulate api call
                 ----------------------------------------------*/
                /*
                $timeout(function(){
                    var response = { success: username === 'test' && password === 'test' };
                    if(!response.success) {
                        response.message = 'Username or password is incorrect';
                    }
                    callback(response);
                }, 1000);
                */

                /* Use this for real authentication
                 ----------------------------------------------*/

                var data = 'username=' + username + '&password=' + password;
                //var authD = Base64.encode(username + ':' + password);
                var host = $rootScope.host;
                var url = host +  "/login";
                console.log("Login url: " + url);
                //console.log("Basic " + authD);

                $http({method: 'POST',
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                     }).
                    then(function successCallback(response) {
                        console.log("successCallback called: " + response);
                        var response2 = {success: username};
                        callback(response2);

                        // this callback will be called asynchronously
                        // when the response is available
                    }, function errorCallback(response) {
                        console.log("errorCallback called: " + JSON.stringify(response));
                        callback(response.data);
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });

            };

            service.SetCredentials = function (username, password) {
                var authdata = Base64.encode(username + ':' + password);
                $rootScope.loggedId = true;
                $rootScope.globals = {
                    currentUser: {
                        username: username,
                        //authdata: authdata
                    }
                };


                //$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                $cookieStore.put('globals', $rootScope.globals);
            };

            service.ClearCredentials = function () {
                console.log("ClearCredentials called");
                $rootScope.loggedId = false;
                $rootScope.globals = {};
                $cookieStore.remove('globals');
            };

            return service;
        }])


.factory('sessionInterceptor', function($injector, $rootScope, $cookieStore, $q ) {

    var sessionInterceptor = {
        responseError: function(response) {

            console.log("Response error: "+ response.status);

            if (response.status !== 200){
                var AuthenticationService = $injector.get('AuthenticationService');
                AuthenticationService.ClearCredentials();
                return $q.reject(response);
            }
        }
    };

    return sessionInterceptor;

})

    .factory('Base64', function () {
        /* jshint ignore:start */

        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },

            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    window.alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };

        /* jshint ignore:end */
    });

    loginService.config(['$httpProvider', function($httpProvider) {
                    $httpProvider.interceptors.push('sessionInterceptor');
                }]);