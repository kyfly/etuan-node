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
            socket.emit('news', {hello: seckillId});
            socket.on('my other event', function (data) {
              console.log(data);
            });
          });
      })();
    }
  });
};
