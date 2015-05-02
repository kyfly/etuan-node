function SeckillCtrl ($scope,$location,$window) {
  var seckillUrlSearchObj = $location.search();
  $scope.cnFormat = 'yyyy-MM-dd HH:mm';

  var socket = io(
    window.location.host + '/seckill/' + seckillUrlSearchObj.id, {
      query:'accessToken='+JSON.parse($window.localStorage.getItem('d2VjaGF0')).accessToken
    }
  );
  var start = new Date();     //秒杀开始时间
  var deltaTime = 0;         //与服务器的时间差，用于精准计算
  var countdownTimer;       //倒计时定时器

  socket.on('error', function (err) {
    console.log(err);
  });

  socket.once('initSeckill', function (info, result, status) {
    var now = new Date();
    deltaTime = new Date().getTime() - now.getTime();
    start = new Date(info.seckillArrangements[status.current].startTime);
    //判断当前状态，即将开始、正在进行或已经结束
    if (now.getTime() < start.getTime()) {
        $scope.status = '即将开始';
        $scope.btnStatus = '即将开始';
        $scope.disableBtn = true;
        countdown();
        countdownTimer = setInterval(countdown, 1000)
    }
    else {
      $scope.countdownTime = 0;
      if (status.remain > 0){
        $scope.status = '正在进行';
        $scope.btnStatus = '开抢';
        $scope.disableBtn = false;
      }
      else{
        $scope.status = '已经结束';
        $scope.btnStatus = '已经结束';
        $scope.disableBtn = true;
      }
    }
    //设定页面上的显示
    $scope.title = info.title;
    $scope.current = status.current;
    $scope.startTime = info.seckillArrangements[status.current].startTime;
    $scope.description = info.description;
    $scope.seckillArrangements = info.seckillArrangements;
    $scope.remain = status.remain;
    $scope.onlineNumber = status.onlineNumber;
    $scope.$apply();
  });

  socket.on('killFail', function(err){
    console.log(err);
    //err是一个字符串
    //认证信息（id）错误  'verifyId wrong'
    //已经抢过票了   'already gotten'
    //还没有开始      'not started'
    //没有余票了   'no enough'
    //写入数据库出错   'database error'
  });

  //秒杀时间到，服务器发出广播，触发该事件
  socket.on('startSeckill', function () {
    clearInterval(countdownTimer);
    $scope.countdownTime = 0;
    $scope.status = '正在进行';
    $scope.$apply();
  });

  socket.on('killSuccess', function() {
    alert('秒杀成功');
  });

  socket.on('addResult', function(verifyId){
    console.log(verifyId);
  });

  //按下秒杀按钮，把学号发送到服务器
  $scope.goKill = function () {
    socket.emit('addKiller', $scope.studentId);
  };

  //倒计时的timer，由服务器发出秒杀开始事件来关闭，更加精准
  function countdown() {
    var countdownTime = start.getTime() - new Date().getTime() + deltaTime;
    $scope.countdownTime = Math.floor(countdownTime / 1000);
    $scope.$apply();
    if($scope.countdownTime == 0){
      countdownTimer = window.clearInterval(countdownTimer);
      $scope.countdownTime = 0;
      $scope.status = '正在进行';
      $scope.btnStatus = '开抢';
      $scope.disableBtn = false;
      $scope.$apply();
    }
  }

}


var app = angular.module('app', []);
app.controller('SeckillCtrl',['$scope','$location','$window',SeckillCtrl]);
