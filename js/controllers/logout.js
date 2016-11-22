app.controller('logoutCtrl',['$scope',function($scope){
    localStorage.removeItem("access_token");
}]);