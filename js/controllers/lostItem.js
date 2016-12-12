app.controller('lostItemCtrl', ['$scope', '$http', '$log', '$location','$uibModal', function ($scope, $http, $log, $location, $uibModal) {


    $scope.createNewItem = function() {
        $log.log("in create new item");
        $location.path('/postItem/lost');
    };

    $scope.open = function() {
        $scope.showModal = true;
    };
    $scope.ok = function() {
        $scope.showModal = false;
    };
    $scope.cancel = function() {
        $scope.showModal = false;
    };
    var processData = function(data) {
        //data is an array, each element of data is an object that has information about all of the lost items
        var allLostItems = [];
        //for each item in response, create an object, add it to allLostItems, which will then be returned
        for (i = 0; i < data.length; i++) {
            var itemObject = {};
            itemObject.id = data[i].id;
            itemObject.location = data[i].location;
            itemObject.matchedID = data[i].matchedID;
            itemObject.pictureURL = data[i].pictureURL;
            //join items of tags array into a string
            itemObject.tags = data[i].tags.join();
            itemObject.timestamp =  moment.unix(data[i].timestamp/1000).format('MMMM Do YYYY, h:mm:ss a');
            itemObject.uniqueId = data[i].uniqueId;
            allLostItems[i] = itemObject;
        }
        return allLostItems;
    };
    $log.log("About to make get request call");
    $http.get('http://colab-sbx-122.oit.duke.edu:8080/lostItem/allItems').then(function success(response) {
        $log.log("request succeeded");
        $log.log(response);
        $scope.lostItems = processData(response.data.body);
        $log.log($scope.lostItems);
    }, function failed(response) {
        $log.log("request failed");
        $log.log(response);
    });

    $scope.open = function (lostItem) {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                lostItemForModal: function () {
                    return lostItem
                }
            }
        });
    };



}]);

app.controller('ModalInstanceCtrl', function ($uibModalInstance, $scope, lostItemForModal,$log) {
    $log.log(lostItemForModal);
    $scope.itemDisplay = lostItemForModal;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});