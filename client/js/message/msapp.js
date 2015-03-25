function messageCtrl ($scope,$location) {
  var searchObj = $location.search();
  $scope.icon = searchObj.i;
  $scope.color = searchObj.c; 
  $scope.title = searchObj.t;
  $scope.paragraph = searchObj.p;
}
var app = angular.module('app', []);
app.controller('messageCtrl',['$scope','$location',messageCtrl]);