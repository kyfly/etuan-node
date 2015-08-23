var app = angular.module('app', ['ui.bootstrap', 'lbServices', 'ngResource']);
var nowTime = new Date().getTime();

app.controller('headCtrl', function ($scope) {
  $scope.isCollapsed = true;
});

app.controller('contentCtrl', ['$scope', '$http', 'OrganizationUser', 'University', function ($scope, $http, OrganizationUser, University) {
  $scope.u = '杭州电子科技大学';
  $scope.c = '全校';
  $scope.cname = '校级';
  var orgList = {};
  University.find().$promise.then(function (res) {
    $scope.Universitys = res;
    console.log(res);
  });

  OrganizationUser.list({}).$promise.then(function (res) {
    $scope.olts = JSON.parse(res.orgs);
    orgList = JSON.parse(res.orgs);
  }, function () {});
  $scope.getOCount = function () {
    if ($scope.olts)
      this.OCount = $scope.olts.filter(function (org) {
        console.log(org);
      }).length;
    return true;
  }
  $scope.getOrg = function () {
    this.cactive = true;
    $scope.u = this.$parent.University.name;
    $scope.c = this.college;
    $scope.orgCount = 0;
    $scope.colCount = 0;
    if ($scope.c === '全校')
      $scope.cname = '校级';
    else
      $scope.cname = this.college;
  }
}]);
