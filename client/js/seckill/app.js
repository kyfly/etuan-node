var app = angular.module('app', ['ui.bootstrap']);
app.controller('SeckillCtrl', ['$scope', '$location', '$window', SeckillCtrl]);

function SeckillCtrl($scope, $location, $window) {
  var seckillUrlSearchObj = $location.search();
  $scope.cnFormat = 'yyyy-MM-dd HH:mm';

  var socket = io(
    window.location.host + "/socket/seckill", {
      query: 'accessToken=' + JSON.parse($window.sessionStorage.getItem('d2VjaGF0')).accessToken + "&id=" + seckillUrlSearchObj.id
    }
  );
  var start = new Date();     //秒杀开始时间
  var deltaTime = 0;         //与服务器的时间差，用于精准计算
  var countdownTimer;       //倒计时定时器
  var countdownSec;        //用秒表示的倒计时
  var resultList = [];
  var newReferer = "index.html";

  socket.on('error', function (err) {
    if (err === "104") {
      window.location = "../student.html?referer=" + newReferer
    } else {
      alert("对不起，身份验证失败，错误代码：" + err);
      //404	不存在的seckillId
      //101	不存在的accessToken
      //102	accessToken已过期
      //103	找不到该用户
      //104	学号未绑定
    }
  });

  socket.once('initSeckill', function (info, result, status) {
    var now = new Date();
    deltaTime = new Date().getTime() - now.getTime();
    if (status.current < info.seckillArrangements.length) {
      start = new Date(info.seckillArrangements[status.current].startTime);
    } else {
      start = new Date(info.seckillArrangements[status.current - 1].startTime);
    }
    //判断当前状态，即将开始、正在进行或已经结束
    if (now.getTime() < start.getTime()) {
      $scope.seckillStart = false;
      $scope.status = '即将开始';
      $scope.btnStatus = '即将开始';
      countdown();
      countdownTimer = setInterval(countdown, 1000)
    }
    else {
      $scope.countdownTime = 0;
      if (status.remain > 0) {
        $scope.seckillStart = true;
        $scope.status = '正在进行';
        $scope.btnStatus = '开抢';
      }
      else {
        $scope.seckillStart = true;
        $scope.status = '已经结束';
        $scope.btnStatus = '已经结束';
      }
    }
    //设定页面上的显示
    switch (info.verifyRule) {
      case "studentId":
        $scope.verifyRule = "学号";
        break;
      case "phone":
        $scope.verifyRule = "手机号";
        break;
      case "idCard":
        $scope.verifyRule = "身份证号";
        break;
    }

    $scope.current = status.current;
    $scope.title = info.title;
    if (status.current < info.seckillArrangements.length) {
      $scope.startTime = new Date(info.seckillArrangements[status.current].startTime);
    } else {
      $scope.startTime = new Date(info.seckillArrangements[status.current - 1].startTime);
    }
    $scope.description = info.description;
    $scope.seckillArrangements = info.seckillArrangements;
    $scope.remain = status.remain;
    $scope.onlineNumber = status.onlineNumber;
    $scope.logoUrl = info.logoUrl;

    for (var i = 0; i < result.length; i++) {
      resultList.push(result[i].verifyId);
    }

    $scope.resultList = resultList;
    $scope.$apply();
  });

  socket.on('killFail', function (err) {
    switch (err) {
      case "verifyId wrong":
        alert("请确认" + $scope.verifyRule + "填写正确！");
        break;
      case "already gotten":
        alert("您已经抢过啦！");
        break;
      case "not started":
        alert("还没开始呢！");
        break;
      case "no enough":
        alert("已经被抢完啦！");
        break;
      case "database error":
        alert("写入数据库出错！");
        break;
    }
  });

  //按下秒杀按钮，把学号发送到服务器
  $scope.goKill = function () {
    socket.emit('addKiller', $scope.verifyId);
  };

  socket.on('killSuccess', function () {
    alert('恭喜你抢到了！');
    history.go(0);
  });

  socket.on('addResult', function (verifyId) {
    $scope.remain--;
    $scope.resultList.push(verifyId);
    if ($scope.remain = 0)
      $scope.status = '已经结束';
    $scope.$apply();
  });

  //倒计时的timer，由服务器发出秒杀开始事件来关闭，更加精准
  function countdown() {
    var countdownTime = start.getTime() - new Date().getTime() + deltaTime;
    countdownSec = Math.floor(countdownTime / 1000);
    $scope.$apply();
    $scope.countdownTime = formatSeconds(countdownSec);
    if (countdownSec == 0) {
      countdownTimer = window.clearInterval(countdownTimer);
      countdownSec = 0;
      $scope.status = '正在进行';
      $scope.btnStatus = '开抢';
      $scope.$apply();
    }
  }

  //把秒转换成时分秒
  function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if (theTime > 60) {
      theTime1 = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
      if (theTime1 > 60) {
        theTime2 = parseInt(theTime1 / 60);
        theTime1 = parseInt(theTime1 % 60);
      }
    }
    if (parseInt(theTime) != 0)
      var result = "" + parseInt(theTime) - 1 + "秒";
    else
      result = "" + 0 + "秒";
    if (theTime1 > 0) {
      result = "" + parseInt(theTime1) + "分" + result;
    }
    if (theTime2 > 0) {
      result = "" + parseInt(theTime2) + "小时" + result;
    }
    return result;
  }

}

app.controller('headCtrl', function ($scope) {
  $scope.isCollapsed = true;
});

