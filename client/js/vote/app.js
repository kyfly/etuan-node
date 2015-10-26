function VoteCtrl($scope, $resource, $location, $window, $modal, $http) {
  $scope.title = '投票';
  var voteUrlSearchObj = $location.search();
  var Vote = $resource('/api/votes/:id');
  var VoteResult = $resource('/api/WeChatUsers/:id/voteResults', {
    id: JSON.parse(window.sessionStorage.d2VjaGF0).userId
  });
  var url = window.location.href;
  window.sessionStorage.next = url;

  var info = JSON.parse(window.sessionStorage.d2VjaGF0);
  $http.get('/api/WeChatUsers/' + info.userId + '/voteResults?filter=%7B%22where%22%3A%7B%22voteId%22%3A%22' + voteUrlSearchObj.id + '%22%7D%7D&access_token=' + info.accessToken).success(function (res) {
    if(res != ''){
      $window.location = 'result.html' + '#?id=' + voteUrlSearchObj.id;
    }
  });

  $scope.answer = [];
  $scope.cnFormat = "yyyy'年'MM'月'dd'日 'HH'时'mm'分'";

  Vote.get({
      "id": voteUrlSearchObj.id
    },
    function (res) {
      for(i = 0;i < res.voteSubitems.length;i++){
        $scope.answer[i] = false;
      }
      var accessToken = JSON.parse(window.sessionStorage.d2VjaGF0).accessToken;
      var vltView = function (id) {
        $http.get('/api/Votes/view/' + id + '?access_token=' + accessToken)
      };
      vltView(res.id);
      if (res.verifyRule === "studentId" && !info.studentId) {
        window.location = "../student.html";
      }
      switch(res.verifyRule) {
        case 'studentId':
          $scope.verifyResult = info.studentId;
          $scope.verifyRule = "学号";
          break;
        case "phone":
          $scope.verifyResult = null;
          $scope.verifyRule = "手机号";
          break;
        case "name":
          $scope.verifyResult = null;
          $scope.verifyRule = "姓名";
          break;
      }
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
          animation: false,
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
    if($scope.verifyResult === null){
      alert("请先输入" + $scope.verifyRule);
      return false;
    }
    var resultTmp = [];
    for (var i = 0; i < $scope.answer.length; i++) {
      if ($scope.answer[i] === true) {
        resultTmp.push(i);
      }
    }

    if (resultTmp.length != 0) {
      VoteResult.save({
          'voteId': voteUrlSearchObj.id,
          'results': resultTmp,
          "verifyResult": $scope.verifyResult
        },
        function () {
          alert("投票成功");
          $window.location = 'result.html' + '#?id=' + voteUrlSearchObj.id;
        },
        function (res) {
          alert(res.data.error.message);
          if (res.data.error.message === "需要绑定学号") {
            window.location = "../student.html";
          } else if (res.data.error.message === "已经投过票了") {
            $window.location = 'result.html' + '#?id=' + voteUrlSearchObj.id;
          } else if (res.data.error.message === "已经结束") {
            $window.location = 'result.html' + '#?id=' + voteUrlSearchObj.id;
          }
        }
      );
    } else {
      alert("请至少选择一项");
    }
  };
}

function HeadCtrl($scope){
  $scope.isCollapsed = true;
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
app.config(['$resourceProvider', RewriteResourceActions]);
app.controller('VoteCtrl', ['$scope', '$resource', '$location', '$window', '$modal', '$http', VoteCtrl]);
app.controller('HeadCtrl', ['$scope', HeadCtrl]);
app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, voteInfo) {
  $scope.content = voteInfo;
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

