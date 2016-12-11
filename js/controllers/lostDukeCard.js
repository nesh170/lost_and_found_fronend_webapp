/**
 * Created by mac on 12/4/16.
 */
app.controller('lostDukeCardCtrl',['$scope','$http', '$log', function($scope, $http, $log){

    var uniqueIdVar = localStorage.getItem('unique_id');
    var accessTokenVar = localStorage.getItem('access_token');

    $log.log($scope.uniqueID);

    // var headerParameter = JSON.stringify({uniqueId:uniqueIdVar, accessToken: accessTokenVar, dukeCardUniqueId:$scope.uniqueID});


    $scope.notifyOwner = function() {
        $log.log("in notify owner");
        $http({
            method: 'POST',
            url: 'http://colab-sbx-122.oit.duke.edu:8080/dukecard/createLostDukeCard',
            headers:{'Content-Type':'application/json'},
            data: {uniqueId:uniqueIdVar, accessToken: accessTokenVar, dukeCardUniqueId:$scope.uniqueID}
        }).then(function successCallback(response){
            $log.log('request succeeded!');
            $log.log(response);
            //if boolean is true,
            if (response.data.body.emailSent){
                alert("Hi! "+response.data.body.name+" has been notified and an email has been sent!");
            }
            else{
                alert("Oh no! " +response.data.body.name+ " is not yet in the lost_and_found database! You can notify "+response.data.body.name+ " at " + response.data.body.email);
            }
        }, function errorCallback(response){
            $log.log('request failed!');
            $log.log(response);
        });



    };


}]);