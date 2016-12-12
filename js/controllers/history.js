app.controller('historyCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log) {

    var uniqueId = localStorage.getItem('unique_id');
    var accessToken = localStorage.getItem('access_token');


    var lostItems = [];
    var foundItems = [];

    var process = function (data) {
        items = [];
        for (var index in data) {
            item = data[index];
            var formattedItem = {};
            formattedItem.id = item.id;
            formattedItem.location = item.location;
            formattedItem.tags = item.tags.join();
            formattedItem.picture_url = item.pictureURL;
            formattedItem.timestamp = moment.unix(item.timestamp/1000).format('MMMM Do YYYY, h:mm:ss a');
            formattedItem.matchedId = item.matchedId;
            items.push(formattedItem);
        }
        return items;
    };

    $http.get('http://colab-sbx-122.oit.duke.edu:8080/lostItem/allItemsByUser/' + uniqueId).then(function success(response) {
        lostItems = process(response.data.body);
    }, function failed(response) {
        $log.log(response)
    });
    $http.get('http://colab-sbx-122.oit.duke.edu:8080/foundItem/allItemsByUser/' + uniqueId).then(function success(response) {
        foundItems = process(response.data.body);
    }, function failed(response) {
        $log.log(response)
    });

    var removeFromArray = function(array,item){
        var index = array.indexOf(item);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array
    };
    
    $scope.claimItem = function (item) {
        var markItemValue = ($scope.currentTabUrl =='lost_item_template.html') ? {uniqueId:uniqueId, accessToken:accessToken, lostId:item.id, foundId:'-1'} : {uniqueId:uniqueId, accessToken:accessToken, lostId:'-1', foundId:item.id};
        var parameter = JSON.stringify(markItemValue);
        $http.post('http://colab-sbx-122.oit.duke.edu:8080/item/markItem', parameter, {headers: {'Content-Type': 'application/json'}}).
        success(function(data, status, headers, config) {
            if($scope.currentTabUrl =='lost_item_template.html'){
                lostItems = removeFromArray(lostItems,item)
            }
            else{
                foundItems = removeFromArray(foundItems,item);
            }
        }).
        error(function(data, status, headers, config) {
            $log.error(data)
        });
    };


    $scope.tabs = [
        {name: 'Lost Item', url: 'lost_item_template.html'},
        {name: 'Found Item', url: 'found_item_template.html'}
    ];


    $scope.onClickTab = function (tab) {
        $scope.currentTabUrl = tab.url;
        $scope.currentItems = (tab.name == 'Lost Item') ? lostItems : foundItems;
    };
    $scope.isActiveTab = function (tab) {
        return $scope.currentTabUrl == tab.url;
    };


}]);