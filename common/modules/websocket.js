module.exports.start = function (app) {

  var io = require('socket.io')(app.server);

  for (var i = 0; i < 3; i++) {
    (function () {
      var order = i;
      io.of('/seckill/' + i).use(function (socket, next) {
        var token = socket.handshake.headers.access_token;
        if (token != '12345') {
          next(new Error("Authentication failed"));
        }
        else
          next();
      }).on('connection', function (socket) {
        socket.emit('news', {hello: 'seckill' + order});
        socket.on('my other event', function (data) {
          console.log(data);
        });
      });
    })()
  }

};
