function SeckillCtrl ($scope,$resource,$location,$window) {
  	var seckillUrlSearchObj = $location.search();
  	var Seckill = $resource('/api/seckills/:id');
    $scope.title = '疯抢';
    $scope.round = 0;
    $scope.description = '描述描述描述描述描述描述描述描述描述描述描述';
  	$scope.cnFormat = 'yyyy-MM-dd HH:mm';
    Seckill.get({
        'id':seckillUrlSearchObj.id
      },
      function(res){
      	$scope.title = res.title;
      	$scope.description = res.description;
      	$scope.seckillArrangements = res.seckillArrangements;
      },
      function(res){}
    );



    var socket = io(
      window.location.host + '/seckill/' + seckillUrlSearchObj.id, {
        query:'accessToken='+JSON.parse($window.localStorage.getItem('d2VjaGF0')).accessToken
      }
    );
    socket.on('error', function (err) {
      console.log(err);
    });
    socket.once('initSeckill', function (info, result) {
      console.log(info, result);
    });
    socket.on('killFail', function(err){
      console.log(err);
      //err是一个字符串
      //已经抢过票了   'already gotten'
      //还没有开始      'not started'
      //没有余票了   'no enough'
      //写入数据库出错   'database error'
    });
    socket.on('killSuccess', function() {
      console.log('Seckill successfully!');
    });
    socket.on('addResult', function(verifyId){
      console.log(verifyId);
    });

}

function RewriteResourceActions ($resourceProvider) {
  var commonHeaders = {
    Authorization:JSON.parse(window.localStorage.getItem('d2VjaGF0')).accessToken
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
app.controller('SeckillCtrl',['$scope','$resource','$location','$window',SeckillCtrl]);
app.config(['$resourceProvider',RewriteResourceActions]);
