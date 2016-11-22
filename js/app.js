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


app.controller('mainController',['$scope',function ($scope) {

}]);