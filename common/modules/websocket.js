module.exports.start = function (app) {

  var io = require('socket.io')(app.server);
  var Verify = require('./verify');
  var Seckill = app.models.Seckill;
  var SeckillResult = app.models.SeckillResult;

  Seckill.find({fields: {id: true, verifyRule: true, seckillArrangements: true}},
    function (err, infoData) {
      for (var i = 0; i < infoData.length; i++) {
        (function () {
          var seckillId = infoData[i].id;
          var verifyRule = infoData[i].verifyRule;
          var verify = new Verify(app.models.AccessToken, app.models.WeChatUser, verifyRule);
          var seckillArrangements = infoData[i].seckillArrangements;
          var currentArrangementId = 0;
          var seckillRemain = 0;
          var onlineNumber = 0;
          SeckillResult.count({and: [{seckillId: seckillId}, {isGet: true}]}, function (err, resultCount) {
            //找出当前在第几场抢疯抢，以及本场余量（如果下一场已经开始，本场还有余量，继续本场）
            var tempCount = 0;
            for (var j = 0; j < seckillArrangements.length; j++)
            {
              tempCount += seckillArrangements[j].total;
              if (tempCount > resultCount) {
                currentArrangementId = j;
                seckillRemain = tempCount - resultCount;
                break;
              }
            }

            io.of('/seckill/' + seckillId)
              .use(function (socket, next) {
                verify.checkToken(socket.handshake.query.accessToken, function (err, pass, studentId) {
                  if (pass) {
                    if (studentId)
                      socket.handshake.query.verifyId = studentId;
                    next();
                  }
                  else
                    next(new Error("Authentication failed"));
                });
              })
              .on('connection', function (socket) {
                onlineNumber++;
                io.of('/seckill/' + seckillId).emit('changeOnlineNumber', onlineNumber);
                Seckill.findOne({where: {id: seckillId}}, function (err, info) {
                  SeckillResult.find({
                    where: {and: [{seckillId: seckillId}, {isGet: true}]},
                    fields: {arrangementId: true, verifyId: true}
                  }, function (err, result) {
                    for (var i = 0; i < result.length; i++)
                      result[i].verifyId = verify.idMask(result[i].verifyId)
                    var status = {};
                    status.current = currentArrangementId;
                    status.remain = seckillRemain;
                    status.serverTime = new Date().getTime();
                    status.onlineNumber = onlineNumber;
                    socket.emit('initSeckill', info, result, status);
                  });
                });

                socket.on('addKiller', function (verifyId) {
                  if (socket.handshake.query.verifyId)
                    verifyId = socket.handshake.query.verifyId;
                  else
                    if (!verify.checkId(verifyId))
                    {
                      socket.emit('killFail', 'verifyId wrong');
                      return;
                    }
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
                          fields: {seckillArrangements: true}
                        }, function (err, info) {
                          if (new Date().getTime() <=
                            new Date(seckillArrangements[currentArrangementId].startTime).getTime())
                          //error: 还没有开始
                            socket.emit('killFail', 'not started');
                          else if (seckillRemain <= 0) {
                            //error: 没有余票了
                            socket.emit('killFail', 'no enough');
                            if (currentArrangementId < seckillArrangements.length) {
                              currentArrangementId++;
                              seckillRemain = seckillArrangements[currentArrangementId].total;
                            }
                            //没有抢到票的也写入数据库，作为记录和分析
                            SeckillResult.upsert({
                              seckillId: seckillId,
                              arrangementId: currentArrangementId,
                              verifyId: verifyId,
                              ip: socket.handshake.address,
                              isGet: false  //没有抢到
                            }, function (err) {
                            });
                          }
                          else {
                            seckillRemain--;
                            SeckillResult.upsert({
                              seckillId: seckillId,
                              arrangementId: currentArrangementId,
                              verifyId: verifyId,
                              ip: socket.handshake.address,
                              isGet: true  //抢到了
                            }, function (err) {
                              if (err) {
                                seckillRemain++;
                                //error: 写入数据库出错
                                socket.emit('killFail', 'database error');
                              }
                              else {
                                socket.emit('killSuccess');
                                io.of('/seckill/' + seckillId).emit('addResult', verify.idMask(verifyId))
                              }
                            });
                          }
                        });
                    });
                })
                  .on('disconnect', function () {
                    onlineNumber--;
                    io.of('/seckill/' + seckillId).emit('changeOnlineNumber', onlineNumber);
                  });
              });
          });
        })();
      }
    });
};
