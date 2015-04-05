function FormCtrl ($scope,$resource,$location,$window) {
  $scope.title = '表单';
  var formUrlSearchObj = $location.search();
  var Form = $resource('/api/forms/:id');
  var FormResult = $resource('/api/WeChatUsers/:id/formResults',{id:$window.localStorage.getItem('weChatUid')});
  $scope.answer = [];
  $scope.cnFormat = "yyyy'年'MM'月'dd'日 'HH'时'mm'分'";
  Form.get({
      "id":formUrlSearchObj.id
    },
    function(res){
      $scope.form = res;
      $scope.title = res.title || '表单';
      $scope.startTime = new Date($scope.form.startTime);
      $scope.stopTime = new Date($scope.form.stopTime);
    },
    function(res){}
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
        'formResultAnswers':resultTmp
      },
      function(res){},
      function(res){}
    );
  };
}

function RewriteResourceActions ($resourceProvider) {
  var commonHeaders = {
    Authorization:window.localStorage.getItem('weChatAccessToken')
  };
  $resourceProvider.defaults.actions = {
    'get':{
      method:'GET',
      headers:commonHeaders
    },
    'query':{
      method:'GET',
      isArray:true,
      headers:commonHeaders
    },
    'save':{
      method:'POST',
      headers:commonHeaders
    },
    'update':{
      method:'PUT',
      headers:commonHeaders
    },
    'check':{
      method:'HEAD',
      headers:commonHeaders
    },
    'delete':{
      method:'DELETE',
      headers:commonHeaders
    }
  };
}
var app = angular.module('app', ['ngResource']);
app.controller('FormCtrl',['$scope','$resource','$location','$window',FormCtrl]);
app.config(['$resourceProvider',RewriteResourceActions]);


