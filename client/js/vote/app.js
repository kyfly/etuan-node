function VoteCtrl($scope, $resource, $location, $window, $modal) {
  var voteUrlSearchObj = $location.search();
  var Vote = $resource('/api/votes/:id');
  var newReferer = "index.html";
  var VoteResult = $resource('/api/WeChatUsers/:id/voteResults', {
    id: JSON.parse($window.localStorage.getItem('d2VjaGF0')).userId
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
      if (new Date($scope.vote.stopTime).getTime() < new Date().getTime()) {
        $window.location = 'result.html' + '#?id=' + voteUrlSearchObj.id;
      }

     function loadContent(url, i) {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function () {
          if (http.readyState == 4 && http.status == 200) {
            voteInfo[i].voteContent = JSON.parse(http.responseText).content;
          }
        };
        http.open("GET", '/api/Activities/get-content?url=' + url, true);
        http.send();
      }

      var voteInfo = res.voteSubitems;
      for (var i = 0; i < voteInfo.length; i++) {
        if (voteInfo[i].detailUrl)
          loadContent(voteInfo[i].detailUrl, i);
      }

      //模态框
      $scope.open = function (num) {
        $modal.open({
          animation: true,
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: 'lg',
          resolve: {
            voteInfo: function () {
              return voteInfo[num].voteContent;
            }
          }
        });
      };

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
      if ($scope.answer[i] === true) {
        resultTmp.push(i);
      }
    }
    VoteResult.save({
        'voteId': voteUrlSearchObj.id,
        'results': resultTmp
      },
      function () {
        alert("投票成功");
        $window.location = 'result.html' + '#?id=' + voteUrlSearchObj.id;
      },
      function (res) {
        alert(res.data.error.message);
        if (res.data.error.message === "需要绑定学号") {
          window.location = "../student.html?referer=" + newReferer
        } else if (res.data.error.message === "已经投过票了") {
          $window.location = 'result.html' + '#?id=' + voteUrlSearchObj.id;
        } else if (res.data.error.message === "已经结束") {
          $window.location = 'result.html' + '#?id=' + voteUrlSearchObj.id;
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