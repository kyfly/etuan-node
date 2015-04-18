module.exports.start = function (app) {

  function verifyIdMask(verifyId) {
    if (typeof(verifyId) != 'string')
      verifyId += '';
    return verifyId.slice(0, 2) + '***' + verifyId.slice(5, verifyId.length);
  }

  var io = require('socket.io')(app.server);
  var Seckill = app.models.Seckill;
  var SeckillResult = app.models.SeckillResult;

  Seckill.find({fields: {id: true, verifyRule: true, seckillArrangements: true}},
    function (err, infoData) {
      if (infoData) {
        for (var i = 0; i < infoData.length; i++) {
          (function () {
            var seckillId = infoData[i].id;
            var verifyRule = infoData[i].verifyRule;
            var seckillArrangements = infoData[i].seckillArrangements;
            var currentArrangementId = 0;
            var seckillRemain = 0;
            SeckillResult.count({and: [{seckillId: seckillId}, {isGet: true}]}, function (err, resultCount) {
              //找出当前在第几场抢疯抢，以及本场余量（如果下一场已经开始，本场还有余量，继续本场）
              var tempCount = 0;
              seckillArrangements.forEach(function (arrangement, index) {
                tempCount += arrangement.total;
                if (tempCount > resultCount) {
                  currentArrangementId = index;
                  seckillRemain = tempCount - resultCount;
                  return;
                }
              });

              io.of('/seckill/' + seckillId)
                .use(function (socket, next) {
                  var shakeQuery = socket.handshake.query;
                  app.models.AccessToken.findOne({where: {id: shakeQuery.accessToken}},
                    function (err, tokenData) {
                      if (!tokenData)
                        next(new Error("Authentication failed"));
                      else if (verifyRule == 'studentId')
                        app.models.WeChatUser.findOne({where: {id: tokenData.userId}, fields: {studentId: true}},
                          function (err, userData) {
                            shakeQuery.verifyId = userData.studentId;
                            next();
                          });
                    });
                })
                .on('connection', function (socket) {
                  Seckill.findOne({where: {id: seckillId}}, function (err, info) {
                    SeckillResult.find({
                      where: {and: [{seckillId: seckillId}, {isGet: true}]},
                      fields: {arrangementId: true, verifyId: true}
                    }, function (err, result) {
                      for (var i = 0; i < result.length; i++)
                        result[i].verifyId = verifyIdMask(result[i].verifyId)
                      info.current = currentArrangementId;
                      info.remain = seckillRemain;
                      info.serverTime = new Date().getTime();
                      socket.emit('initSeckill', info, result);
                    });
                  });

                  socket.on('addKiller', function (verifyId) {
                    verifyId = socket.handshake.query.verifyId || verifyId;
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
                                  io.of('/seckill/' + seckillId).emit('addResult', verifyIdMask(verifyId))
                                }
                              });
                            }
                          });
                      });
                  });
                });
            });
          })();
        }
      }
    });
};
