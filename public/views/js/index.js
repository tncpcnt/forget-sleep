var app = angular.module('myApp', []);

app.config(function ($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});
app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});
app.controller('myCtrl', function ($scope, $http, $location, $window) {
    $scope.myFunc = function () {

        $http.get("http://localhost:3000/api/islogin")
            .then(function (response) {
                console.log(response.data);
                $scope.logList = response.data;
            }, function (response) {

            });
    }
});