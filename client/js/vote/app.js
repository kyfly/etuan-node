function VoteCtrl ($scope,$resource,$location,$window) {
  var voteUrlSearchObj = $location.search();
  var Vote = $resource('/api/votes/:id');
  var VoteResult = $resource('/api/WeChatUsers/:id/voteResults',{id:$window.localStorage.getItem('weChatUid')});
  $scope.answer = [];
  $scope.cnFormat = "yyyy'年'MM'月'dd'日 'HH'时'mm'分'";
  Vote.get({
      "id":voteUrlSearchObj.id
    },
    function(res){
      console.log(res);
      $scope.vote = res;
      $scope.startTime = new Date($scope.vote.startTime);
      $scope.stopTime = new Date($scope.vote.stopTime);
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
      if ($scope.answer[i] === true) {
        resultTmp.push(i);
      }
    }
    VoteResult.save({
        'voteId':voteUrlSearchObj.id,
        'results':resultTmp
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
app.controller('VoteCtrl',['$scope','$resource','$location','$window',VoteCtrl]);
app.config(['$resourceProvider',RewriteResourceActions]);

