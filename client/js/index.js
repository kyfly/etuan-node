var app = angular.module('app', ['ui.bootstrap']);
var nowTime = new Date().getTime();

app.controller('headCtrl', function ($scope) {
  $scope.isCollapsed = true;
});

app.controller('contentCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('/api/Forms?filter[order]=id%20DESC').success(function (res) {
    $scope.flts = res;
    for (var i = 0; i < $scope.flts.length; i++) {
      if (new Date($scope.flts[i].startTime).getTime() > nowTime) {
        $scope.flts[i].activityStatus = "即将开始";
        $scope.flts[i].textColor = "warning";
      } else if (new Date($scope.flts[i].stopTime).getTime() < nowTime) {
        $scope.flts[i].activityStatus = "已经结束";
        $scope.flts[i].textColor = "danger";
      } else {
        $scope.flts[i].activityStatus = "正在进行";
        $scope.flts[i].textColor = "success";
      }
    }
  });
  $http.get('/api/Votes?filter[order]=id%20DESC').success(function (res) {
    $scope.vlts = res;
    for (var i = 0; i < $scope.flts.length; i++) {
      if (new Date($scope.vlts[i].startTime).getTime() > nowTime) {
        $scope.vlts[i].activityStatus = "即将开始";
        $scope.vlts[i].textColor = "warning";
      } else if (new Date($scope.vlts[i].stopTime).getTime() < nowTime) {
        $scope.vlts[i].activityStatus = "已经结束";
        $scope.vlts[i].textColor = "danger";
      } else {
        $scope.vlts[i].activityStatus = "正在进行";
        $scope.vlts[i].textColor = "success";
      }
    }
  });
  $http.get('/api/Seckills?filter[order]=id%20DESC').success(function (res) {
    $scope.skls = res;
    for (var i = 0; i < $scope.flts.length; i++) {
      if (new Date($scope.skls[i].seckillArrangements[0].startTime).getTime() > nowTime) {
        $scope.skls[i].activityStatus = "即将开始";
        $scope.skls[i].textColor = "warning";
      } else if ((new Date($scope.skls[i].seckillArrangements[0].startTime).getTime() < nowTime) && ($scope.skls[i].seckillArrangements[$scope.skls[i].seckillArrangements.length - 1].total === 0)) {
        $scope.skls[i].activityStatus = "已经结束";
        $scope.skls[i].textColor = "danger";
      } else {
        $scope.skls[i].activityStatus = "正在进行";
        $scope.skls[i].textColor = "success";
      }
    }
  });
  var accessToken = window.localStorage.swagger_accessToken;
  $scope.fltView = function (id) {
    $http.get('/api/Forms/view/' + id + '?access_token=' + accessToken)
  };
  $scope.vltView = function (id) {
    $http.get('/api/Votes/view/' + id + '?access_token=' + accessToken)
  };
  $scope.sklView = function (id) {
    $http.get('/api/Seckills/view/' + id + '?access_token=' + accessToken)
  }

}]);
