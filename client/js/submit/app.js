function SubmitCtrl ($scope,$resource,$timeout,$window) {
  var Submit = $resource('/api/OrganizationUsers');
  $scope.submitBtn = function(){
    Submit.save({
      "email":this.email,
      "password":this.password
    },function(res){
        alert('模拟注册成功!');
        console.log(res);
        $timeout(function(){$window.location='/login.html'},5000);
    },function(res){
      alert('模拟注册失败!');
      console.log(res);
    });
  };
}
var app = angular.module('app', ['ngResource']);
app.controller('SubmitCtrl',['$scope','$resource','$timeout','$window',SubmitCtrl]);
