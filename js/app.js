var app = angular.module('app', ['ngRoute','ngAnimate','ngSanitize','ui.bootstrap']);
app.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
        })
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'contactCtrl'
        })
        .when('/lostitems', {
            templateUrl: 'views/lostItem.html',
            controller: 'lostItemCtrl'
        })
        .when('/history', {
            templateUrl: 'views/history.html',
            controller: 'historyCtrl'
        })
        .when('/logout', {
            templateUrl: 'views/logout.html',
            controller: 'logoutCtrl'
        })
        .when('/postItem/:typeOfItem', {
            templateUrl: 'views/post_item.html',
            controller: 'postitemCtrl'
        })
        .when('/lostDukeCard',{
            templateUrl:'views/lostDukeCard.html',
            controller: 'lostDukeCardCtrl'
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
    $scope.logout = function() {
        $location.path('/logout');
    };
    $scope.login = function() {
        $log.log("root scope logged in is " + $rootScope.loggedIn);
        window.location.href = "redirect.html?access_token=3efc08c48b4d0d54369b0c92151f020ec5807f29";
        //window.location.href = "http://lostandfound.colab.duke.edu:8080/authenticate/production"
        $log.log("now log in is " + $rootScope.loggedIn);
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
            $scope.email = response.data.body.email;
            $scope.firstInitial = $scope.userName.substring(0, 1);
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