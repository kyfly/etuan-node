module.exports = function(Seckill) {

  //创建抢票结果之前写入ip
  Seckill.beforeRemote('prototype.__create__results', function(ctx, instance, next) {
    ctx.req.body.ip = getClientIp(ctx.req);
    next();
  });

  function getClientIp(req) {
      return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
  };    
};
