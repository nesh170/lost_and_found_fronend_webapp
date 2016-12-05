/**
 * Created by jimmymosca on 11/27/16.
 */

app.controller('postitemCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log) {

    var tags = new Array();

    $(document).ready(function(){
        $('#addButton').click(function(){
            handleTagInput()
        });
    });

    $(document).keyup(function (e) {
        if ($(".input1:focus") && (e.keyCode === 13)) {
            handleTagInput()
        }
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
            close.click(function() {
                deleteTag(close);
            });
            box.appendChild(close);
            $( ".tagBox" ).append( box );
            tags.push(tag);
        }

    }

    $(document).on('click','.closeButton',function() {
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
        $http.post('http://colab-sbx-122.oit.duke.edu:8080/lostItem/addItem/' + uniqueId).then(function success(response) {
            foundItems = process(response.data.body);
        }, function failed(response) {
            $log.log(response)
        });

    }

    function postFound() {
        $http.post('http://colab-sbx-122.oit.duke.edu:8080/foundItem/addItem/' + uniqueId).then(function success(response) {
            foundItems = process(response.data.body);
        }, function failed(response) {
            $log.log(response)
        });
    }

    function createJSONTagObject() {
        var tagsJSON = {
            "uniqueId": uniqueId,
            "geolocation": document.getElementById('location').value,
            "timestamp": Date.now(),
            "accessToken": access_token,
            "tags": tags
        }
        return tagsJSON;
    }

}]);


