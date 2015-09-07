function LoginCtrl($scope, $resource, $timeout, $window) {
  var Login = $resource('/api/OrganizationUsers/login');
  $scope.loginBtn = function () {
    var RSA = new RSAKey();
    var n = 'CABFB6D38FE0CBCA762762F573FAABE16B576658D961253D263A9C8455E1A4138A77E9A232B73FFB64D8B239266482D10821A04055B6881647B59AFA51EF7B389F9268C4712989F993C669B183BC9A24B651DBA3D8C7288A9F5A94B4463E4F589338101A75560360A78646ED1553D9D02D4FF99D1FD948D61363D561666395C1';
    var e = '10001';
    RSA.setPublic(n,e);
    $scope.password = RSA.encrypt($scope.password);
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