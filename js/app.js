var app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/static/views/home.html',
            controller: 'homeCtrl'
        })
        .when('/logout', {
            templateUrl: '/static/views/logout.html',
            controller: 'logoutCtrl'
        })
        .otherwise({
            templateUrl: '/static/views/home.html',
            controller: 'homeCtrl'
        })
});


app.controller('mainController',['$scope',function ($scope) {

}]);