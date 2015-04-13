module.exports.start = function (app) {

  function authentication(socket, next) {
    var token = socket.handshake.query.access_token;
    if (token != '12345') {
      next(new Error("Authentication failed"));
    }
    else
      next();
  }

  var io = require('socket.io')(app.server);

  app.models.Seckill.find({fields: {id: true}}, function (err, data) {
    for (var i = 0; i < data.length; i++) {
      (function () {
        var seckillId = data[i].id;
        io.of('/seckill/' + seckillId)
          .use(authentication)
          .on('connection', function (socket) {
            app.models.Seckill.findOne({where: {id: seckillId}}, function (err, info) {
              app.models.SeckillResult.find({
                where: {seckillId: seckillId},
                fields: {arrangementId: true, verifyId: true}
              }, function (err, result) {
                if (result) {
                  var verifyId = '';
                  for (var i = 0; i < result.length; i++) {
                    verifyId = result[i].verifyId;
                    result[i].$verifyId = verifyId.slice(0, 2) + '***' + verifyId.slice(5, verifyId.length);
                  }
                }
                info.serverTime = new Date().getTime();
                socket.emit('initSeckill', info, result);
              });
            });
          });
      })();
    }
  });
};
