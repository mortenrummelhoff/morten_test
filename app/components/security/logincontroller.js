//'use strict';
var loginController = angular.module('loginController', []);
loginController.controller('LoginController', ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function () {

            console.log("trying to login");


            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {

                console.log("response: " + response);

                if(response !== null && response.success) {
                    console.log("logged in successfully");
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/home');
                } else {
                    console.log("login not successfull");
                    if (response !== null) {
                        $scope.error = response.message;
                    }
                    $scope.dataLoading = false;
                }
            });
        };
    }]
);
