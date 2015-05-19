var app = angular.module('app', ['ngResource']);
app.controller('activityCtrl', ['$scope', '$resource', '$location', '$window', ActivityCtrl]);
app.config(['$resourceProvider', RewriteResourceActions]);

function ActivityCtrl($scope, $resource, $location, $window) {
  var activityUrlSearchObj = $location.search();
  var Activity = $resource('/api/activities/:id');
  $scope.cnFormat = "yyyy'年'MM'月'dd'日 'HH'时'mm'分'";
  Activity.get({
    "id": activityUrlSearchObj.id
  },
    function (res) {
      console.log(res);
      $scope.activity = res;
      $scope.title = $scope.activity.title;
      $scope.description = $scope.activity.description;
      $scope.logoUrl = $scope.activity.logoUrl;
      $scope.startTime = new Date($scope.activity.startTime);
      $scope.stopTime = new Date($scope.activity.stopTime);
    },
    function (res) {
    }
  );
}
