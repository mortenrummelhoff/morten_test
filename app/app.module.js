var mortenApp = angular.module('mortenApp', [

    //config
    'mortenAppConfig',

    //services
    'dateExtractorService',
    'pioneerService',
    'ihcWebSocketService',
    'ihcService',

    //modules
    'ui.router',
    'frapontillo.bootstrap-switch',
    'rzModule',
    'ngCookies',

    //controllers
    'partialHomeController',
    'pioneerController',
    'ihcController',
    'Authentication',
    'loginController'
    //'AuthenticationService'

]);


mortenApp.run(['$rootScope', '$location', '$cookieStore', '$http', '$state',
    function ($rootScope, $location, $cookieStore, $http, $state) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            console.log("stateChangeStart event triggered" + event);

            //event.preventDefault();

            console.log({
                'toState': toState,
                'toParams': toParams,
                'fromState': fromState,
                'fromParams': fromParams
            });
            console.log("State: " + $state);

            console.log("ToState: " + toState.url);
            console.log("currentUser: " + $rootScope.globals.currentUser);
            // redirect to login page if not logged in
            if (toState.url == '/login') {
                console.log("correct check this is login path");
            }

            if (toState.url !== '/login' && !$rootScope.globals.currentUser) {
                console.log("Redirecting to login page");
                event.preventDefault();
                $state.go('login');
                //$location.path('/login');
            }
            else {
                console.log("what happened here??");
            }
        });
    }]);
