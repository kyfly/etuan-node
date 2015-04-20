module.exports = function (Vote) {

  //在写入投票的时候，强制把子项计数改成0
  function resetCount(model) {
    model.voteSubitems.forEach(function (subitem) {
      subitem.count = 0;
    });
  }

  Vote.beforeCreate = function (next, model) {
    resetCount(model);
    next();
  };

  // Vote.beforeUpdate = function (next, model) {
  //   resetCount(model);
  //   next();
  // }

  //保存更新时间
  Vote.observe('before save', function(ctx, next) {
    if(ctx.instance) {
      ctx.instance.updatedAt = new Date();
    }
    else {
      ctx.data.updatedAt = new Date();
    }
    next();
  });   

};
