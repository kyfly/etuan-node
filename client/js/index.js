var app = angular.module('app', ['ui.bootstrap']);
var nowTime = new Date().getTime();

app.controller('headCtrl', function ($scope) {
  $scope.isCollapsed = true;
});

app.controller('contentCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('/api/OrganizationUsers/list?filter[order]=id%20DESC').success(function (res) {
    $scope.olts = JSON.parse(res.orgs);
  });
  $http.get('/api/Activities?filter[order]=id%20DESC').success(function (res) {
    $scope.alts = res;
    for (var i = 0; i < $scope.alts.length; i++) {
      if (new Date($scope.alts[i].startTime).getTime() > nowTime) {
        $scope.alts[i].activityStatus = "即将开始";
        $scope.alts[i].textColor = "warning";
      } else if (new Date($scope.alts[i].stopTime).getTime() < nowTime) {
        $scope.alts[i].activityStatus = "已经结束";
        $scope.alts[i].textColor = "danger";
      } else {
        $scope.alts[i].activityStatus = "正在进行";
        $scope.alts[i].textColor = "success";
      }
    }
  });
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
    for (var i = 0; i < $scope.vlts.length; i++) {
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
    //抢票默认设置为一天后显示已经结束
    for (var i = 0; i < $scope.skls.length; i++) {
      if (new Date($scope.skls[i].seckillArrangements[0].startTime).getTime() > nowTime) {
        $scope.skls[i].activityStatus = "即将开始";
        $scope.skls[i].textColor = "warning";
      } else if ((new Date($scope.skls[i].seckillArrangements[0].startTime).getTime() + 86400000) < nowTime) {
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
