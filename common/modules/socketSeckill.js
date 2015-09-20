module.exports = SocketSeckill;

var Verify = require('./verify');
var tplMsg = require('./templateMsg');
var TplMsg = new tplMsg();
var app, Seckill, SeckillResult;
var seckillCache = {};

function SocketSeckill(application) {
  if (!(this instanceof SocketSeckill))
    return new SocketSeckill(application);
  app = application;
  Seckill = app.models.Seckill;
  SeckillResult = app.models.SeckillResult;
  SocketSeckill.prototype.updateAllCache();
}

SocketSeckill.prototype.handshake = function (socket, next) {
  var handshakeQuery = socket.handshake.query;
  if (!seckillCache[handshakeQuery.id])
    next(new Error("404"));  //Invalid seckill id
  else {
    socket.join(handshakeQuery.id);
    seckillCache[handshakeQuery.id].verify.checkToken(handshakeQuery.accessToken,
      function (err, pass, studentId) {
        if (pass) {
          if (studentId)
            handshakeQuery.verifyId = studentId;
          next();
        }
        else
          next(new Error(err || "Authentication failed"));
      });
  }
};

SocketSeckill.prototype.onConnection = function (socket) {
  var seckillId = socket.handshake.query.id;
  var cache = seckillCache[seckillId];
  cache.onlineNumber++;
  socket.broadcast.to(seckillId).emit('changeOnlineNumber', cache.onlineNumber);
  Seckill.findOne({where: {id: seckillId}}, function (err, info) {
    SeckillResult.find({
      where: {and: [{seckillId: seckillId}, {isGet: true}]},
      fields: {arrangementId: true, verifyId: true}
    }, function (err, result) {
      for (var i = 0; i < result.length; i++)
        result[i].verifyId = cache.verify.idMask(result[i].verifyId)
      var status = {};
      status.current = cache.current;
      status.remain = cache.remain;
      status.serverTime = new Date().getTime();
      status.onlineNumber = cache.onlineNumber;
      socket.emit('initSeckill', info, result, status);
    });
  });

  socket.on('addKiller', function (verifyId) {
    onAddKiller(socket, verifyId);
  })
    .on('disconnect', function () {
      cache.onlineNumber--;
      socket.broadcast.to(seckillId).emit('changeOnlineNumber', cache.onlineNumber);
    });
};

function onAddKiller(socket, verifyId) {
  var handshakeQuery = socket.handshake.query;
  var seckillId = socket.handshake.query.id;
  var cache = seckillCache[seckillId];
  if (socket.handshake.query.verifyId)
    verifyId = socket.handshake.query.verifyId;
  else if (!cache.verify.checkId(verifyId)) {
    socket.emit('killFail', 'verifyId wrong');
    return;
  }
  cache.verify.getUser(handshakeQuery.accessToken, function (err, User) {
    if (err) {
      socket.emit('killFail', 'database error');
    } else {
      SeckillResult.findOne({
        where: {and: [{verifyId: verifyId}, {seckillId: seckillId}, {isGet: true}]},
        fields: {verifyId: true}
      },
      function (err, result) {
        if (result)
        //error: 已经抢过票了
          socket.emit('killFail', 'already gotten');
        else
          Seckill.findOne({
            where: {id: seckillId},
            fields: {seckillArrangements: true, title: true, organizationName: true}
          }, function (err, info) {
            cache.info = info;
            var arrangements = info.seckillArrangements;
            if (new Date().getTime() <= new Date(arrangements[cache.current].startTime).getTime())
            //error: 还没有开始
              socket.emit('killFail', 'not started');
            else if (cache.remain <= 0) {
              //error: 没有余量了
              socket.emit('killFail', 'no enough');
              //没有抢到的也写入数据库，作为记录和分析
              SeckillResult.upsert({
                seckillId: seckillId,
                arrangementId: cache.current,
                verifyId: verifyId,
                ip: socket.handshake.address,
                weChatUid : User.id,
                isGet: false  //没有抢到
              }, function (err) {
              });
            }
            else {
              cache.remain--;
              SeckillResult.upsert({
                seckillId: seckillId,
                arrangementId: cache.current,
                verifyId: verifyId,
                ip: socket.handshake.address,
                weChatUid : User.id,
                isGet: true  //抢到了
              }, function (err, instance) {
                if (err) {
                  cache.remain++;
                  //error: 写入数据库出错
                  socket.emit('killFail', 'database error');
                }
                else {
                  if (cache.remain <= 0 && cache.current < arrangements.length - 1) {
                    cache.current++;
                    cache.remain = arrangements[cache.current].total;
                  }
                  socket.emit('killSuccess');
                  socket.broadcast.to(seckillId).emit('addResult', cache.verify.idMask(verifyId));
                  //{{first.DATA}}
                  //
                  //服务类型：{{HandleType.DATA}}
                  //处理状态：{{Status.DATA}}
                  //提交时间：{{RowCreateDate.DATA}}
                  //当前进度：{{LogType.DATA}}
                  //{{remark.DATA}}

                  var data = {
                    first: {
                      value: "恭喜你，在抢到票了"
                    },
                    HandleType: {
                      value: "抢票"
                    },
                    Status: {
                      value: "成功"
                    },
                    RowCreateDate: {
                      value: new Date().toLocaleDateString()
                    },
                    LogType: {
                      value: "参与"+ cache.info.organizationName +"举办的抢票活动 " +cache.info.title+" 成功"
                    },
                    remark: {
                      value: "此消息来自团团一家"
                    }
                  }
                  TplMsg.activity(User.openid, null, data,  function(){})
                }
              });
            }
          });
      });
      }
  })
}

SocketSeckill.prototype.updateCache = function (seckillId, cb) {
  Seckill.findOne({where: {id: seckillId}, field: {id: true, verifyRule: true, seckillArrangements: true}},
    function (err, infoData) {
      seckillCache[seckillId] = seckillCache[seckillId] || {};
      var cache = seckillCache[seckillId];
      cache.verify = new Verify(app.models.AccessToken, app.models.WeChatUser, infoData.verifyRule);
      cache.onlineNumber = cache.onlineNumber || 0;
      SeckillResult.count({and: [{seckillId: seckillId}, {isGet: true}]}, function (err, resultCount) {
        //找出当前在第几场抢疯抢，以及本场余量（如果下一场已经开始，本场还有余量，继续本场）
        var tempCount = 0;
        for (var i = 0; i < infoData.seckillArrangements.length; i++) {
          tempCount += infoData.seckillArrangements[i].total;
          if (tempCount >= resultCount) {
            cache.current = i;
            cache.remain = tempCount - resultCount;
            break;
          } else {
            cache.current = infoData.seckillArrangements.length - 1;
            cache.remain = tempCount - resultCount;
          }
        }
        if (cb) cb();
      })
    })
};

SocketSeckill.prototype.updateAllCache = function () {
  Seckill.find({field: {id: true}}, function (err, allSeckill) {
    allSeckill.forEach(function (seckill) {
      SocketSeckill.prototype.updateCache(seckill.id);
    })
  })
};

SocketSeckill.prototype.deleteCache = function (seckillId) {
  delete seckillCache[seckillId];
};
