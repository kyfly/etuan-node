function FormCtrl ($scope,$resource,$location,$window) {
  var formUrlSearchObj = $location.search();
  var Form = $resource('/api/forms/:id');
  $scope.cnFormat = "yyyy'年'MM'月'dd'日 'HH'时'mm'分'";
  Form.get({
      "id":formUrlSearchObj.id
    },
    function(res){
      console.log(res);
      $scope.form = res;
      $scope.startTime = new Date($scope.form.startTime);
      $scope.stopTime = new Date($scope.form.stopTime);
    },
    function (res) {
      console.log(res);
    }
  );
  $scope.questionShow = function (questionType,showType) {
    return questionType === showType;
  };

/*
  var FormResult = $resource('/api/FormResults/');
  $scope.save({
    },function(res){
      console.log(res);
      $scope.form = res;
    },function (res) {
      console.log(res);
    }
  );
*/
}
var app = angular.module('app', ['ngResource']);
app.controller('FormCtrl',['$scope','$resource','$location','$window',FormCtrl]);
