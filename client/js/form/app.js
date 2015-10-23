function FormCtrl($scope, $resource, $location, $window, $http) {
  $scope.title = '表单';
  var formUrlSearchObj = $location.search();
  var Form = $resource('/api/forms/:id');
  var FormResult = $resource('/api/WeChatUsers/:id/formResults', {
    id: JSON.parse(window.sessionStorage.d2VjaGF0).userId
  });
  var url = window.location.href;
  window.sessionStorage.next = url;
  $scope.answer = [];
  $scope.cnFormat = "yyyy'年'MM'月'dd'日 'HH'时'mm'分'";
  Form.get({
      "id": formUrlSearchObj.id
    },
    function (res) {
      var accessToken = JSON.parse($window.sessionStorage.d2VjaGF0).accessToken;
      var fltView = function (id) {
        $http.get('/api/Forms/view/' + id + '?access_token=' + accessToken)
      };
      fltView(res.id);
      if (res.verifyRule === "studentId" && !JSON.parse($window.sessionStorage.d2VjaGF0).studentId) {
        window.location = "../student.html" ;
      }
      $scope.form = res;
      for (var i = 0; i < res.formQuestions.length; i++) {
        $scope.answer[i] = '';
      }
      $scope.title = res.title || '表单';
      if (!new Date($scope.form.startTime).getTime()) {
        if ($scope.form.startTime.indexOf('-'))
          $scope.form.startTime = $scope.form.startTime.replace(/-/g, "/");
        if ($scope.form.stopTime.indexOf('-'))
          $scope.form.stopTime = $scope.form.stopTime.replace(/-/g, "/");
      }
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
      if ($scope.answer[i] != '') {
        resultTmp.push({
          'questionId': i,
          'content': $scope.answer[i]
        });
      } else {
        alert('请确保填写完整哦');
        return false;
      }
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
        if (res.status === 400) {
          alert(res.data.error.message);
          if (res.data.error.message === "需要绑定学号") {
            window.location = "../student.html?referer=" + newReferer;
          }
        }
      }
    );
  };
}

function RewriteResourceActions($resourceProvider) {
  var commonHeaders = {
    Authorization: JSON.parse(window.sessionStorage.d2VjaGF0).accessToken
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
var app = angular.module('app', ['ngResource', 'ui.bootstrap']);
app.controller('FormCtrl', ['$scope', '$resource', '$location', '$window', '$http', FormCtrl]);
app.config(['$resourceProvider', RewriteResourceActions]);
app.controller('headCtrl', function ($scope) {
  $scope.isCollapsed = true;
});


