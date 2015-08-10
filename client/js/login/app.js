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
        $window.sessionStorage.setItem('b3JnYW5p', JSON.stringify(lsTmp));
        $window.location = '/admin'
      },
      function (res) {
        alert('登录失败，请检查登录信息!');
      }
    );
  }
}

var app = angular.module('app', ['ngResource', 'ui.bootstrap']);
app.controller('LoginCtrl', ['$scope', '$resource', '$timeout', '$window', LoginCtrl]);

app.controller('headCtrl', function ($scope) {
  $scope.isCollapsed = true;
});