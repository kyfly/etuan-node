function FormCtrl($scope, $resource, $location, $window) {
  var newReferer = "index.html";
  $scope.title = '表单';
  var formUrlSearchObj = $location.search();
  var Form = $resource('/api/forms/:id');
  var FormResult = $resource('/api/WeChatUsers/:id/formResults', {
    id: JSON.parse($window.localStorage.getItem('d2VjaGF0')).userId
  });
  $scope.answer = [];
  $scope.cnFormat = "yyyy'年'MM'月'dd'日 'HH'时'mm'分'";
  Form.get({
      "id": formUrlSearchObj.id
    },
    function (res) {
      $scope.form = res;
      $scope.title = res.title || '表单';
      $scope.startTime = new Date($scope.form.startTime);
      $scope.stopTime = new Date($scope.form.stopTime);
    },
    function (res) {
    }
  );
  $scope.questionShow = function (questionType, showType) {
    return questionType === showType;
  };
  $scope.submit = function () {
    var resultTmp = [];
    for (var i = 0; i < $scope.answer.length; i++) {
      resultTmp.push({
        'questionId': i,
        'content': $scope.answer[i]
      });
    }
    FormResult.save({
        'formId': formUrlSearchObj.id,
        'formResultAnswers': resultTmp
      },
      function (res) {
        alert("提交成功");
        $window.location = '../';
      },
      function (res) {
        if(res.status === 400){
          alert(res.data.error.message);
          if(res.data.error.message === "需要绑定学号") {
            window.location = "../student.html?referer=" + newReferer;
          }
        }
      }
    );
  };
}

function RewriteResourceActions($resourceProvider) {
  var commonHeaders = {
    Authorization: JSON.parse(window.localStorage.getItem('d2VjaGF0')).accessToken
  };
  $resourceProvider.defaults.actions = {
    'get': {
      method: 'GET',
      headers: commonHeaders
    },
    'query': {
      method: 'GET',
      isArray: true,
      headers: commonHeaders
    },
    'save': {
      method: 'POST',
      headers: commonHeaders
    },
    'update': {
      method: 'PUT',
      headers: commonHeaders
    },
    'check': {
      method: 'HEAD',
      headers: commonHeaders
    },
    'delete': {
      method: 'DELETE',
      headers: commonHeaders
    }
  };
}
var app = angular.module('app', ['ngResource']);
app.controller('FormCtrl', ['$scope', '$resource', '$location', '$window', FormCtrl]);
app.config(['$resourceProvider', RewriteResourceActions]);


