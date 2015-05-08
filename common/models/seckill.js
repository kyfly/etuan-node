module.exports = function(Seckill) {


  //浏览活动将浏览量加一
  Seckill.remoteMethod('view', {
    accepts: {arg: 'id', type: 'string'},
    http: {verb: 'GET', path: '/view/:id'}
  });

  Seckill.view = function(id, cb) {
    Seckill.update({id: id}, {$inc: {viewCount: 1}}, function(err, result) {
      cb(null);
    });
  };

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
  }

  Seckill.observe('after save', function(ctx, next) {
    if (ctx.instance)
    {
      Seckill.app.socketSeckill.updateCache(ctx.instance.id);
      next();
    }
  });
};
