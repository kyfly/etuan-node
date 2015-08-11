function ActivityCtrl($scope, $resource, $location) {
  var activityUrlSearchObj = $location.search();
  var Activity = $resource('/api/activities/:id');
  $scope.cnFormat = "yyyy'年'MM'月'dd'日 'HH'时'mm'分'";
  Activity.get({
    "id": activityUrlSearchObj.id
  },
    function (res) {
      $scope.activity = res;
      $scope.title = $scope.activity.title;
      $scope.description = $scope.activity.description;
      $scope.logoUrl = $scope.activity.logoUrl;
      console.log($scope.activity.startTime);
      if(!new Date($scope.activity.startTime).getTime())
      {
        if($scope.activity.startTime.indexOf('-'))
          $scope.activity.startTime = $scope.activity.startTime.replace(/-/g,"/");
        if($scope.activity.stopTime.indexOf('-'))
          $scope.activity.stopTime = $scope.activity.stopTime.replace(/-/g,"/");
      }
      $scope.startTime = new Date($scope.activity.startTime);
      $scope.stopTime = new Date($scope.activity.stopTime);
      var ueditorContent = $resource('/api/Activities/get-content?url=' + res.contentUrl);
      ueditorContent.get({},
        function (res) {
          document.getElementById("content").innerHTML = res.content;
        },
        function (res) {
          alert("对不起，获取内容失败");
        }
      );

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

var app = angular.module('app', ['ngResource', 'ui.bootstrap']);
app.controller('activityCtrl', ['$scope', '$resource', '$location', ActivityCtrl]);
app.config(['$resourceProvider', RewriteResourceActions]);
app.controller('headCtrl', function ($scope) {
  $scope.isCollapsed = true;
});
