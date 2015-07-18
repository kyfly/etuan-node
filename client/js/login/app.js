function LoginCtrl($scope, $resource, $timeout, $window) {
  var Login = $resource('/api/OrganizationUsers/login');
  $scope.loginBtn = function () {
    Login.save(
      {
        'email': $scope.email,
        'password': $scope.password
      },
      function (res) {
        var lsTmp = {
          accessToken: res.id,
          userId: res.userId,
          loginTime: res.created,
          ttl: res.ttl
        };
        $window.localStorage.setItem('b3JnYW5p', JSON.stringify(lsTmp));
        alert('登录成功，将在1秒钟后跳转!');
        $timeout(function () {
          $window.location = '/admin'
        }, 1000);
      },
      function (res) {
        alert('登录失败!');
      }
    );
  }
}

var app = angular.module('app', ['ngResource', 'ui.bootstrap']);
app.controller('LoginCtrl', ['$scope', '$resource', '$timeout', '$window', LoginCtrl]);

app.controller('headCtrl', function ($scope) {
  $scope.isCollapsed = true;
});