var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
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
        $rootScope.loggedIn = access_token != null;
        return $rootScope.loggedIn;
    }
}]);

app.run(['$rootScope','$location', function ($rootScope,$location) {
    $rootScope.$on('$locationChangeStart', function(){
        if($rootScope.checkLogin() == false){
            $location.path("/")
        }
    })
}]);


app.controller('mainController',['$scope', '$location',function ($scope, $location) {
    $scope.loginFunc = function() {
        $location.path("http://colab-sbx-122.oit.duke.edu:8080/authenticate/production");
    };
    $scope.logoutFunc = function() {
        $location.path('/#/logout');
    };
}]);