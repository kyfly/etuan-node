var app = angular.module('app', ['ui.bootstrap']);

app.controller('headCtrl', function ($scope) {
  $scope.isCollapsed = true;
});

app.controller('contentCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('/api/Forms').success(function (res) {
    $scope.flts = res;
  });
  $http.get('/api/Votes').success(function (res) {
    $scope.vlts = res;
  });
  $http.get('/api/Seckills').success(function (res) {
    $scope.skls = res;
  });

  $scope.cnFormat = "yyyy-MM-dd HH:mm";


}]);