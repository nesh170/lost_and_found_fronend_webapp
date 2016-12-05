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

    var tags = new Array();

    $(document).ready(function () {
        $('#addButton').click(function () {
            handleTagInput();
        });
    });

    $(document).keyup(function (e) {
        if ($(".input1:focus") && (e.keyCode === 13)) {
            handleTagInput();
        }
    });

    $(document).ready(function () {
        $('#postButton').click(function () {
            submitItem();
        });
    });

    function handleTagInput() {
        var tag = document.getElementById('tagField').value;
        addTag(tag);
        document.getElementById('tagField').value = '';
    }

    function addTag(tag) {
        if (tags.indexOf(tag) >= 0) {

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
            tags.push(tag);
        }

    }

    $(document).on('click', '.closeButton', function () {
        deleteTag(this);
    });

    function deleteTag(tag) {
        var textNode = tag.parentNode.childNodes[0];
        var text = textNode.nodeValue;
        var index = tags.indexOf(text);
        if (index > -1) {
            tags.splice(index, 1);
        }
        var box = tag.parentNode.parentNode;
        box.removeChild(tag.parentNode);
    }

    function postLost() {
        var JSONData = createJSONTagObject();
        $http({
            method: 'POST',
            url: 'http://colab-sbx-122.oit.duke.edu:8080/lostItem/addItem',
            headers: {'Content-Type': 'application/json'},
            data: createJSONTagObject()
        }).then(function successCallback(response) {
            $log.log('request succeeded!');
            $log.log(response);

        });
    }

    function postFound() {
        var JSONData = createJSONTagObject();
        $http({
            method: 'POST',
            url: 'http://colab-sbx-122.oit.duke.edu:8080/lostItem/foundItem',
            headers: {'Content-Type': 'application/json'},
            data: createJSONTagObject()
        }).then(function successCallback(response) {
            $log.log('request succeeded!');
            $log.log(response);
        });
    }

    function createJSONTagObject() {
        var tagsJSON = {
            "uniqueId": uniqueId,
            "geolocation": document.getElementById('location').value,
            "timestamp": Date.now(),
            "accessToken": accessToken,
            "tags": tags
        };
        return tagsJSON;
    }

    $scope.uploadFile = function() {
        var file = $scope.uploadedFile;
        var fd = new FormData();
        fd.append('file', file);
        $http.post('http://colab-sbx-122.oit.duke.edu:8080/file/fileUpload', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
        }).success(function (response) {
                $log.log(response)
        }).error(function (response) {
                $log.log(response)
        });
    };

    function submitItem() {
        if ($route.current.params['typeOfItem'] == "found") {
            postFound();
        }
        else if ($route.current.params['typeOfItem'] == "lost") {
            postLost();
        }
    }

}]);


