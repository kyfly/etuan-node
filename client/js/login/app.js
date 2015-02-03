function LoginCtrl ($scope,$resource,$timeout,$window) {
  var Login = $resource('/api/OrganizationUsers/login');
  $scope.loginBtn = function(){
    Login.save({
      "email":this.email,
      "password":this.password
    });
    alert('模拟登录成功，将在5秒钟后模拟跳转。');
    $timeout(function(){$window.location='http://www.evilucifero.com'},5000);
  }
}
var app = angular.module('app', ['ngResource']);
app.controller('LoginCtrl',['$scope','$resource','$timeout','$window',LoginCtrl]);
