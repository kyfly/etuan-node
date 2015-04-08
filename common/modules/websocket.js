module.exports.start = function (app) {

  var io = require('socket.io')(app.server);

  io.use(function(socket, next) {
    var token = socket.handshake.headers.access_token;
    if (token != '12345')
      next(new Error('Authentication error'));
    else
      next();
  });

  for (var i = 0; i < 3; i++) {
    (function() {
      var order = i;
      io.of('/seckill/' + i).on('connection', function (socket) {
        socket.emit('news', {hello: 'seckill' + order});
        socket.on('my other event', function (data) {
          console.log(data);
        });
      });
    })()
  }

};
