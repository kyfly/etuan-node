//旧Angular代码
/*
function LoginCtrl ($scope,$resource,$timeout,$window) {
  var Login = $resource('/api/WeChatUsers/login');
  $scope.loginBtn = function(){
    Login.save(
      {
        'email':$scope.email,
        'password':$scope.password
      },
      function(res){
        $window.localStorage.setItem('weChatAccessToken',res.id);
        $window.localStorage.setItem('weChatUid',res.userId);
        $window.localStorage.setItem('weChatLoginTime',res.created);
        alert('模拟微信登录成功，将在1秒钟后跳转!');
        $timeout(function(){$window.location='/list-tmp.html'},1000);
      },
      function(res){
        alert('模拟模拟登录失败!');
      }
    );
  }
}
var app = angular.module('app', ['ngResource']);
app.controller('LoginCtrl',['$scope','$resource','$timeout','$window',LoginCtrl]);
*/
$(document).ready(function () {
  var checkStatus = function () {
    $.get("/api/LoginCaches/confirm", {state : token}, function (data, status) {
      if (data.msg === "success" && status === "success") {
        alert(data);
        /*
        window.localStorage.setItem('weChatUserInfo',data.userInfo);
        window.localStorage.setItem('weChatAccessToken',data.token);
        window.localStorage.href = data.url;
        */
      }
      else if (status === "success") {
        $('#logstatus').html(data.msg);
      };
    });
  };
  var createQrcode = function (url) {
    var qr = qrcode(13, 'Q');
    qr.addData(url);
    qr.make();
    document.getElementById('qrcode').innerHTML = qr.createImgTag(4);
  };
  createQrcode(url);

  setInterval(checkStatus, 1000);
  setInterval(function () {        
    document.location.reload(true);
    }, 
    30000
  );
});