module.exports = function(Seckill) {
  //保存更新时间
  Seckill.observe('before save', function(ctx, next) {
    if(ctx.instance) {
      ctx.instance.updatedAt = new Date();
    }
    else {
      ctx.data.updatedAt = new Date();
    }
    next();
  });

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
