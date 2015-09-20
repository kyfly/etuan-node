function msgReCtrl($scope, $resource, $location, $window, $http) {
  $scope.btnMsg = '确认收到消息';
  var search = $location.search();
  var msgId = Number(search.msgId),
    resultId = search.resultId,
    type = search.type;
  if (type && resultId && (msgId || msgId === 0)) {
    switch (type) {
      case 'form':
        var Result = $resource('/api/WeChatUsers/:id/msgRe', {
          id: JSON.parse(window.sessionStorage.d2VjaGF0).userId
        });
        break;
    }
  } else {
    alert('非法请求');
  }
  $scope.msgConfirm = function () {
    Result.get({
      resultId: resultId,
      msgId: msgId
    }, function (res) {
      if(res.status === 500){
        $scope.btnMsg = '信息确认失败';
        $scope.confirmFail = true;
      } else if (res.status === 400) {
        $scope.btnMsg = '已经确认过了';
        $scope.confirmFail = true;
      } else if (res.status === 200){
         $scope.btnMsg = '确认成功,随便看看吧';
        $scope.confirmFail = false;
      }
    });
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
app.controller('msgReCtrl', ['$scope', '$resource', '$location', '$window', '$http', msgReCtrl]);
app.config(['$resourceProvider', RewriteResourceActions]);
app.controller('headCtrl', function ($scope) {
  $scope.isCollapsed = true;
});
