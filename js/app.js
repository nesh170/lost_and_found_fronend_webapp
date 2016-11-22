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


app.controller('mainController',['$scope', '$location',function ($scope, $location) {
    $scope.loginFunc = function() {
        $location.path("http://colab-sbx-122.oit.duke.edu:8080/authenticate/production");
    };
    $scope.logoutFunc = function() {
        $location.path('/#/logout');
    };
}]);