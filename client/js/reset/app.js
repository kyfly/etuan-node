function ResetCtrl($scope, $resource, $timeout, $window) {
  var ResetPwd = $resource('/api/OrganizationUsers/resetpwd');
  $scope.resetPwd = function () {
    ResetPwd.save(
    {
      email: $scope.email,
      oldpwd: $scope.oldpwd,
      newpwd: $scope.newpwd
    }, 
    function (res) {
      alert('恭喜你,密码修改成功');
    }, 
    function (res) {
      alert(res.data.error.message);
    });
  }
}

var app = angular.module('app', ['ngResource']);
app.controller('ResetCtrl', ['$scope', '$resource', '$timeout', '$window', ResetCtrl]);

