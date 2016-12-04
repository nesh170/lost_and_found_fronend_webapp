var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
        })
        .when('/lostitems', {
            templateUrL: 'views/history.html',
            controller: 'historyCtrl'
        })
        .when('/history', {
            templateUrl: 'views/history.html',
            controller: 'historyCtrl'
        })
        .when('/logout', {
            templateUrl: 'views/logout.html',
            controller: 'logoutCtrl'
        })
        .otherwise({
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
        })

}]);

app.run(['$rootScope','$log', function($rootScope,$log){
    $rootScope.checkLogin = function(){
        var access_token = localStorage.getItem("access_token");
        $rootScope.access_token = access_token;
        $rootScope.loggedIn = access_token != null;
        $rootScope.loggedText = ($rootScope.loggedIn) ? "Logout" : "Login";
        return $rootScope.loggedIn;
    }
}]);

app.run(['$rootScope','$location', function ($rootScope,$location) {
    $rootScope.$on('$locationChangeStart', function(){
        if($rootScope.checkLogin() == false){
            $location.path("/");
        }
    })
}]);


app.controller('mainController',['$scope', '$location', '$rootScope', '$http','$log',function ($scope, $location, $rootScope, $http, $log) {
    $scope.logFunc = function() {
        $log.log("in log functoin");
        if ($rootScope.loggedIn) {
            $location.path('/logout');
        }
        else {
            window.location.href = "redirect.html?access_token=66326ad58792b1752d130fc7c7c5a31ad3e0793b";
        }
    };

    if(localStorage.getItem("access_token") != null){ //TODO remove the logging if success
        var access_token = localStorage.getItem("access_token");
        $log.log("success Test function");
        $log.log($rootScope.access_token);
        $http({
            method: 'GET',
            url: 'http://colab-sbx-122.oit.duke.edu:8080/loginsuccess',
            params: {access_token: access_token}
        }).then(function successCallback(response) {
            $log.log("successful endpoint call");
            $log.log(response.data);
            $log.log(response.data.body.uniqueId);
            localStorage.setItem("unique_id", response.data.body.uniqueId);
            $scope.userName = response.data.body.name;
        }, function errorCallback(response) {
            $log.log("There was an error with the endpoint");
            $log.log(response.status);
            $log.log(response.statusText);
            $log.log(response.data);
            $log.log(response);
            $log.log(response);
        });
    }



}]);