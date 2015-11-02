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
  Seckill.remoteMethod('rest', {
    accepts: {arg: 'id', type: 'string'},
    returns: {arg: 'count', type: 'number'},
    http: {verb: 'GET', path: '/rest/:id'}
  });
  Seckill.rest = function (id, cb) {
    Seckill.findById(id, function (err, instance) {
      if (err) {
        cb (err.message)
      } else {
        var total = 0;
        for (var i = 0; i < instance.seckillArrangements.length; i++) {
          total += instance.seckillArrangements[i].total;
        };
        instance.results.count(function (err, count) {
          if (err)
            cb(err.message);
          else
            cb(null,total - count);
        });
      }
    })
  }
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
  Seckill.beforeRemote('prototype.__updateById__results', function(ctx, instance,next) {
    if (ctx.req.body.from === 'createRM'){
      ctx.args.data = ctx.req.body.data;
      next();
      return;
    }
  });
};
