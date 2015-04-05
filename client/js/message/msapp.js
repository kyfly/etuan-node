function headCtrl ($scope,$location) {
  $scope.title = $location.search().t || '消息';
}
function messageCtrl ($scope,$location) {
  var searchObj = $location.search();
  $scope.icon = searchObj.i;
  $scope.color = searchObj.c; 
  $scope.title = searchObj.t;
  $scope.paragraph = searchObj.p;
  switch (searchObj.b) {
    case 'back':
      $scope.btnShow = true;
      $scope.btnText = '返 回';
      $scope.btnType = 'primary'
      $scope.btnClick = function () {
        history.back();
      };
      break;
    case 'exit':
      $scope.btnShow = true;
      $scope.btnText = '退 出';
      $scope.btnType = 'danger'
      $scope.btnClick = function () {
        window.location.href = '/index.html';
      };
      break;
    case 'close':
      $scope.btnShow = true;
      $scope.btnText = '关 闭';
      $scope.btnType = 'danger'
      $scope.btnClick = function () {   
        WeixinJSBridge.call('closeWindow');
      };
      break;
    default:
      $scope.btnShow = false;
      $scope.btnText = '';
      $scope.btnType = 'primary';
      $scope.btnClick = function () {};
      break;
  }
}
var app = angular.module('app', []);
app.controller('messageCtrl',['$scope','$location',messageCtrl]);
app.controller('headCtrl',['$scope','$location',headCtrl]);