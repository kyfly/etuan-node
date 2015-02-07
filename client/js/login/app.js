function LoginCtrl ($scope,$resource,$timeout,$window) {
  var Login = $resource('/api/OrganizationUsers/login');
  $scope.loginBtn = function(){
    Login.save({
      "email":$scope.email,
      "password":$scope.password
      },
      function(res){
        console.log(res);
        $window.localStorage.setItem('accessToken',res.id);
        $window.localStorage.setItem('userId',res.userId);
        $window.localStorage.setItem('loginTime',res.created);
        alert('success!');
        $timeout(function(){$window.location='/admin/index-sim.html'},5000);
      },
      function (res) {
        console.log(res);
        alert('error!');
      }
    );
  }
}
var app = angular.module('app', ['ngResource']);
app.controller('LoginCtrl',['$scope','$resource','$timeout','$window',LoginCtrl]);
