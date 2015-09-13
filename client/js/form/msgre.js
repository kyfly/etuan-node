function msgReCtrl($scope, $resource, $location, $window, $http) {
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
    Result.get({
      resultId: resultId,
      msgId :msgId
    }, function(res) {
      console.log(res);
    });
  } else {
    alert('非法请求');
  }
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
//app.controller('headCtrl', function ($scope) {
//  $scope.isCollapsed = true;
//});
