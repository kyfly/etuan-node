var app = angular.module('app', ['ui.bootstrap']);
var nowTime = new Date().getTime();

app.controller('headCtrl', function ($scope) {
  $scope.isCollapsed = true;
});
function StatusFun(ActType, flag) {
  for (var i = 0; i < ActType.length; i++) {
    if (!new Date(ActType[i].startTime).getTime() && !flag) {
      if (ActType[i].startTime.indexOf('-'))
        ActType[i].startTime = ActType[i].startTime.replace(/-/g, "/");
      if (ActType[i].stopTime.indexOf('-'))
        ActType[i].stopTime = ActType[i].stopTime.replace(/-/g, "/");
    }
    if (new Date(ActType[i].startTime).getTime() > nowTime) {
      ActType[i].activityStatus = "即将开始";
      ActType[i].textColor = "warning";
    } else if (flag === 0) {
      if (new Date(ActType[i].stopTime).getTime() < nowTime) {
        ActType[i].activityStatus = "已经结束";
        ActType[i].textColor = "danger";
      } else {
        ActType[i].activityStatus = "正在进行";
        ActType[i].textColor = "success";
      }
    } else if (flag === 1) {
      if ((new Date(ActType[i].seckillArrangements[ActType[i].seckillArrangements.length - 1].startTime).getTime() + 86400000 * 2) < nowTime) {
        ActType[i].activityStatus = "已经结束";
        ActType[i].textColor = "danger";
      } else {
        ActType[i].activityStatus = "正在进行";
        ActType[i].textColor = "success";
      }
    }

  }
}
app.controller('contentCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('/api/OrganizationUsers/list?filter[order]=id%20DESC').success(function (res) {
    $scope.olts = JSON.parse(res.orgs);
  });
  $http.get('/api/Activities?filter[order]=id%20DESC').success(function (res) {
    $scope.alts = res;
    StatusFun($scope.alts, 0);
  });
  $http.get('/api/Forms?filter[order]=id%20DESC').success(function (res) {
    $scope.flts = res;
    StatusFun($scope.flts, 0);
  });
  $http.get('/api/Votes?filter[order]=id%20DESC').success(function (res) {
    $scope.vlts = res;
    StatusFun($scope.vlts, 0);
  });
  $http.get('/api/Seckills?filter[order]=id%20DESC').success(function (res) {
    $scope.skls = res;
    StatusFun($scope.skls, 1);
  });
}]);
