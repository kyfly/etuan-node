module.exports = WebSocket;

var app, server, io, seckill;

function WebSocket(application, httpServer) {
  if (!(this instanceof WebSocket))
    return new WebSocket(application, httpServer);
  app = application;
  server = httpServer;
  io = require('socket.io')(server);
  seckill = require('./socketSeckill')(app);
}

WebSocket.prototype.start = function () {
  io.of('/socket/seckill')
    .use(seckill.handshake)
    .on('connection', seckill.onConnection)
};
