function SubmitCtrl($scope, $resource, $timeout, $window) {
  var Submit = $resource('/api/WeChatUsers/login');
  $scope.submitBtn = function () {
    Submit.save(
      {
        'email': this.email,
        'password': this.password
      },
      function (res) {
        var lsTmp = {
          accessToken: res.id,
          userId: res.userId,
          loginTime: res.created,
          ttl: res.ttl
        };
        $window.sessionStorage.setItem('d2VjaGF0', JSON.stringify(lsTmp));
        $timeout(function () {
          $window.location = '/index.html'
        }, 1000);
      },
      function () {
        alert('登陆失败!');
      }
    );
  };
}
var app = angular.module('app', ['ngResource']);
app.controller('SubmitCtrl', ['$scope', '$resource', '$timeout', '$window', SubmitCtrl]);
