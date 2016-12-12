
app.controller('homeCtrl',['$scope',function($scope){
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;

    $scope.slides = [
        {id:0,
        title: "Team Social At GoodBerry",
        image: "https://s3.amazonaws.com/lostandfoundspringfinderzpicture/team_pi.jpg"},
        {id:1,
            title: "Ankit Kayastha",
            image: "https://s3.amazonaws.com/lostandfoundspringfinderzpicture/ankit.jpg"},
        {id:2,
            title: "James Mosca",
            image: "https://s3.amazonaws.com/lostandfoundspringfinderzpicture/james.jpg"},
        {id:3,
            title: "Shelley Wu",
            image: "https://s3.amazonaws.com/lostandfoundspringfinderzpicture/shelley.jpg"},
        {id:4,
            title: "Siva Loganathan",
            image: "https://s3.amazonaws.com/lostandfoundspringfinderzpicture/siva.jpg"}];

}]);