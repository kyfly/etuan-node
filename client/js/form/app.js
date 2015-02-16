function FormCtrl ($scope,$resource,$location,$window) {
  var formUrlSearchObj = $location.search();
  var Form = $resource('/api/forms/:id');
  var FormResult = $resource('/api/FormResults/');
  $scope.answer = [];
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
  $scope.submit = function () {
    var resultTmp = [];
    for (var i=0;i<$scope.answer.length;i++) {
      resultTmp.push({
        'questionId': i,
        'content': $scope.answer[i]
      });
    }
    FormResult.save({
        'formId':formUrlSearchObj.id,
        'weChatUid':'0',
        'formResultAnswers':resultTmp
      },
      function(res){
        console.log(res);
      },
      function (res) {
        console.log(res);
      }
    );
  };
}
var app = angular.module('app', ['ngResource']);
app.controller('FormCtrl',['$scope','$resource','$location','$window',FormCtrl]);
