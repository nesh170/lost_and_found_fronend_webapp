/**
 * Created by mac on 12/4/16.
 */
app.controller('lostDukeCardCtrl',['$scope','$http', '$log', function($scope, $http, $log){

    var uniqueIdVar = localStorage.getItem('unique_id');
    var accessTokenVar = localStorage.getItem('access_token');

    $scope.alert = {
        message:'',
        type:'success',
        display:false
    };

    $scope.closeAlert = function(){
        $scope.alert.display = false;
    };

    $scope.failAlert = function(msg){
        $scope.alert = {
            message:msg,
            type:"danger",
            display:true
        }
    };

    $scope.successAlert = function(msg){
        $scope.alert = {
            message:msg,
            type:"success",
            display:true
        }
    };

    $scope.notifyOwner = function() {
        $http({
            method: 'POST',
            url: 'http://colab-sbx-122.oit.duke.edu:8080/dukecard/createLostDukeCard',
            headers:{'Content-Type':'application/json'},
            data: {uniqueId:uniqueIdVar, accessToken: accessTokenVar, dukeCardUniqueId:$scope.uniqueID}
        }).then(function successCallback(response){
            if (response.data.body.emailSent){
                $scope.successAlert("Hi! "+response.data.body.name+" has been notified and an email has been sent!");
            }
            else{
                $scope.failAlert("Oh no! " +response.data.body.name+ " is not yet in the lost_and_found database! You can notify "+response.data.body.name+ " at " + response.data.body.email);
            }
        }, function errorCallback(response){
            $log.error(response);
            $scope.failAlert("Request Failed")
        });



    };


}]);