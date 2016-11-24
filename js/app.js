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
        $rootScope.access_token = access_token;
        $rootScope.loggedIn = access_token != null;
        $rootScope.loggedText = ($rootScope.loggedIn) ? "Logout" : "Login";
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


app.controller('mainController',['$scope', '$location', '$rootScope', '$http',function ($scope, $location, $rootScope, $http) {
    $scope.logFunc = function() {
      console.log("in log functoin");
        if ($rootScope.loggedIn) {
          $location.path('/logout');
      }
      else {
          window.location.href = "redirect.html?access_token=3cfddad3b540e5d5f70696731a325a0f288224c8&expires";
            /*var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log("successful get request made");
                    console.log(xhttp.responseText);
                }


            };
            xhttp.open("GET", "http://colab-sbx-122.oit.duke.edu:8080/loginsuccess?access_token=dc28f8048199a9272abd3ece7d7547c507ee4fd6", true);
            xhttp.send();*/


            $http({
                method: 'GET',
                url: 'http://colab-sbx-122.oit.duke.edu:8080/loginsuccess?access_token=3cfddad3b540e5d5f70696731a325a0f288224c8'
                //params: {access_token: $rootScope.access_token}
            }).then(function successCallback(response) {
                console.log("successful endpoint call");
                console.log(response.toString());
            }, function errorCallback(response) {
                console.log("There was an error with the endpoint");
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.data);
                console.log(response);
                console.log(response);
            });
      }
    };
}]);