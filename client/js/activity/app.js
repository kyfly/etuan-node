function ActivityCtrl($scope, $resource, $location) {
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

function RewriteResourceActions($resourceProvider) {
  var commonHeaders = {
    Authorization: JSON.parse(window.localStorage.getItem('d2VjaGF0')).accessToken
  };
  $resourceProvider.defaults.actions = {
    'get': {
      method: 'GET',
      headers: commonHeaders
    },
    'query': {
      method: 'GET',
      isArray: true,
      headers: commonHeaders
    },
    'save': {
      method: 'POST',
      headers: commonHeaders
    },
    'update': {
      method: 'PUT',
      headers: commonHeaders
    },
    'check': {
      method: 'HEAD',
      headers: commonHeaders
    },
    'delete': {
      method: 'DELETE',
      headers: commonHeaders
    }
  };
}

var app = angular.module('app', ['ngResource']);
app.controller('activityCtrl', ['$scope', '$resource', '$location', ActivityCtrl]);
app.config(['$resourceProvider', RewriteResourceActions]);
