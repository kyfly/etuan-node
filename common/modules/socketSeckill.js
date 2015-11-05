module.exports = SocketSeckill;

var Verify = require('./verify');
var tplMsg = require('./templateMsg');
var Q = require('./Promise');
var TplMsg = new tplMsg();
var io, app, Seckill, SeckillResult;
var seckillCache = {};

function SocketSeckill(application, io) {
  if (!(this instanceof SocketSeckill))
    return new SocketSeckill(application);
  app = application;
  Seckill = app.models.Seckill;
  SeckillResult = app.models.SeckillResult;
}
//join room and auth
SocketSeckill.prototype.handshake = function (socket, next) {
  var handshakeQuery = socket.handshake.query;
  Q.all([
    Q.findById(app.models.AccessToken, handshakeQuery.accessToken), 
    Q.findById(Seckill, handshakeQuery.id),
    Q.find(SeckillResult, {where: {seckillId: handshakeQuery.id}})
  ])
  .spread(function (token, seckill, result) {
    socket.join(handshakeQuery.id);
    var total = 0;
    var current = 0;
    if (!seckillCache[handshakeQuery.id]) {
      for (var i = 0; i < seckill.seckillArrangements.length; i++) {
        total += seckill.seckillArrangements[i].total;
        if (result.length >= total) {
          current ++;
        }
      }
      seckillCache[handshakeQuery.id] = {
        onLine: 1,
        current: current,
        Ctotal: total,
        limit: seckill.limit,
        Cresult: result.length,
        remain: total - result.length,
        verify: new Verify(app.models.AccessToken, app.models.WeChatUser, seckill.verifyRule)
      }
    } else {
      seckillCache[handshakeQuery.id].onLine ++;
    }
    next(null, true);
  }, function (err) {
    next(err);
  });
};
//
SocketSeckill.prototype.onConnection = function (socket) {
  var seckillId = socket.handshake.query.id;
  var userId = socket.handshake.query.userId;
  var cache = seckillCache[seckillId];
  socket.broadcast.to(seckillId).emit('changeOnlineNumber', cache.onLine);

  Q.all([
    Q.findById(Seckill, seckillId),
    Q.find(SeckillResult, 
    {
      where: 
      {
        and: 
        [{
          seckillId: seckillId
        }, {
          isGet: true
        }]
      },
      fields: 
      {
        arrangementId: true,
        verifyId: true
      }
    })
    ])
  .spread(function (seckill, result) {
    var Cget = 0;
    for (var i = 0; i < result.length; i++) {
        result[i].verifyId = cache.verify.idMask(result[i].verifyId);
        if (result.weChatUid ===  userId) {
          Cget ++;
        }
    }
    var status = {};
    status.limit = seckill.limit - Cget;
    status.current = cache.current;
    status.remain = cache.remain;
    status.serverTime = new Date().getTime();
    status.onlineNumber = cache.onLine;
    socket.emit('initSeckill', seckill, result, status);
  }, function (err) {
    socket.emit('error', 'database error');
  });

  socket.on('addKiller', function (verifyId) {
    onAddKiller(socket, verifyId);
  })
  socket.on('disconnect', function () {
      cache.onLine --;
      socket.leave(seckillId);
      socket.broadcast.to(seckillId).emit('changeOnlineNumber', cache.onLine);
    });
};

function onAddKiller(socket, verifyId) {
  var handshakeQuery = socket.handshake.query;
  var seckillId = handshakeQuery.id;
  var cache = seckillCache[seckillId];
  if (!verifyId || !cache.verify.checkId(verifyId)) {
    socket.emit('killFail', 'verifyId wrong');
    return;
  }
  cache.verify.getUser(handshakeQuery.accessToken, function (err, User) {
    if (err) {
      socket.emit('killFail', 'database error');
    } else {
      Q.find(SeckillResult, {
        where: {and: [{weChatUid : User.id}, {seckillId: seckillId}, {isGet: true}]},
        fields: {verifyId: true}
      })
      .then(function (result) {
        if (result && result.length >= cache.limit){
          socket.emit('killFail', 'already gotten');
          return 'already gotten';
        }
        return Q.findOne(Seckill, {
            where: {id: seckillId},
            fields: {seckillArrangements: true, title: true, organizationName: true}
          });
      })
      .then(function (seckill) {
        var arrangements = seckill.seckillArrangements;
        if (new Date().getTime() <= new Date(arrangements[cache.current].startTime).getTime()) {
          socket.emit('killFail', 'not started');
          return;
        }
        if (cache.remain <= 0) {
          socket.emit('killFail', 'no enough');
          return SeckillResult.upsert({
            seckillId: seckillId,
            arrangementId: cache.current,
            verifyId: verifyId,
            ip: socket.handshake.address,
            weChatUid : User.id,
            isGet: false  //没有抢到
          }, function (err) {
          });
        } else {
          cache.remain--;
          cache.Cresult++;
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
              cache.Cresult--;
              socket.emit('killFail', 'database error');
            } else {
              total = 0;
              for (var i = 0; i < arrangements.length; i++) {
                total += arrangements[i].total;
                if (cache.Cresult >= total) {
                  cache.current = i + 1;
                }
              }
              console.log(cache);
              socket.emit('killSuccess');
              socket.broadcast.to(seckillId).emit('addResult', cache.verify.idMask(verifyId), cache.current);
            }
          });
        }
      });
    }
  })
}
