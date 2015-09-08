function VoteCtrl($scope, $resource, $location, $window, $modal) {
  var voteUrlSearchObj = $location.search();
  var Vote = $resource('/api/votes/:id');
  var GetResult = $resource('/api/Votes/:id/subitems', {
    id: voteUrlSearchObj.id
  });
  $scope.answer = [];
  $scope.cnFormat = "yyyy'年'MM'月'dd'日 'HH'时'mm'分'";
  Vote.get({
      "id": voteUrlSearchObj.id
    },
    function (res) {
      $scope.vote = res;
      $scope.title = res.title || '投票';
      $scope.startTime = new Date($scope.vote.startTime);
      $scope.stopTime = new Date($scope.vote.stopTime);

    },
    function (res) {
    }
  );
  $scope.questionShow = function (questionType, showType) {
    return questionType === showType;
  };

  GetResult.query({},
    function (res) {
      $scope.voteResults = res;
    },
    function (res) {
    }
  );
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
var app = angular.module('app', ['ngResource', 'ui.bootstrap', 'ngSanitize']);
app.controller('VoteCtrl', ['$scope', '$resource', '$location', '$window', '$modal', VoteCtrl]);
app.config(['$resourceProvider', RewriteResourceActions]);
app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, voteInfo) {
  $scope.content = voteInfo;
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
app.controller('headCtrl', function ($scope) {
  $scope.isCollapsed = true;
});
