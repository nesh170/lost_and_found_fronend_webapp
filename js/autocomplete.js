/*
Obtained from http://stackoverflow.com/questions/30150326/ngautocomplete-with-google-suggest-api
 */

app.directive('ngGoogleSuggest', ['$http',
    function ($http) {
        return {
            restrict: 'AE',
            scope: {
                searchText: '=ngModel'
            },
            templateUrl: 'views/autocomplete.html',
            link: function (scope, elem, attrs) {

                scope.suggestions = [];

                scope.selectedTags = [];

                scope.selectedIndex = -1; //currently selected suggestion index


                //scope.removeTag = function(index) {
                //  scope.selectedTags.splice(index, 1);
                //}

                scope.clearResults = function () {
                    scope.suggestions = [];
                    console.log('clear results')
                }

                scope.selectSearchTerm = function (index) {
                    if (scope.selectedTags.indexOf(scope.suggestions[index]) === -1) {
                        scope.searchText = scope.suggestions[index];
                        scope.clearResults();
                    }
                }


                scope.search = function () {
                    // If searchText empty, don't search
                    if (scope.searchText == null || scope.searchText.length < 1)
                        return;

                    var url = 'http://suggestqueries.google.com/complete/search?callback=JSON_CALLBACK&client=firefox&hl=en&q=' + encodeURIComponent(scope.searchText);
                    $http.defaults.useXDomain = true;

                    $http({
                        url: url,
                        method: 'JSONP',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'

                        }
                    }).success(function (data, status, headers, config) {

                        //console.log('data');
                        //console.log(data[1]);

                        var results = data[1];
                        if (results.indexOf(scope.searchText) === -1) {
                            data.unshift(scope.searchText);
                        }
                        scope.suggestions = results;
                        scope.selectedIndex = -1;


                    }).error(function (data, status, headers, config) {
                        console.log('fail');
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });


                }


                scope.checkKeyDown = function (event) {
                    if (event.keyCode === 13) { //enter pressed
                        scope.selectSearchTerm(scope.selectedIndex);
                    } else if (event.keyCode === 40) { //down key, increment selectedIndex
                        event.preventDefault();
                        if (scope.selectedIndex + 1 !== scope.suggestions.length) {
                            scope.selectedIndex++;
                        }
                    } else if (event.keyCode === 38) { //up key, decrement selectedIndex
                        event.preventDefault();
                        if (scope.selectedIndex - 1 !== -1) {
                            scope.selectedIndex--;
                        }
                    }
                    //else scope.search();
                };


                scope.checkKeyup = function (event) {
                    console.log('checking keyup');
                    if (event.keyCode === 13 || event.keyCode === 40 || event.keyCode === 38)
                        return;
                    scope.search();
                };


                scope.$watch('selectedIndex', function (val) {
                    if (val !== -1) {
                        scope.searchText = scope.suggestions[scope.selectedIndex];
                    }
                });

                elem.bind('blur', scope.clearResults);
                elem.bind('keyup', scope.checkKeyup);

            }


        }
    }
]);