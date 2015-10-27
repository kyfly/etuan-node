function VoteCtrl($scope, $location, $modal, $http, $sce) {
  $scope.title = '投票';
  var url = window.location.href;
  window.sessionStorage.next = url;
  $scope.cnFormat = "yy'/'MM'/'dd' 'HH':'mm'";
  var id = $location.search().id;
  //已选投票项
  $scope.choosed = 0;
  //初始化投票系统
  $http.get('/api/votes/' + id).success(function (res) {
    $scope.answer = [];
    for (i = 0; i < res.voteSubitems.length; i++) {
      $scope.answer[i] = false;
    }
    res.description = $sce.trustAsHtml(res.description);
    $scope.vote = res;
    $scope.title = res.title || '投票';
    $scope.startTime = new Date($scope.vote.startTime);
    $scope.stopTime = new Date($scope.vote.stopTime);
    //if (new Date($scope.vote.stopTime).getTime() < new Date().getTime()) {
    //  $window.location = 'result.html' + '#?id=' + id;
    //}
    var voteInfo = res.voteSubitems;
    $scope.voteInfo = voteInfo;
    for (var i = 0; i < voteInfo.length; i++) {
      if (voteInfo[i].detailUrl)
        loadContent(voteInfo[i].detailUrl, i);
    }
    function loadContent(url, i) {
      var http = new XMLHttpRequest();
      http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
          $scope.voteInfo[i].voteContent = JSON.parse(http.responseText).content;
        }
      };
      http.open("GET", '/api/Activities/get-content?url=' + url, true);
      http.send();
    }

  });

  //投票项详细信息模态框
  $scope.open = function (num) {
    $modal.open({
      animation: true,
      templateUrl: 'detailModal',
      controller: 'DetailModaltrl',
      size: 'lg',
      resolve: {
        voteInfo: function () {
          return $scope.voteInfo[num].voteContent;
        }
      }
    });
  };
  //身份发生改变时检查权限
  $scope.ruleChange = function () {
    if ($scope.cRule === "studentId") {
      $scope.verifyRule = null;
      loginCheck('d2VjaGF0');
      var studentId = isAuthed();
      if (studentId) {
        $scope.verifyResult = studentId;
        $scope.verifyRule = "学号或职工号";
      }
    } else {
      loginCheck('d2VjaGF0');
      $scope.verifyResult = null;
      $scope.verifyRule = "姓名";
    }
    $scope.Authed = true;
  };
  //检查教职工，学生是否绑定数字杭电
  function isAuthed () {
    loginCheck('d2VjaGF0');
    if(JSON.parse(window.sessionStorage.d2VjaGF0).studentId) {
      return JSON.parse(window.sessionStorage.d2VjaGF0).studentId;
    } else {
      $scope.cRule =null;
      $scope.verifyRule = null;
      $modal.open({
        animation: true,
        templateUrl: 'studentModal',
        controller: 'StudentModalCtrl',
        size: 'lg',
        resolve: {
          voteScope: function () {
            return $scope;
          }
        }
      });
    }
    return null;
  }

  //用户进行选择投票项时检查是否登录
  $scope.cAuth = function (index, act) {
    if($scope.cRule === undefined){
      alert("请先选择你的身份再投票");
      return;
    }
    if($scope.cRule === "studentId"){
      isAuthed();
    }
    if (act === 1) {
      if ($scope.choosed === $scope.vote.maxVote) {
        alert("只可以选择" + $scope.vote.maxVote + '项')
        return;
      }
      $scope.choosed ++;
    } else {
      $scope.choosed--;
    }
    $scope.answer[index] = !$scope.answer[index];
  };
  //提交投票内容
  $scope.submit = function () {
    if ($scope.verifyResult === null) {
      alert("请先输入" + $scope.verifyRule);
      return false;
    }
    var resultTmp = [];
    for (var i = 0; i < $scope.answer.length; i++) {
      if ($scope.answer[i] === true) {
        resultTmp.push(i);
      }
    }
    var d2VjaGF0 = JSON.parse(window.sessionStorage.d2VjaGF0);
    if (resultTmp.length != 0) {
      $http.post('/api/WeChatUsers/'+ d2VjaGF0.userId +"/voteResults?access_token=" + d2VjaGF0.accessToken,{
          'voteId': id,
          'results': resultTmp,
          "verifyResult": $scope.verifyResult
        }).success(function () {
          alert("投票成功");
          history.go(0);
        }).error(function (res) {
          alert(res.error.message);
          if (res.error.message === "需要绑定学号") {
            isAuthed();
          } else if (res.error.message === "已经投过票了") {
            history.go(0);
          } else if (res.error.message === "已经结束") {
            history.go(0);
          }
        }
      );
    } else {
      alert("请至少选择一项");
    }
  };
}



var app = angular.module('app', ['ui.bootstrap']);
app.controller('VoteCtrl', ['$scope', '$location', '$modal', '$http', '$sce', VoteCtrl]);
app.controller('DetailModaltrl', function ($scope, $modalInstance, voteInfo, $sce) {
  $scope.content = $sce.trustAsHtml(voteInfo);
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
app.controller('StudentModalCtrl', function ($http, $scope, $modalInstance, voteScope) {
  $scope.bindID = function () {
    if ($scope.hduId && $scope.hduPwd) {
      var d2VjaGF0 = JSON.parse(window.sessionStorage.d2VjaGF0);
      $http.put('/api/WeChatUsers/' + d2VjaGF0.userId + "?access_token=" + d2VjaGF0.accessToken, {
        studentId: $scope.hduId,
        password: hex_md5($scope.hduPwd),
        university: "杭州电子科技大学"
      }).success(function (res) {
        if (res.err) {
          alert(res.err);
        } else {
          voteScope.cRule = "studentId";
          voteScope.verifyResult = $scope.hduId;
          d2VjaGF0.school = res.university;
          d2VjaGF0.studentId = $scope.hduId;
          window.sessionStorage.setItem('d2VjaGF0', JSON.stringify(d2VjaGF0));
          $modalInstance.dismiss('cancel');
        }
      }).error(function () {
        alert("连接出错啦！");
      });
    } else {
      $scope.error = true;
      return;
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

