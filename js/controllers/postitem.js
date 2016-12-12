/**
 * Created by jimmymosca on 11/27/16.
 */

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);


app.controller('postitemCtrl', ['$scope', '$http', '$log', '$route', function ($scope, $http, $log, $route) {

    var uniqueId = localStorage.getItem('unique_id');
    var accessToken = localStorage.getItem('access_token');

    $scope.tags = [];
    $scope.tagWord = "";
    $scope.picture = "";


    $(document).keyup(function (e) {
        if ($(".input1:focus") && (e.keyCode === 13)) {
            $scope.handleTagInput();
        }
    });

    $scope.focusSearch = function() {
        if ($("#textBox:focus")) {
            $('#textBox').css('zIndex', 9001);
        }
    }

    $scope.handleTagInput = function () {
        addTag($scope.tagWord);
        $scope.tagWord = "";
    };

     function addTag(tag) {
        if ($scope.tags.indexOf(tag) >= 0) {

        }
        if (tag.length > 0) {
            var box = document.createElement("div");
            box.className = "tag";
            var tagName = document.createTextNode(tag);
            box.appendChild(tagName);
            var close = document.createElement("div");
            var x = document.createTextNode("x");
            close.className = "closeButton";
            close.appendChild(x);
            close.click(function () {
                deleteTag(close);
            });
            box.appendChild(close);
            $(".tagBox").append(box);
            $scope.tags.push(tag);
            $log.log($scope.tags)
        }

    };

    $(document).on('click', '.closeButton', function () {
        $scope.deleteTag(this);
    });

    $scope.deleteTag = function(tag) {
        var textNode = tag.parentNode.childNodes[0];
        var text = textNode.nodeValue;
        var index = $scope.tags.indexOf(text);
        if (index > -1) {
            $scope.tags.splice(index, 1);
        }
        var box = tag.parentNode.parentNode;
        box.removeChild(tag.parentNode);
        $log.log($scope.tags)
    }

    function postLost() {
        var JSONData = createJSONTagObject();
        $log.log(JSONData);
        $http({
            method: 'POST',
            url: 'http://colab-sbx-122.oit.duke.edu:8080/lostItem/addItem',
            headers: {'Content-Type': 'application/json'},
            data: JSONData
        }).then(function successCallback(response) {
            $log.log('request succeeded!');
            $log.log(response);
        });
    }

    function postFound() {
        var JSONData = createJSONTagObject();
        $http({
            method: 'POST',
            url: 'http://colab-sbx-122.oit.duke.edu:8080/foundItem/addItem',
            headers: {'Content-Type': 'application/json'},
            data: createJSONTagObject()
        }).then(function successCallback(response) {
            $log.log('request succeeded!');
            $log.log(response);
        });
    }

    function createJSONTagObject() {
        $log.log($scope.tags);
        var tagsJSON = {
            "uniqueId": uniqueId,
            "geolocation": document.getElementById('location').value,
            "timestamp": Date.now(),
            "accessToken": accessToken,
            "tags": $scope.tags,
            "pictureURL": $scope.picture
        };
        return tagsJSON;
    }

    $scope.postItem = function() {
        var file = $scope.uploadedFile;
        var fd = new FormData();
        fd.append('file', file);
        var problems = $scope.findErrors();
        if (problems.length > 0) {
            listErrors(problems);
        }
        else {
            $http.post('http://colab-sbx-122.oit.duke.edu:8080/file/fileUpload', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function (response) {
                $log.log(response)
                $scope.picture = response.body;
                $scope.submitItem();
            }).error(function (response) {
                $log.log(response)
            });
        }
    };

    $scope.findErrors = function() {
        var foundProblems = [];
        if ($scope.tags.length == 0) {
            foundProblems.push("tags");
        }
        if (!$("#location").value) {
            foundProblems.push("location");
        }
        if (!$("#fileInput").value) {
            foundProblems.push("image");
        }
        $log.log(foundProblems);
        return foundProblems;
    }

    function listErrors(problems) {
        var box = document.getElementById("errorBox");
        if (box.firstChild) {
            box.removeChild(box.firstChild);
        }
        var errorString = "You must add: ";
        for (var i = 0; i < problems.length; i++) {
            errorString += problems[i];
            errorString += ",";
        }
        errorString = errorString.substring(0, errorString.length-1);
        var errorNode = document.createTextNode(errorString);
        $("#errorBox").append(errorNode);
    }

    $scope.submitItem = function() {
        if ($route.current.params['typeOfItem'] == "found") {
            postFound();
        }
        else if ($route.current.params['typeOfItem'] == "lost") {
            postLost();
        }
    }

}]);


