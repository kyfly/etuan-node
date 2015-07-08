function signUpCtrl($scope, $resource, $timeout, $window) {
  var Login = $resource('/api/OrganizationUsers');
  $scope.signUpBtn = function () {
    Login.save(
      {
        'email': $scope.email,
        'password': $scope.password
      },
      function (res) {
        console.log(res);
      },
      function (res) {
        alert('注册失败!');
      }
    );
  }
}
var app = angular.module('app', ['ngResource']);
app.controller('signUpCtrl', ['$scope', '$resource', '$timeout', '$window', signUpCtrl]);
